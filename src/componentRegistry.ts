import { ComponentType, RegistryItemType } from "./types";
import { getLevenshteinDistance } from "./utils";

class ComponentRegistry {
    private registry: { [key: string]: RegistryItemType };

    constructor() {
        this.registry = {};
    }

    // Register synchronous component
    register(component: ComponentType, async: false) {
        return {
            as: (name: string) => {
                this.registry[name] = { component, async };
            }
        };
    }

    // Get registered component
    getComponent(name: string) {
        return this.registry[name];
    }

    suggest(componentName: string) {
        const suggestions = Object.keys(this.registry)
            .filter((name) => name.includes(componentName) || getLevenshteinDistance(name, componentName) <= 2); // Allow a distance of 2

        return suggestions.map((x, index) => {
            if (index === suggestions.length - 1) return '"' + x + '"';
            if (index === suggestions.length - 2) return '"' + x + '" or ';
            return '"' + x + '", ';
        }).join('');
    }
}

export default ComponentRegistry; 