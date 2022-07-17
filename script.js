
const pi = Math.PI;
const tau = 2 * pi;
let n = 9;
let angleRads = pi * 2 / n;
let angleDegs = 360 / n;

const centerX = 0;
const centerY = 0;

function clearDrawing() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getModulus() {
    return document.getElementById('modulus-text').value;
}
function getMultiplier() {
    return document.getElementById('multiplier-text').value;
}

function updateModulus(val) {
    document.getElementById('modulus-slider').value = val;
    document.getElementById('modulus-text').value = val;
}

function updateMultiplier(val) {
    document.getElementById('multiplier-slider').value = val;
    document.getElementById('multiplier-text').value = val;
}

function draw() {
    let svgWidth = 400;
    let svgHeight = svgWidth;

    // Diagram will be about 100 mm
    let radius = (svgWidth / 2) - 11;
    let center = svgWidth / 2;

    let modulus = getModulus();
    let multiplier = getMultiplier();

    let svg = buildSVG(svgWidth, svgHeight);
    let outline = svgCircle(center, radius);

    // Clear previous lines, if any
    while (svg.children.length >= 1) {
        svg.removeChild(svg.children[0]);
    }

    let svgArea = document.getElementById('svg-graph');
    //console.log(svgArea.children.length);
    if (svgArea.children.length >= 1) {
        svgArea.removeChild(svgArea.children[0]);
    }

    svg.appendChild(outline);
    // Add lines to svg
    drawSvgLines(center, radius, multiplier, modulus, svg);
    // Add svg to DOM
    //console.log(svg.children.length);
    document.getElementById('svg-graph').appendChild(svg);

}

//scale color of line based on length where length is some percentage of the color range?
function remap(val, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (val - low1) / (high1 - low1);
}


// check thse params to see if they are needed
function getLength(c, r, m, n) {
    //console.log(alpha);
    let x1 = c + r * Math.sin(i * 2 * Math.PI / n);
    let y1 = c - r * Math.cos(i * 2 * Math.PI / n);
    let x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
    let y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);

    //console.log(x1, y1, x2, y2);
    let line = svgLine(x1, y1, x2, y2);
    let lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);
    return lineLength;
}

function drawSvgLines(c, r, m, n, svg) {
    for (i = 0; i < n; i++) {
        let alpha = (i * m) % n;
        //console.log(alpha, i, (i * m));

        if (alpha != i) {
            let mappedLength = parseInt(remap(lineLength, 0, 2 * r, 0, n));
            let lineColor = getLineColor('#0000FF', '#FF0000', 0, n, mappedLength);
            console.log("LINE VALS: ", lineLength, mappedLength, lineColor);
            line.setAttribute('stroke', lineColor);
            svg.appendChild(line);
        }
    }
}

function hexToRGB(hex) {
    let arr = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i.exec(hex);
    let r = parseInt(arr[1], 16);
    let g = parseInt(arr[2], 16);
    let b = parseInt(arr[3], 16);
    let rgb = {
        'r': r,
        'g': g,
        'b': b,
    }
    //console.log(r, g, b);
    // let rgb = "rgb(" + r + ',' + g + ',' + b + ")";
    return rgb;
}

function getLineColor(color1, color2, min, max, val) {
    // get start and end colors for range
    let rgb1 = hexToRGB(color1);
    let rgb2 = hexToRGB(color2);
    //console.log(rgb1, rgb2);
    // gradient fade
    let fade = remap(val, min, max, 0, 1);

    // get color ranges
    let r = Math.abs(rgb2.r - rgb1.r);
    let g = Math.abs(rgb2.g - rgb1.g);
    let b = Math.abs(rgb2.b - rgb1.b);

    // increment color by step
    r = parseInt(r * fade - rgb1.r);
    g = parseInt(g * fade - rgb1.g);
    b = parseInt(b * fade - rgb1.b);
    console.log(r, g, b);
    // console.log(rgb1.b, rgb2.b, b, fade);

    let rgb = "rgb(" + Math.abs(r) + ',' + Math.abs(g) + ',' + Math.abs(b) + ")";
    return rgb;
}

// SVG Engine
function downloadSVG() {
    // get the svg
    let svg = document.getElementById('svg-graph');
    // get ellipse
    let outline = svg.getElementsByTagName('ellipse');
    // get lines
    outline.setAttribute('stroke', 'black');
    let lines = svg.getElementsByTagName('line');
    //console.log(lines.length);
    for (let line in lines) {
        line.setAttribute('stroke', 'blue');
    }
    let svgFile = svg.innerHTML;
    let blob = new Blob([svgFile.toString()]);
    let element = document.createElement("a");
    element.download = "svg-coaster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}

function buildSVG(w, h) {

    let mySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mySvg.setAttribute('fill', 'none');
    mySvg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    mySvg.setAttribute('stroke', 'black');
    return mySvg;
}

function svgLine(x1, y1, x2, y2) {
    let myLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    myLine.setAttribute("x1", parseInt(x1));
    myLine.setAttribute("y1", parseInt(y1));
    myLine.setAttribute("x2", parseInt(x2));
    myLine.setAttribute("y2", parseInt(y2));
    // myLine.setAttribute('stroke', c);
    return myLine;
}

function svgCircle(center, radius) {
    let myCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    myCircle.setAttribute('cx', parseInt(center));
    myCircle.setAttribute('cy', parseInt(center));
    myCircle.setAttribute('rx', parseInt(radius));
    myCircle.setAttribute('ry', parseInt(radius));
    myCircle.setAttribute('stroke', 'black');
    myCircle.setAttribute('fill', 'none');
    return myCircle;
}

