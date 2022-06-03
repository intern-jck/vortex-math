

function vortextDiagram() {
    let n = 9;
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

            let lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);
            let mappedLength = parseInt(remap(lineLength, 0, 2 * r, 0, n));

            //let hexNumber = parseInt(remap(lineLength, 0, 2 * r, 0, 4096));
            //let hexMod = hexNumber % 16;
            //console.log("LINE VALS: ", lineLength, mappedLength, hexNumber, hexMod, hexMod.toString(16));
            //console.log("LINE VALS: ", lineLength, mappedLength, hexColor);

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

