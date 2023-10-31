import { defineStore } from 'pinia';
import { flatten, unflatten } from '../../util/flatten';

export type FormId = string;

export interface FormRequest<T> {
  requesterId: FormId;
  params: T;
}

export interface ReqErrors {
  [key: string]: string[];
}

export interface ValidationErrors {
  [key: string]: string[];
}

export interface ErrorsPayload {
  requesterId: FormId;
  errors: ReqErrors;
}

export interface FormConfiguration {
  clearErrorsOnEdit: boolean;
  initialValues?: { [key: string]: any };
}

export interface FieldConfiguration {
  validators?: any;
  default?: unknown;
  list?: boolean;
  isObject?: boolean;
}

type FormFields = {
  [key: string]: FormField;
};

export interface Form {
  config: FormConfiguration;
  errors?: string[];
  fields: FormFields;
}

export interface FormField {
  config: FieldConfiguration;
  value?: unknown;
  errors?: string[];
  validationErrors?: ValidationErrors;
  dirty: boolean;
}

interface FormsState {
  forms: {
    [key: FormId]: Form;
  };
}

export default FormsState;

interface FieldQuery {
  formId: FormId;
  field: string;
  index?: number;
}

interface StageInputParams {
  query: FieldQuery;
  value: unknown;
}

interface InitFormPayload {
  formId: FormId;
  config: FormConfiguration;
}

interface InitFormFieldPayload {
  formId: FormId;
  name: string;
  config: FieldConfiguration;
}

const SCOPE_SPARATOR = '.';

export const scopedName = (name: string, scope: string[] = []) => [...scope, name].join(SCOPE_SPARATOR);

const setDeepValue = <T extends object>(obj: T, keyList: string[], value: any): T => {
  const [currentKey, ...rest] = keyList;

  if (rest.length == 0) {
    return {
      ...obj,
      [currentKey]: value,
    }
  }

  const childObj = obj[currentKey] || {};

  return {
    ...obj,
    [currentKey]: setDeepValue(childObj, rest, value)
  }
}

const fieldToObjectReducer = <T extends object>(acc: T, [k, v]: [string, any]): T => {
  const scopedName = k.split(SCOPE_SPARATOR);

  return setDeepValue(acc, scopedName, v.value);
};

const initalOrDefault = (initialValues: object | undefined, path: string, fallback?: unknown): unknown => {
  if (!initialValues) {
    return fallback;
  }

  const value = initialValues[path]
  if (typeof value !== 'undefined') {
    return value
  }
  const matcher = new RegExp(`${path}[\.\[]`);

  const matches = Object.entries(initialValues).filter(([k, v]) => matcher.exec(k) !== null)

  if (matches.length === 0) {
    return fallback;
  }

  return Object.fromEntries(matches)
};

export const useFormsStore = defineStore('vuniform', {
  state: (): FormsState => ({
    forms: {},
  }),
  getters: {
    getFieldNames(state: FormsState): (formId: FormId) => string[] {
      return (formId) => Object.keys(state.forms[formId]?.fields || {});
    },

    // deprecated
    getFields(state: FormsState): (formId: FormId) => string[] {
      return (formId) => Object.keys(state.forms[formId]?.fields || {})
    },

    formHasErrors(state: FormsState): (formId: FormId) => boolean {
      return (formId) => this.getFieldNames(formId).some((field: string) => this.fieldHasErrors(formId, field));
    },

    fieldHasErrors(state: FormsState): (formId: FormId, field: string) => boolean {
      return (formId, field) => this.fieldGetErrors(formId, field).length > 0;
    },

    fieldGetValue(state: FormsState): (formId: FormId, field: string) => unknown {
      return (formId, field) => state.forms[formId]?.fields[field]?.value;
    },

    fieldGetErrors(state: FormsState): (formId: FormId, field: string) => string[] {
      // TODO: Implement validators here
      return (formId, field) => state.forms[formId]?.fields[field]?.errors || [];
    },

    isFieldDirty(state: FormsState): (formId: FormId, fieldName: string) => boolean {
      return (formId, fieldName) => state.forms[formId]?.fields[fieldName]?.dirty;
    },

    isFormDirty(state: FormsState): (formId: FormId) => boolean {
      return (formId): boolean =>
        this.getFields(formId).some((fieldKey: string) => state.forms[formId].fields[fieldKey].dirty);
    },

    formGetValues(state: FormsState): <T>(formId: FormId, raw?: boolean) => T {
      return <T>(formId: FormId, raw = false) => {
        const values = Object.fromEntries(Object.entries(state.forms?.[formId]?.fields || {}).map(([k, v]) => [k, v.value]))
        if (raw) {
          return values as T;
        }

        return unflatten(values) as T;
      }
    },
  },
  actions: {
    INIT_FORM({ formId, config }: InitFormPayload) {
      this.forms[formId] = {
        config: {
          ...config,
          initialValues: flatten(config.initialValues),
        },
        fields: {},
        errors: [],
      };
    },

    SET_INITIAL_VALUES({ formId, values, clearDirty }: { formId: FormId; values: object, clearDirty?: boolean }) {
      this.forms[formId].config.initialValues = flatten(values);
      if (clearDirty) {
        this.CLEAR_FORM_DIRTY(formId);
      }
    },

    RESET_FIELD_VALUES(formId: FormId) {
      const fields = Object.keys(this.forms[formId].fields);
      for (const field of fields) {
        this.forms[formId].fields[field].value = initalOrDefault(this.forms[formId].config?.initialValues, field);
        this.forms[formId].fields[field].dirty = false;
      }
    },

    DEINIT_FORM(formId: FormId) {
      delete this.forms[formId];
    },

    INIT_FIELD_LIST({ formId, name, config}: InitFormFieldPayload) {
      const value = initalOrDefault(this.forms[formId].config?.initialValues, name, config.default) as object;

      for (const k in value) {
        this.INIT_FORM_FIELD({formId, name: k, config})
      }
    },

    INIT_FORM_FIELD({ formId, name, config }: InitFormFieldPayload) {
      const value = initalOrDefault(this.forms[formId].config?.initialValues, name, config.default)

      this.forms[formId].fields[name] = <FormField>{
        config: { ...config },
        value: value,
        dirty: false,
      };
    },

    STAGE_FIELD_CHANGE({ value, query: { formId, field, index } }: StageInputParams) {
      if (typeof index !== 'undefined') {
        this.forms[formId].fields[field].value ||= [];
        this.forms[formId].fields[field].value[index] = value;
      } else {
        this.forms[formId].fields[field].value = value;
      }
      this.forms[formId].fields[field].dirty = true;
      this.forms[formId].fields[field].errors = undefined;
    },

    SET_ERRORS(errors: ErrorsPayload) {
      const form = this.forms[errors.requesterId] || { fields: {} };

      for (const [key, errArray] of Object.entries(errors.errors)) {
        const field = form.fields[key] || {};
        field.errors = [...errArray];
        form.fields[key] = field;
      }

      this.forms[errors.requesterId] = form;
    },

    CLEAR_ERRORS(formId: FormId) {
      const fields = Object.keys(this.forms[formId].fields);
      for (const field of fields) {
        delete this.forms[formId].fields[field].errors;
      }
    },

    CLEAR_ERROR(state: FormsState, { formId, field }: FieldQuery) {
      // nothing
    },

    CLEAR_FIELD_DIRTY({formId, field}: FieldQuery) {
      const f = this.forms[formId]?.fields[field]
      if (!f) {
        return
      }
      f.dirty = false;
    },

    CLEAR_FORM_DIRTY(formId: FormId) {
      for (let f of this.getFields(formId)) {
        this.CLEAR_FIELD_DIRTY({formId, field: f});
      }
    }
  },
});

type FormsStoreComposable = {
  formId: string;
  formsStore: ReturnType<typeof useFormsStore>;
  getFieldNames: () => string[];
  fieldHasErrors: (field: string) => boolean;
  fieldGetValue: (field: string) => unknown;
  fieldGetErrors: (field: string) => string[];
  isFieldDirty: (field: string) => boolean;
  isFormDirty: () => boolean;
  formHasErrors: () => boolean;
  formGetValues: <T>(raw?: boolean) => T;
}

export const useFormsStoreComposable = (formId: FormId): FormsStoreComposable => {
  const store = useFormsStore();

  return {
    formId,
    formsStore: store,
    getFieldNames: (): string[] => store.getFieldNames(formId),
    fieldHasErrors: (field: string): boolean => store.fieldHasErrors(formId, field),
    fieldGetValue: (field: string): unknown => store.fieldGetValue(formId, field),
    fieldGetErrors: (field: string): string[] => store.fieldGetErrors(formId, field),
    isFieldDirty: (field: string): boolean => store.isFieldDirty(formId, field),
    isFormDirty: (): boolean => store.isFormDirty(formId),
    formHasErrors: (): boolean  => store.formHasErrors(formId),
    formGetValues: <T>(raw?: boolean): T => store.formGetValues<T>(formId, raw),
  }
}
