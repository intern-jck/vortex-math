
class Vortex {

  constructor() {
    this.pi = Math.PI;
    this.tau = 2 * this.pi;

    this.svgWidth = 400;
    this.svgHeight = this.svgWidth;

    // this.svgWidth = '100%';
    // this.svgHeight = this.svgWidth;

    this.radius = (this.svgWidth /2) - 11; // 50.00625 mm
    this.diameter = this.radius * 2; // 100.0125 mm
    this.center = this.svgWidth / 2;
  }

  getModulus() {
    return document.getElementById('modulus-text').value;
  }

  getMultiplier() {
    return document.getElementById('multiplier-text').value;
  }

  updateModulus(val) {
    document.getElementById('modulus-slider').value = val;
    document.getElementById('modulus-text').value = val;
  }

  updateMultiplier(val) {
    document.getElementById('multiplier-slider').value = val;
    document.getElementById('multiplier-text').value = val;
  }

  remapInt(val, low1, high1, low2, high2) {
    let remapped = low2 + (high2 - low2) * (val - low1) / (high1 - low1);
    return Math.floor(remapped);
  }

  // SVG Engine
  // Creates the SVG element
  buildSVG(w, h) {
    let mySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mySvg.setAttribute('fill', 'none');
    mySvg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    mySvg.setAttribute('id', 'svg-total')
    return mySvg;
  }

  // Creates SVG primitive shapes
  svgLine(x1, y1, x2, y2) {
    let myLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    myLine.setAttribute('x1', parseInt(x1));
    myLine.setAttribute('y1', parseInt(y1));
    myLine.setAttribute('x2', parseInt(x2));
    myLine.setAttribute('y2', parseInt(y2));
    myLine.setAttribute('class', 'svg-line');
    return myLine;
  }

  svgCircle(center, radius) {
    let myCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    myCircle.setAttribute('cx', parseInt(center));
    myCircle.setAttribute('cy', parseInt(center));
    myCircle.setAttribute('rx', parseInt(radius));
    myCircle.setAttribute('ry', parseInt(radius));
    myCircle.setAttribute('stroke', 'black');
    myCircle.setAttribute('fill', 'none');
    myCircle.setAttribute('id', 'svg-outline');
    return myCircle;
  }

  svgText(x, y, text) {
    let myText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    myText.setAttribute('x', parseInt(x));
    myText.setAttribute('y', parseInt(y));
    myText.setAttribute('stroke', 'black');
    myText.setAttribute('text-anchor', 'middle');
    myText.innerHTML = text;
    console.log(myText);
    return myText;
  }

  createColors() {

    // Create 96 colors
    let colors = [];

    for(let r = 0; r <= 255; r += 8) {
      let rgbR = 'rgb(255,' + r + ', 0)';
      colors.push(rgbR);
    }

    for(let g = 0; g <= 255; g += 8) {
      let rgbG = 'rgb(0, 255, ' + g + ')';
      colors.push(rgbG);
    }

    for(let b = 0; b <= 255; b += 8) {
      let rgbR = 'rgb(' + b + ', 0, 255)';
      colors.push(rgbR);
    }
    return colors;
  }



  // Creates a array of svg lines based on inputs:
  // center, radius, mulitplier and modulus.
  createLines(c, r, m, n) {
    let lines = [];
    for (let i = 0; i < n; i++) {
      // Alpha is remainder after division.
      // It is also the digital root for base m
      let alpha = (i * m) % n;
      if (alpha != i) {
        // Get x,y cords for two points along circle.
        // Starting point.
        let x1 = c + r * Math.sin(i * 2 * Math.PI / n);
        let y1 = c - r * Math.cos(i * 2 * Math.PI / n);
        // Ending point.
        let x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
        let y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
        // Create lines between these two points.
        let line = this.svgLine(x1, y1, x2, y2);

        // Set color and add to svg...
        let lineLength = Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2));
        let colorNumber = this.remapInt(lineLength, 0, this.diameter, 96, 0);
        let colors = this.createColors();
        console.log(colors[colorNumber]);
        line.setAttribute('stroke', colors[colorNumber]);

        lines.push(line);
      }
    }
    return lines;
  }

  downloadSVG() {

    // Get the SVG container div.
    let svgGraph = document.getElementById('svg-container');

    // Get outline and change stroke to black.
    let outline = document.getElementById('svg-outline');
    outline.setAttribute('stroke', 'black');

    // Get each line and change stroke to blue.
    let lines = document.getElementsByClassName('svg-line');
    for (let i = 0; i < lines.length; i++) {
        lines[i].setAttribute('stroke', 'blue');
    }

    // Create a file to download from the SVG html,
    // then download the file.
    let svgFile = svgGraph.innerHTML;
    let blob = new Blob([svgFile.toString()]);
    let element = document.createElement("a");
    element.download = "svg-coaster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  }

  draw() {

    // Clear previous graph.
    let svgGraph = document.getElementById('svg-container');
    if (svgGraph.children.length >= 1) {
      svgGraph.removeChild(svgGraph.children[0]);
    }
    // Get the current modulus and multiplier.
    let modulus = this.getModulus();
    let multiplier = this.getMultiplier();

    // Create a new SVG element
    let svg = this.buildSVG(this.svgWidth, this.svgHeight);

    // Create outline and add to SVG.
    let outline = this.svgCircle(this.center, this.radius);
    svg.appendChild(outline);

    // Add numbers to outside of outline
    // for(let i = 0; i < modulus; i++) {
    //   let x1 = this.center + (this.radius + 5) * Math.sin(i * 2 * Math.PI / modulus);
    //   let y1 = this.center - (this.radius + 5) * Math.cos(i * 2 * Math.PI / modulus);
    //   let number = this.svgText(x1, y1, i);
    //   svg.appendChild(number);
    // }
    // Create and add lines to SVG.
    let lines = this.createLines(this.center, this.radius, multiplier, modulus, svg);
    for(let i  = 0; i < lines.length; i++) {
      svg.appendChild(lines[i]);
    }

    // Give SVG a class name.
    svg.setAttribute('class', 'vector-graph-svg');
    // Add SVG to div.
    document.getElementById('svg-container').appendChild(svg);
  }

}

let myVortex = new Vortex();
myVortex.draw();


let updateModulus = function(value) {
  myVortex.updateModulus(value);
}

let updateMultiplier = function(value) {
  myVortex.updateMultiplier(value);
}

let downloadSVG = function() {
  myVortex.downloadSVG();
}
let draw = function() {
  myVortex.draw();
}