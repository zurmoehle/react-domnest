import ComponentRegistry from './componentRegistry';
import MountedRoots from './mountedRoots';
import Renderer from './renderer'; // Import the Renderer class
import Context from './context'; // Import the Renderer class
import { type OptionsType, type OptionsStrictType } from './types';

class DomNest {
    options: OptionsStrictType; // Declare the options property
    registry: ComponentRegistry; // Specify the registry property type
    mountedRoots: MountedRoots; // Specify the mountedRoots property type
    renderer: Renderer; // Specify the renderer property type
    register: Function; // Specify the register property type
    context: any; // Specify the context property type

    constructor(options: OptionsType) {
        // Options for custom attribute names
        this.options = {
            componentAttr: options?.componentAttr || 'data-component', // default is 'data-component'
            propsAttr: options?.propsAttr || 'data-props', // default is 'data-props'
            loading: options?.loading || 'Loading...', // default loading HTML
            debugProps: options?.debugProps || false // default debugProps
        };

        // Component registry to store registered components
        this.registry = new ComponentRegistry();
        this.mountedRoots = new MountedRoots(); // Use the new MountedRoots class
        this.renderer = new Renderer(this.mountedRoots, this.options); // Instantiate Renderer
        this.context = new Context(this.registry); // Instantiate Context

        //shoertcut for register method
        this.register = this.registry.register.bind(this.registry);
    }

    // Method to parse props from data attributes
    parseProps(element: HTMLElement) {
        const props: { [key: string]: any } = {}; // Define props with an index signature

        // Parse JSON-style props from the specified attribute
        if (element.getAttribute(this.options.propsAttr)) {
            try {
                Object.assign(props, JSON.parse(element.getAttribute(this.options.propsAttr) || ''));
            } catch (error) {
                console.error(`Failed to parse '${this.options.propsAttr}' JSON:`, error);
            }
        }

        // Parse individual data-prop-* attributes
        Object.keys(element.dataset).forEach((key) => {
            if (key.startsWith("prop") && key !== this.options.propsAttr.replace("data-", "")) {
                const propName = key.replace("prop", "").toLowerCase();
                props[propName] = element.dataset[key];
            }
        });

        if(this.options.debugProps) {
            console.log(`DomNest props for:`, element, props);
        }

        return props;
    }

    // Initialize and mount a single component
    initNest(element: HTMLElement) {
        const componentName = element.getAttribute(this.options.componentAttr);

        if (!componentName) {
            console.warn(`No component name specified for element:`, element);
            return;
        }

        const registered = this.registry.getComponent(componentName);

        if (registered) {
            const props = this.parseProps(element);

            if (registered.async) {
                this.renderer.renderAsync(element, registered, props); // Use Renderer
            } else {
                this.renderer.render(element, registered, props); // Use Renderer
            }
        } else {
            const suggestions = this.registry.suggest(componentName);
            console.warn(`Component ${componentName} is not registered. ${suggestions.length ? `Did you mean ${suggestions}?` : ''}`);
        }
    }


    // Initialize and mount components in a specific scope
    init(scope = document) {
        const selector = `[${this.options.componentAttr}]`;
        scope.querySelectorAll(selector).forEach((element) => this.initNest(element as HTMLElement)); // Type assertion added
    }

    // Update components within a specific element
    update(scope = document) {
        const selector = `[${this.options.componentAttr}]`;
        scope.querySelectorAll(selector).forEach((element) => {
            const mounted = this.mountedRoots.get(element as HTMLElement);
            const componentName = mounted ? mounted.componentName : null;
            const registered = componentName ? this.registry.getComponent(componentName) : null;

            if (registered) {
                const newProps = this.parseProps(element as HTMLElement);
                const renderMethod = registered.async ? this.renderer.renderAsync : this.renderer.render;
                renderMethod.call(this.renderer, element as HTMLElement, registered, newProps); // Cast to HTMLElement
                this.mountedRoots.updateProps(element as HTMLElement, newProps); // Update stored props
            } else {
                if (mounted) {
                    console.warn(`Component ${componentName} not registered.`);
                } else {
                    this.mountedRoots.warnIfNotMounted(element as HTMLElement);
                    this.initNest(element as HTMLElement);
                }
            }
        });
    }
}

export default DomNest;