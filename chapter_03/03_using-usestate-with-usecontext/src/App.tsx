import { SetStateAction, createContext, useContext, useState } from "react";

const CountStateContext = createContext({ count: 0, setCount: (_: SetStateAction<number>) => {} });

// The default value helps to infer types in TypeScript. However, in most cases, we need a state instead of a static value, as the default value is not very useful.
// Using the default value is almost unintentional in such cases, so we may throw an error instead.
// We will discuss some best practices later in the Best practices for using Context section.
// The App component has a state with useState, and passes count and setCount to the created Context provider component, as illustrated in the following code snippet:

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <CountStateContext.Provider value={{ count, setCount }}>
      <Parent />
    </CountStateContext.Provider>
  );
};

// The Context value we pass to CountStateContext.Provider is an object containing count and setCount. This object has the same structure as the default value.
// We define a Parent component. Unlike the example in the previous section, we don't need to pass props. The code is illustrated in the following snippet:

const Parent = () => (
  <>
    <Component1 />
    <Component2 />
  </>
);


// Even though the Parent component is in the Context provider in App, it does not know about the existence of the count state. The components inside Parent can still use the count state through the Context.
// Finally, we define Component1 and Component2. They take count and setCount from the Context value instead of props. The code is illustrated in the following snippet:

const Component1 = () => {
  const { count, setCount } = useContext(CountStateContext);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
};

const Component2 = () => {
  const { count, setCount } = useContext(CountStateContext);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 2)}>+2</button>
    </div>
  );
};

export default App;
