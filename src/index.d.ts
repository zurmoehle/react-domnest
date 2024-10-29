declare module 'react-domnest' {
    import { OptionsType, OptionsStrictType } from './types';

    export default class DomNest {
        options: OptionsStrictType;
        registry: any; // Replace with actual type if known
        mountedRoots: any; // Replace with actual type if known
        renderer: any; // Replace with actual type if known
        register: Function;
        context: any; // Replace with actual type if known

        constructor(options: OptionsType);
        parseProps(element: HTMLElement): { [key: string]: any };
        initNest(element: HTMLElement): void;
        init(scope?: Document | HTMLElement): void;
        update(scope?: Document | HTMLElement): void;
    }

    export interface ComponentConfig {
        component: any; // Replace with actual component type
        name: string;
        async: boolean;
    }
} 