import { RootItemType } from "./types";

class MountedRoots {
    private roots: Map<HTMLElement, RootItemType>; // Specify types for roots

    constructor() {
        this.roots = new Map(); // Store mounted roots by element
    }

    add(element: HTMLElement, { root, componentName, props }: RootItemType): void {
        this.roots.set(element, { root, componentName, props });
    }

    get(element: HTMLElement): RootItemType | undefined { // Add return type
        return this.roots.get(element);
    }

    updateProps(element: HTMLElement, newProps: any): void { // Add types for parameters
        const mounted = this.get(element);
        if (mounted) {
            mounted.props = newProps;
        }
    }

    has(element: HTMLElement): boolean { // Add return type
        return this.roots.has(element);
    }

    warnIfNotMounted(element: HTMLElement): void { // Add types for parameters
        if (!this.has(element)) {
            console.warn("No mounted component found for the specified element.");
        }
    }
}

export default MountedRoots; 