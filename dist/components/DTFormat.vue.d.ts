declare const _sfc_main: import("vue").DefineComponent<{
    datetime: {
        type: StringConstructor;
        required: true;
    };
    format: {
        type: any;
        required: false;
        default: () => any;
    };
    skipTimeTag: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: {
        datetime: string;
        format: Intl.DateTimeFormatOptions;
        skipTimeTag: boolean;
    };
    formattedTime: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    datetime: {
        type: StringConstructor;
        required: true;
    };
    format: {
        type: any;
        required: false;
        default: () => any;
    };
    skipTimeTag: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    format: any;
    skipTimeTag: boolean;
}>;
export default _sfc_main;
