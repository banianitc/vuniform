import { defineStore } from 'pinia';

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
}

export interface Form {
  config: FormConfiguration;
  errors?: string[];
  fields: {
    [key: string]: FormField;
  };
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

export const useFormsStore = defineStore('vuniform', {
  state: (): FormsState => ({
    forms: {},
  }),
  getters: {
    getFieldNames(state: FormsState): (formId: FormId) => string[] {
      return (formId) => Object.keys(state.forms[formId]?.fields || {});
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

    isFormDirty(state: FormsState): (formId: FormId) => boolean {
      return (formId): boolean =>
        Object.keys(state.forms[formId]?.fields || []).some((fieldKey: string) => state.forms[formId].fields[fieldKey].dirty);
    },

    formGetValues(state: FormsState): <T>(formId: FormId) => T {
      return <T>(formId: FormId) =>
        Object.entries(state.forms[formId].fields).reduce((acc, [k, v]) => {
          return {
            ...acc,
            [k]: v.value,
          };
        }, {}) as T;
    },
  },
  actions: {
    INIT_FORM({ formId, config }: InitFormPayload) {
      this.forms[formId] = {
        config,
        fields: {},
        errors: [],
      };
    },

    SET_INITIAL_VALUES({ formId, values }: { formId: FormId; values: object }) {
      this.forms[formId].config.initialValues = values;
    },

    RESET_FIELD_VALUES(formId: FormId) {
      const fields = Object.keys(this.forms[formId].fields);
      for (const field of fields) {
        this.forms[formId].fields[field].value = this.forms[formId].config.initialValues?.[field];
        this.forms[formId].fields[field].dirty = false;
      }
    },

    DEINIT_FORM(formId: FormId) {
      delete this.forms[formId];
    },

    INIT_FORM_FIELD({ formId, name, config }: InitFormFieldPayload) {
      this.forms[formId].fields[name] = <FormField>{
        config: { ...config },
        value: this.forms[formId].config?.initialValues?.[name] || config.default,
        dirty: false,
      };
    },

    STAGE_FIELD_CHANGE({ value, query: { formId, field } }: StageInputParams) {
      this.forms[formId].fields[field].value = value;
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
  },
});
