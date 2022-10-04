// There are two aspects when people talk about a global state, as outlined here:
// One is a singleton, meaning that in some contexts, the state has one value.
// The other is a shared state, which means that the state value is shared among different components,
// but it doesn't have to be the single value in JavaScript memory.
// A global state that is not a singleton can have multiple values.

const createContainer = () => {
  let base = 1;
  const addBase = (n) => n + base;
  const changeBase = (b) => { base = b; };
  return { addBase, changeBase };
};

const container1 = createContainer();
const container2 = createContainer();

container1.changeBase(10);

console.log(container1.addBase(2)); // shows "12"
console.log(container2.addBase(2)); // shows "3"

// In this example, base is a scoped variable in a container. As base is isolated in each container,
// changing base in container1 doesn't affect base in container2.

// In React, the concept is similar. If a global state is a singleton, we have only one value in memory.
// If a global state is non-singleton, we may have multiple values for different parts (subtrees) of a component tree.

const Component1 = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
    </div>
  );
};

const Parent = ({ count, setCount }) => {
  return (
    <>
      <Component1 count={count} setCount={setCount} />
    </>
  );
};

const GrandParent = ({ count, setCount }) => {
  return (
    <>
      <Parent count={count} setCount={setCount} />
    </>
  );
};

const Root = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <GrandParent count={count} setCount={setCount} />
    </>
  );
};

const Component1 = () => {
  // useGlobalCountState is a pseudo hook
  const [count, setCount] = useGlobalCountState();
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
    </div>
  );
};

const Parent = () => {
  return (
    <>
      <Component1 />
    </>
  );
};

const GrandParent = () => {
  return (
    <>
      <Parent />
    </>
  );
};

const Root = () => {
  return (
    <>
      <GrandParent />
    </>
  );
};

const globalState = {
  authInfo: { name: 'React' },
};

const Component1 = () => {
  // useGlobalState is a pseudo hook
  const { authInfo } = useGlobalState();
  return (
    <div>
      {authInfo.name}
    </div>
  );
};
