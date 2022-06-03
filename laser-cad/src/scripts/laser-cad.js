const svgSource = 'http://www.w3.org/2000/svg';
const svgCanvas = document.getElementById('svg-graph');
const viewBoxDims = svgCanvas.getAttribute('viewBox').split(" ");
const viewBoxWidth = viewBoxDims[2];
const viewBoxHeight = viewBoxDims[3];


function draw() {
    // Draw grid to fill viewbox
    let gridPoints = drawGrid(viewBoxWidth, viewBoxHeight, 100, svgCanvas);
    //console.log(gridPoints);
    // Test rect
    let testRect = createRect(10, 10, 50, 50);
    // Add to canvas
    svgCanvas.appendChild(testRect);
}


function createRect(x, y, w, h) {
    let rect = document.createElementNS(svgSource, 'rect');
    rect.addEventListener('mousedown', dragEnable);
    selected.addEventListener('mousemove', drag);
    rect.addEventListener('mouseup', dragStop);
    //rect.addEventListener('mouseleave', dragStop);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('fill', 'blue');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '2pt');
    rect.classList.add('draggable');
    rect.classList.add('bounded');
    return rect;
}


let selectedSVGS = [];

function getSelected(evt) {

}

function dragEnable(evt) {
    //let svgCanvas = document.getElementById('svg-graph');
    selectedSVGS.unshift(evt.target);
    let selected = selectedSVGS[0];

    let currentPos = getMouse(evt);
    let transforms = selected.transform.baseVal;
    let xMin, xMax, yMin, yMax;

    //console.log(transforms);
    // If there are no transforms in the list
    //  or the first transform is not translate
    if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        let translate = svgCanvas.createSVGTransform();
        translate.setTranslate(0, 0);
        transforms.insertItemBefore(translate, 0);
    }

    let transform = transforms.getItem(0);
    currentPos.x -= transform.matrix.e;
    currentPos.y -= transform.matrix.f;

    if (selected.classList.contains('bounded')) {
        let boundingBox = selected.getBBox();
        xMin = 0 - boundingBox.x;
        xMax = viewBoxWidth - boundingBox.x - boundingBox.width;
        yMin = 0 - boundingBox.y;
        yMax = viewBoxHeight - boundingBox.y - boundingBox.height;
    }

}

function drag(evt) {
    //console.log(getMouse(evt));
    evt.preventDefault();
    let moveTo = getMouse(evt);
    let dx = moveTo.x - currentPos.x;
    let dy = moveTo.y - currentPos.y;

    if (selected.classList.contains('bounded')) {
        //check x position
        if (dx < xMin) { dx = xMin }
        else if (dx > xMax) { dx = xMax }
        //check y position
        if (dy < yMin) { dy = yMin }
        else if (dy > yMax) { dy = yMax }
    }

    transform.setTranslate(dx, dy);
}

function dragStop(evt) {
    selected = false;
}

function getMouse(evt) {
    // let svgCanvas = document.getElementById('svg-graph');
    var CTM = svgCanvas.getScreenCTM();
    return {
        x: parseInt((evt.clientX - CTM.e) / CTM.a),
        y: parseInt((evt.clientY - CTM.f) / CTM.d)
    };
}

//<line x1="0" y1="80" x2="100" y2="20" stroke="black" />
function drawGrid(width, height, increment, svgCanvas) {
    let gridPoints = {
        'x': [],
        'y': []
    };
    //Vertical Lines
    for (let i = 0; i <= width; i += increment) {
        let line = document.createElementNS(svgSource, 'line');
        let x1 = i.toString(10);
        line.setAttribute('x1', x1);
        line.setAttribute('y1', '0');
        line.setAttribute('x2', x1);
        line.setAttribute('y2', height);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '1pt');
        gridPoints.x.push(x1);
        svgCanvas.appendChild(line);
    }

    //Horizontal Lines
    for (let i = 0; i <= height; i += increment) {
        let line = document.createElementNS(svgSource, 'line');
        let y1 = i.toString(10);
        line.setAttribute('x1', '0');
        line.setAttribute('y1', y1);
        line.setAttribute('x2', width);
        line.setAttribute('y2', y1);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '1pt');
        gridPoints.y.push(y1);
        svgCanvas.appendChild(line);
    }

    return gridPoints;
}

