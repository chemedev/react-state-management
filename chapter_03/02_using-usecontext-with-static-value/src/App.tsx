import { createContext, useContext } from "react";

const ColorContext = createContext('black');

const Component = () => {
  const color = useContext(ColorContext);
  return <div style={{ color }}>Hello {color}</div>;
};

const App = () => (
  <>
    <Component />
    <ColorContext.Provider value="red">
      <Component />
    </ColorContext.Provider>
    <ColorContext.Provider value="green">
      <Component />
    </ColorContext.Provider>
    <ColorContext.Provider value="blue">
      <Component />
      <ColorContext.Provider value="skyblue">
        <Component />
      </ColorContext.Provider>
    </ColorContext.Provider>
  </>
);

export default App;


// The first Component instance shows the color "black" because it's not wrapped by any providers.
// The second and the third show "red" and "green" respectively.
// The fourth Component instance shows "blue", and the last Component instance shows "skyblue", because the closest provider has the value "skyblue" even though it's inside the provider with "blue".

// Multiple providers and reusing the consumer component is an important capability of React Context.
// If this capability is not important for your use case, you might not need React Context.
// We will discuss the subscription method without Context in Chapter 4, Sharing Module State with Subscription.