import React, {useState, useEffect} from "react";
import Controls from "./Controls.jsx";
import Canvas from "./Canvas.jsx";
import '../styles/App.css';

function App() {

  const [svgs, setSvgs] = useState([]);

  const addSvg = (svg) => {
    console.log(svgs)
    svgs.push(svg);
    setSvgs(svgs);
  }

  return (
    <div className="App">
      {/* <Controls clickHandler={addSvg}/> */}
      <Canvas props={svgs}/>
    </div>
  );
}

export default App;
