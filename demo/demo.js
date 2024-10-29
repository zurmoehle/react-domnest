import DomNest from '../src/index'; // Import the library

const domNest = new DomNest({
    debugProps: true,
});
const getContexts = () => [
    require.context(
      './components/',
      true,
      /config\.domnest\.js$/
    ),
  ]
const contexts = getContexts()

domNest.context.registerComponents(contexts);
// Initialize and mount components
domNest.init(document);

