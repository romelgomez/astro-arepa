import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>

      <br />

      <Button onClick={increment} type='button'>
        Increment
      </Button>

      <br />
      <br />

      <Button onClick={decrement} type='button'>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
