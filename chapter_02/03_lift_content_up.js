// If the count is changed, the Parent re-renders, and then Component1, Component2, and AdditionalInfo re-render too.
// However, AdditionalInfo doesn't have to re-render in this case because it doesn't depend on count.
// This is an extra re-render that should be avoided if it has an impact on performance.
// To avoid extra re-renders, we can lift up content.
// In this case, Parent re-renders with count, hence, we create GrandParent, as follows:

const AdditionalInfo = () => {
  return <p>Some information</p>
};

const Component1 = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
      <AdditionalInfo />
    </div>
  );
};

const Parent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Component1 count={count} setCount={setCount} />
      <Component2 count={count} setCount={setCount} />
    </>
  );
};

const AdditionalInfo = () => {
  return <p>Some information</p>
};

const Component1 = ({ count, setCount, additionalInfo }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
      {additionalInfo}
    </div>
  );
};

const Parent = ({ additionalInfo }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Component1
        count={count}
        setCount={setCount}
        additionalInfo={additionalInfo}
      />
      <Component2 count={count} setCount={setCount} />
    </>
  );
};

const GrandParent = () => {
  return <Parent additionalInfo={<AdditionalInfo />} />;
};

const AdditionalInfo = () => {
  return <p>Some information</p>
};

const Component1 = ({ count, setCount, children }) => {
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>
        Increment Count
      </button>
      {children}
    </div>
  );
};

const Parent = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Component1 count={count} setCount={setCount}>
        {children}
      </Component1>
      <Component2 count={count} setCount={setCount} />
    </>
  );
};

const GrandParent = () => {
  return (
    <Parent>
      <AdditionalInfo />
    </Parent>
  );
};
