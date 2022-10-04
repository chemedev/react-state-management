// When is a local state not appropriate? It isn't appropriate when we want to break the locality.
// In the AddBase component example, it's when we want to change base from a totally different part of the code.
// If you need to change state from outside the function component, that's when a global state comes in.

// The state variable is conceptually a global variable. A global variable is useful to control a JavaScript function's behavior from outside the function.
// Likewise, a global state is useful to control React component behavior from outside the component.
// However, using a global state makes the component behavior less predictable. 
// It's a trade-off. We shouldn't use global states more than we need to.
// Consider using local states as a primary means and only use global states for a secondary mean.
// In this sense, it's important to learn how many use cases local states can cover.

const addOne = (n) => n + 1;

let base = 1;

const addBase = (n) => n + base;

const createContainer = () => {
  let base = 1;
  const addBase = (n) => n + base;
  const changeBase = (b) => { base = b; };
  return { addBase, changeBase };
};

const { addBase, changeBase } = createContainer();

const Component = ({ number }) => {
  return <div>{number}</div>;
};

const AddOne = ({ number }) => {
  return <div>{number + 1}</div>;
};

const AddBase = ({ number }) => {
  const [base, changeBase] = useState(1);
  return <div>{number + base}</div>;
};
