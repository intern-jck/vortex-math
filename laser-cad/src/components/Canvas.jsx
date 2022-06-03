import React, { useState, useEffect } from 'react';
import {makeRect} from './svgMaker.js';

function Canvas() {

  const [svgs, setSvgs] = useState([]);

  // useEffect(() => {
  //   console.log(props)
  //   setSvgs(props);
  // }, [props]);

  const addRect = (event) => {
    event.preventDefault();
    const newRect = makeRect(10, 10, 100, 100);
    console.log(newRect);
    svgs.push(newRect);
    setSvgs(svgs);
  }

  return (
    <div id="canvas">
      <button onClick={addRect}>ADD RECT</button>

      <svg version="1.1"
          baseProfile="full"
          width="400" height="400"
          xmlns="http://www.w3.org/2000/svg">
            { svgs ? svgs.map((prop) =>{
              return prop;
            }) : null}
            { svgs[0]}
      </svg>


    </div>
  );

}


export default Canvas;