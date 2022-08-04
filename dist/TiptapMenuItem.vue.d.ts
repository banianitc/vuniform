declare const _sfc_main: import("vue").DefineComponent<{
    icon: {
        type: any;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    action: {
        type: FunctionConstructor;
        required: true;
    };
    isActive: {
        type: FunctionConstructor[];
        required: false;
        default: any;
    };
}, {
    props: {
        icon: unknown;
        title: string;
        action: Function;
        isActive: Function | null;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    icon: {
        type: any;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    action: {
        type: FunctionConstructor;
        required: true;
    };
    isActive: {
        type: FunctionConstructor[];
        required: false;
        default: any;
    };
}>>, {
    isActive: Function;
}>;
export default _sfc_main;
