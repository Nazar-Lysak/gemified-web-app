import { useState } from "react";

const WidgetEntry = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Welcome to Gemified Web App!</h1>
      <h2>Subheading</h2>
      <p>This is a placeholder for the actual widget content.</p>
      <div>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter((prev) => prev + 1)}>Increment Counter</button>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit perferendis delectus ea
        corrupti quaerat beatae nesciunt dolore consectetur. Obcaecati cum, nesciunt aperiam
        exercitationem voluptate hic dolores voluptates voluptas accusamus?
      </p>
      <ul>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://example.com/privacy">
            Privacy
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://example.com/terms">
            Terms of Use
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WidgetEntry;
