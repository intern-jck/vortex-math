
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

function draw() {

    var canvas = document.getElementById('graph');

    if (canvas.getContext) {
        // Set things up
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const center = canvas.width / 2;
        const radius = canvas.width * 0.45;
        ctx.font = '20px monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Shift corrs to center of canvas
        //ctx.translate(canvas.width / 2, canvas.height / 2);

        // Draw outline of circle
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, pi * 2, true);
        ctx.stroke();

        // Label points
        // document.getElementById('modulus-text').value;
        //let modulus = 50;
        let modulus = updateModulus();
        //let multiplier = 2;
        let multiplier = updateMultiplier();
        drawLabels(center, radius, modulus, ctx);
        drawLines(center, radius, multiplier, modulus, ctx)

    }

}

function drawLabels(c, r, n, canvas) {
    for (let i = 0; i < n; i++) {
        let textX = c + (r + 15) * Math.sin(pi * 2 * i / n);
        let textY = c - (r + 15) * Math.cos(pi * 2 * i / n);
        canvas.moveTo(c, c);
        canvas.fillText(i, textX, -textY)
    }
}

function drawLines(c, r, m, n, context) {
    loops = new Array();
    context.beginPath();
    for (i = 0; i < n; i++) {
        let alpha = (i * m) % n;
        //console.log(alpha, i, (i * m));
        if (alpha != i) {
            //console.log(alpha);
            let x1 = c + r * Math.sin(i * 2 * Math.PI / n);
            let y1 = c - r * Math.cos(i * 2 * Math.PI / n);
            let x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
            let y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            //console.log(x1, y1, x2, y2);
        }
    }
    context.stroke();
}

function updateModulus() {
    let modVal = document.getElementById('modulus-slider').value;
    document.getElementById("modulus-text").value = modVal;
    return modVal;
}

function updateMultiplier() {
    let multiplierVal = document.getElementById('multiplier-slider').value;
    document.getElementById("multiplier-text").value = multiplierVal;
    return multiplierVal;
}

// {/* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//   <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

//   <!-- If you do not specify the stroke
//        color the line will not be visible -->
// </svg> */}

function downloadSVG() {
    const svg = document.getElementById('svg-test').innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = "test.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}

function buildSVG() {

    let mySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let myCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    let myLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    mySvg.setAttribute('fill', 'none');
    mySvg.setAttribute('viewBox', '0 0 200 200');
    mySvg.setAttribute('stroke', 'black');

    myCircle.setAttribute('cx', '100');
    myCircle.setAttribute('cy', '100');
    myCircle.setAttribute('rx', '90');
    myCircle.setAttribute('ry', '90');
    myCircle.setAttribute('stroke', 'black');
    myCircle.setAttribute('fill', 'none');

    //<line x1="0" y1="80" x2="100" y2="20" stroke="black" />
    myLine.setAttribute("x1", "0");
    myLine.setAttribute("y1", "100");
    myLine.setAttribute("x2", "200");
    myLine.setAttribute("y2", "100");
    myLine.setAttribute('stroke', 'black');

    mySvg.appendChild(myCircle);
    mySvg.appendChild(myLine);

    document.getElementById("svg-test").appendChild(mySvg);
}




// function connectPoints(arr, context) {
//     context.moveTo(arr[0].x, arr[0].y)

//     for (let i = 1; i < arr.length; i++) {
//         if (i === arr.length - 1) {
//             return;
//         }
//         context.moveTo(arr[i].x, arr[i].y);
//         context.lineTo(arr[i + 1].x, arr[i + 1].y)
//         context.stroke();

//     }
// }



// function getPoints(seed, multiplier, modulus) {

//     let range = [];
//     let roots = [];
//     let points = [];

//     // take a number and find its remainder after division by modulus (the digital root)
//     range[0] = 1;
//     range[1] = seed;

//     // Get our number sequence
//     for (let i = 2; i < modulus * 2; i++) {
//         range.push(range[i - 1] * multiplier);
//     }
//     //console.log(range);
//     // Get the digital root
//     for (let i = 0; i < range.length; i++) {
//         roots.push(range[i] % modulus);
//         //console.log(roots[i]);
//         // Get the points on the circle for each root
//         // let xPos = radius * Math.sin(pi * 2 * roots[i] / modulus);
//         // let yPos = radius * Math.cos(pi * 2 * roots[i] / modulus);
//         let xPos = radius * Math.sin(pi * 2 * roots[i] / modulus);
//         let yPos = radius * Math.cos(pi * 2 * roots[i] / modulus);
//         // Invert yPos to start at top of circle
//         let point = {
//             'num': range[i],
//             'root': roots[i],
//             "x": xPos,
//             "y": -yPos
//         }
//         points.push(point);
//         //console.log(points[i]);
//         //console.log(range[i]);
//         //console.log(points[i]);
//     }
//     return points;
// }



        // if (i < arr.length - 1) {
        //     context.moveTo(arr[i].x, arr[i].y);
        //     context.lineTo(arr[i + 1].x, arr[i + 1].y)
        //     context.stroke();
        // } else {
        //     context.moveTo(arr[i].x, arr[i].y);
        //     context.lineTo(arr[0].x, arr[0].y)
        //     context.stroke();
        // }




//(angle, radius, degrees)
// function getPoints(n, r) {

//     let points = [];
//     for (let i = 0; i < n; i++) {
//         let xPos = r * Math.sin(pi * 2 * i / n);
//         let yPos = r * Math.cos(pi * 2 * i / n);

//         // Invert the y to start at top of circle
//         let num = {
//             'x': xPos,
//             'y': -yPos
//         };
//         points.push(num);
//     }

//     return points;
// }