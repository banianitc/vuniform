export declare type FormId = string;
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
    initialValues?: {
        [key: string]: any;
    };
}
export interface FieldConfiguration {
    validators?: any;
    default?: unknown;
}
interface FormsState {
    forms: {
        [key: FormId]: {
            config: FormConfiguration;
            errors?: string[];
            fields: {
                [key: string]: {
                    config: FieldConfiguration;
                    value?: unknown;
                    errors?: string[];
                    validationErrors?: ValidationErrors;
                };
            };
        };
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
export declare const useFormsStore: import("pinia").StoreDefinition<"vuniform", FormsState, {
    getFieldNames(state: FormsState): (formId: FormId) => string[];
    formHasErrors(state: FormsState): (formId: FormId) => boolean;
    fieldHasErrors(state: FormsState): (formId: FormId, field: string) => boolean;
    fieldGetValue(state: FormsState): (formId: FormId, field: string) => unknown;
    fieldGetErrors(state: FormsState): (formId: FormId, field: string) => string[];
    formGetValues(state: FormsState): <T>(formId: FormId) => T;
}, {
    INIT_FORM({ formId, config }: InitFormPayload): void;
    SET_INITIAL_VALUES({ formId, values }: {
        formId: FormId;
        values: object;
    }): void;
    RESET_FIELD_VALUES(formId: FormId): void;
    DEINIT_FORM(formId: FormId): void;
    INIT_FORM_FIELD({ formId, name, config }: InitFormFieldPayload): void;
    STAGE_FIELD_CHANGE({ value, query: { formId, field } }: StageInputParams): void;
    SET_ERRORS(errors: ErrorsPayload): void;
    CLEAR_ERRORS(formId: FormId): void;
    CLEAR_ERROR(state: FormsState, { formId, field }: FieldQuery): void;
}>;
