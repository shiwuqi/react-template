import * as React from "react";
import { Button } from "antd";

export default function Hook() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </Button>
      {count}
      <Button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </Button>
    </div>
  );
}
