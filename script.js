
const pi = Math.PI;
const tau = 2 * pi;
let n = 9;
let angleRads = pi * 2 / n;
let angleDegs = 360 / n;

const centerX = 0;
const centerY = 0;

function clearDrawing() {
    var canvas = document.getElementById('graph');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getModulus() {
    return document.getElementById('modulus-text').value;
}
function getMultiplier() {
    return document.getElementById('multiplier-text').value;
}

function updateModulus(val) {
    // let modVal = document.getElementById('modulus-slider').value;
    //document.getElementById("modulus-text").value = modVal;
    document.getElementById('modulus-slider').value = val;
    document.getElementById('modulus-text').value = val;
}

function updateMultiplier(val) {
    //let multiplierVal = document.getElementById('multiplier-slider').value;
    // document.getElementById("multiplier-text").value = multiplierVal;
    document.getElementById('multiplier-slider').value = val;
    document.getElementById('multiplier-text').value = val;
}

function draw() {
    let svgWidth = 400;
    let svgHeight = svgWidth;
    // Diagram will be about 100 mm
    let radius = (svgWidth / 2) - 11;
    let center = svgWidth / 2;

    // Use mm to download svg for laser cutting
    // const pixelToMM = 0.26;
    // let svgWidthMM = 400 * pixelToMM;
    // let svgHeightMM = svgWidthMM;
    // let radiusMM = (svgWidthMM / 2) - 10;
    // let centerMM = svgWidthMM / 2;

    let modulus = getModulus();
    let multiplier = getMultiplier();

    let svg = buildSVG(svgWidth, svgHeight);
    let outline = svgCircle(center, radius);

    // Clear previous lines, if any
    while (svg.children.length >= 1) {
        svg.removeChild(svg.children[0]);
    }

    let svgArea = document.getElementById('svg-graph');
    console.log(svgArea.children.length);
    if (svgArea.children.length >= 1) {
        svgArea.removeChild(svgArea.children[0]);
    }

    svg.appendChild(outline);
    // Add lines to svg
    drawSvgLines(center, radius, multiplier, modulus, svg);
    // Add svg to DOM
    console.log(svg.children.length);
    document.getElementById('svg-graph').appendChild(svg);

}


function drawSvgLines(c, r, m, n, svg) {
    for (i = 0; i < n; i++) {
        let alpha = (i * m) % n;
        //console.log(alpha, i, (i * m));
        if (alpha != i) {
            //console.log(alpha);
            let x1 = c + r * Math.sin(i * 2 * Math.PI / n);
            let y1 = c - r * Math.cos(i * 2 * Math.PI / n);
            let x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
            let y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
            //console.log(x1, y1, x2, y2);
            let line = svgLine(x1, y1, x2, y2);
            svg.appendChild(line);
        }
    }
}

function downloadSVG() {
    const svg = document.getElementById('svg-graph').innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
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
    myLine.setAttribute('stroke', 'blue');
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
