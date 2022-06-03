import React, { useState } from 'react';
import {makeRect} from './svgMaker.js';

function Controls({clickHandler}) {

  // const [svg, setSvg] = useState();


  const addRect = (event) => {
    event.preventDefault();
    console.log(makeRect(10, 10, 100, 100));
  }

  return (
    <div>
      <button>ADD CIRCLE</button>
      <button onClick={addRect}>ADD RECT</button>
    </div>
  );

}


export default Controls;