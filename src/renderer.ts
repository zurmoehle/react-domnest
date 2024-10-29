import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
    type RegistryItemType,
    type OptionsStrictType
} from './types';
import { kebabize } from './utils';

class Renderer {
    mountedRoots: any;
    options: OptionsStrictType;

    constructor(mountedRoots: any, options: OptionsStrictType) {
        this.mountedRoots = mountedRoots;
        this.options = options;
    }

    // Render synchronous components
    render(element: HTMLElement, registered: RegistryItemType, props: any): void {
        const renderComponent = React.createElement(registered.component, props);
        const root = this.rootRender(element, renderComponent); // Component is used as a value here
        this.mountedRoots.add(element, {root, componentName: element.getAttribute(this.options.componentAttr), props});
    }

    // Render asynchronous components
    async renderAsync(
        element: HTMLElement, 
        registered: RegistryItemType, 
        props: any
    ): Promise<void> {        
        const LazyComponent = React.lazy(() => {
            return Promise.resolve({default: registered.component});
        });
        
        const ReactComponent = React.createElement(LazyComponent, props);        
        const Suspense = React.createElement(React.Suspense, {fallback: this.options.loading}, ReactComponent);
        
        const root = this.rootRender(element, Suspense);        
        this.mountedRoots.add(element, root, element.getAttribute(this.options.componentAttr), props);
    }

    rootRender(element: HTMLElement, renderComponent: React.ReactNode) {
        const root = ReactDOM.createRoot(element);
        root.render(renderComponent);
        
        //remove props attributes
        this.removePropsAttribures(element);

        return root;
    }

    removePropsAttribures(element: HTMLElement) {
        element.removeAttribute(this.options.propsAttr);
        
        //also remove all data-prop-* attributes
        Object.keys(element.dataset).forEach((key) => {            
            if (key.startsWith("prop")) {
                const propName = kebabize(key);                
                element.removeAttribute(`data-${propName}`);
            }
        });
    }
}

export default Renderer;