import type { Editor } from '@tiptap/vue-3';
declare const _sfc_main: import("vue").DefineComponent<{
    editor: {
        type: any;
        required: true;
    };
}, {
    props: {
        editor: Editor;
    };
    items: ({
        icon: (new () => import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, Record<string, any>, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}>, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>) & import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}> & {
            props?: undefined;
        } & ThisType<import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, Record<string, any>, Readonly<{}>, import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}>, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>>;
        title: string;
        action: () => void;
        isActive: () => boolean;
        type?: undefined;
    } | {
        type: string;
        icon?: undefined;
        title?: undefined;
        action?: undefined;
        isActive?: undefined;
    } | {
        icon: (new () => import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, Record<string, any>, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}>, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>) & import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}> & {
            props?: undefined;
        } & ThisType<import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, Record<string, any>, Readonly<{}>, import("vue").ComponentOptionsBase<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}>, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>>;
        title: string;
        action: () => boolean;
        isActive?: undefined;
        type?: undefined;
    })[];
    MenuItem: import("vue").DefineComponent<{
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
            isActive: Function;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    editor: {
        type: any;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
