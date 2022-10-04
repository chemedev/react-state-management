// You pass a value of 1 to setCount in the onClick handler.
// If you click the button, it will trigger Component to re-render with count=1.
// What would happen if you clicked the button again? It will invoke setCount(1) again, but as it is the same value, it "bails out" and the component won't re-render.
// Bailout is a technical term in React and basically means avoiding triggering re-renders.

const Component = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(1)}>Set Count to 1</button>
    </div>
  );
};

// This behaves exactly the same as the previous example for the first click; however, if you click the button again, the component will re-render.
// You don't see any difference on screen because the count hasn't changed.
// This happens because the second click creates a new object, { count: 1 }, and it's different from the previous object.

// Now, this leads to the following bad practice:
const Component = () => {
  const [state, setState] = useState({ count: 0 });
  return (
    <div>
      {state.count}
      <button onClick={() => setState({ count: 1 })}>
        Set Count to 1
      </button>
    </div>
  );
};

// This doesn't work as expected. Even if you click the button, it won't re-render.
// This is because the state object is referentially unchanged, and it bails out, meaning this alone doesn't trigger the re-render.

//Finally, there's an interesting usage of value update, which we can see here:
const Component = () => {
  const [state, setState] = useState({ count: 0 });
  return (
    <div>
      {state.count}
      <button
        onClick={() => { state.count = 1; setState(state); }}
      >
        Set Count to 1
      </button>
    </div>
  );
};

// Clicking the button will increment the count; however, if you click the button twice quickly enough, it will increment by just one number.
// This is sometimes desirable as it matches with the button title, but sometimes it's not if you expect to count how many times the button is actually clicked. That requires a function update.


// This actually counts how many times the button is clicked, because (c) => c + 1 is invoked sequentially.
// As we saw in the previous section, value update has the same use case as the Set Count to {count + 1} feature.
// In most use cases, function updates work better if the update is based on the previous value.
// The Set Count to {count + 1} feature actually means that it doesn't depend on the previous value but depends on the displayed value.

const Component = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>
        Set Count to {count + 1 }
      </button>
    </div>
  );
};

// Bailout is also possible with function updates. Here's an example to demonstrate this:
const Component = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
    </div>
  );
};

const Component = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      {count}
      <button
        onClick={() =>
          setCount((c) => c % 2 === 0 ? c : c + 1)}
      >
        Increment Count if it makes the result even
      </button>
    </div>
  );
};

// If the update function returns the exact same state as the previous state, it will bail out, and this component won't re-render. For example, if you invoke setCount((c) => c), it will never re-render.

// Lazy initialization
// useState can receive a function for initialization that will be evaluated only in the first render. We can do something like this:
const init = () => 0;

const Component = () => {
  const [count, setCount] = useState(init);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
    </div>
  );
};

// The use of init in this example is not very effective because returning 0 doesn't require much computation, but the point is that the init function can include heavy computation and is only invoked to get the initial state.
// The init function is evaluated lazily, not evaluated before calling useState; in other words, it's invoked just once on mount.