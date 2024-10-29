export interface OptionsType {
    componentAttr?: string;
    propsAttr?: string;
    loading?: string;
    debugProps?: boolean;
};

export type OptionsStrictType = Required<OptionsType>;

export type ComponentType = any; 

export type RegistryItemType = { component: ComponentType; async: boolean } 

export interface RootItemType {
    root: any;
    componentName: string;
    props: any;
}