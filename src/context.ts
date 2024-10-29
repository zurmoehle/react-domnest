class Context {
    registry: any;

    constructor(registry: any) {
        this.registry = registry;
    }

    getComponents = (contexts: any) => {
        const components = contexts.map((context:any) => context.keys().map(context)).flat();
        return components;
    }

    registerComponents = (contexts: any) => {
        const components = this.getComponents(contexts);
        
        components.forEach((module: any) => {
            const component = module.default;
            if(!component.component) {
                console.error(`Invalid component configuration: ${component}`);
                return;
            }
            this.registry.register(component.component, component.async).as(component.name);
        });
    }
}

export default Context;
