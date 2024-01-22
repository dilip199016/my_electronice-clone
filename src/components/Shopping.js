// src/components/Shopping.js
import { useState } from 'react';
import { Button } from '@mui/material';
// import '../styles/shopping.css';

function Shopping() {
  const [initial, setInitial] = useState(0);

  const add = () => {
    setInitial(initial + 1);
  };

  const remove = () => {
    if (initial > 0) {
      setInitial(initial - 1);
    } else {
      setInitial(0);
    }
  };

  return (
    <div>
      <div className="Container">
        <h2>Jeans</h2>
        <Button className='choice' onClick={add}>+</Button>
        <h3>{initial}</h3>
        <Button className='choice' onClick={remove}>-</Button>
      </div>
    </div>
  );
}

export default Shopping;
