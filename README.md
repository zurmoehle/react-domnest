# React DomNest

## Overview

React DomNest is a lightweight utility designed for dynamically mounting React components using HTML data attributes. It provides a flexible and efficient way to register components, allowing for both synchronous and asynchronous loading. This is particularly useful for embedding React components in environments managed by Content Management Systems (CMS).

### Features

- **Dynamic Component Registration**: Easily register components using data attributes.
- **Synchronous and Asynchronous Loading**: Supports both types of component loading.
- **Scoped Updates**: Update components within specific scopes.
- **React 18 Support**: Utilizes the `createRoot` API for optimal performance.

## Installation

To get started with React DomNest, you can install it via npm:

```bash
npm install react-domnest
```

## Usage

### Prepare The Component

To prepare a component for use with React DomNest, you need to follow a few steps to ensure that your component is properly set up and can be dynamically registered and mounted. Here’s a guide on how to prepare your component:

1. **Create Your Component**: Start by creating a React component that you want to use with DomNest. For example, you can create a simple functional component.

```javascript
// src/components/component.js
import React from 'react';

const DemoComponent = ({ testProp }) => {
    return <div>{testProp}</div>;
};

export default DemoComponent;
```

2. **Export the Component**: Ensure that your component is exported so that it can be imported and registered by DomNest.

3. **Create a Configuration File**: Create a configuration file for your component. This file will be used to register the component with DomNest.

```javascript
// src/components/config.domnest.js
import DemoComponent from './component';

export default {
    component: DemoComponent,
    name: "DemoComponent",
    async: true,
};
```


### Registering the Components

To register the components, you can use the following code snippet:

```javascript
import DomNest from 'react-domnest';

const getContexts = () => [
    require.context(
      './components/',
      true,
      /config\.domnest\.js$/
    ),
  ]
const contexts = getContexts()

const domNest = new DomNest();
domNest.context.registerComponents(contexts);
// Initialize and mount components
domNest.init(document);
```

### HTML Setup

In your HTML file, you can specify the component and its props using data attributes:

```html
<div data-component="DemoComponent" data-props='{"testProp": "DemoNest"}'></div>
```


## Running the Demo

To run the demo component, you can use the `http-server` package. If you haven't installed it yet, you can do so globally:

```bash
npm install -g http-server
```

Once installed, navigate to the directory containing your `index.html` file and run:

```bash
http-server
```

This will start a local server, and you can access the demo in your browser at `http://localhost:8080` (or the port specified by `http-server`).


## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.