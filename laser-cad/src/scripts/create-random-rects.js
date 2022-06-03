
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function drawRect() {
    let filterGroup = document.getElementById('filter-group');
    for (let i = 0; i < 20; i++) {
        let x = getRandomInt(450);
        let y = getRandomInt(250);
        let rect = buildRect(x, y, 50, 50);
        filterGroup.appendChild(rect);
    }
}


function buildRect(xPos, yPos, width, height) {
    let svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgRect.setAttribute('x', xPos);
    svgRect.setAttribute('y', yPos);
    svgRect.setAttribute('width', width);
    svgRect.setAttribute('height', height);

    svgRect.setAttribute('fill', 'blue');
    svgRect.setAttribute('fill-opacity', '.25');
    svgRect.setAttribute('stroke', 'black');

    svgRect.classList.add('draggable');

    return svgRect;
}
