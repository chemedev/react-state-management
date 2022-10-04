// When a Context provider has a new Context value, all Context consumers receive the new value and re-render.
// This means the value in the provider is propagated to all the consumers.
// It is important for us to understand how Context propagation works and its limitations.

// How Context propagation works
// If you use a Context provider, you can update the Context value. When a Context provider receives a new Context value, it triggers all the Context consumer components to re-render.
// It's sometimes the case that a child component re-renders for two reasons—one because of the parent, and the other because of the Context.
// To stop re-rendering without Context value changes, in this case, we can use the lift content up technique, or memo.
// memo is a function to wrap a component and is used to prevent re-renders if the component props don't change.

import {
  memo,
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

const ColorContext = createContext("black");

const ColorComponent = () => {
  const color = useContext(ColorContext);
  const renderCount = useRef(1);
  useEffect(() => {
    renderCount.current += 1;
  });
  return (
    <div style={{ color }}>
      Hello {color} (renders: {renderCount.current})
    </div>
  );
};

const MemoedColorComponent = memo(ColorComponent);

const DummyComponent = () => {
  const renderCount = useRef(1);
  useEffect(() => {
    renderCount.current += 1;
  });
  return <div>Dummy (renders: {renderCount.current})</div>;
};

const MemoedDummyComponent = memo(DummyComponent);

const Parent = () => (
  <ul>
    <li>
      <DummyComponent />
    </li>
    <li>
      <MemoedDummyComponent />
    </li>
    <li>
      <ColorComponent />
    </li>
    <li>
      <MemoedColorComponent />
    </li>
  </ul>
);

const App = () => {
  const [color, setColor] = useState("red");
  return (
    <ColorContext.Provider value={color}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <Parent />
    </ColorContext.Provider>
  );
};

export default App;
