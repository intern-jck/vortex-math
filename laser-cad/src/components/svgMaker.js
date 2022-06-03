export function makeRect(xPos, yPos, width, height) {
  let svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  svgRect.setAttribute('x', xPos);
  svgRect.setAttribute('y', yPos);
  svgRect.setAttribute('width', width);
  svgRect.setAttribute('height', height);

  svgRect.setAttribute('fill', 'blue');
  svgRect.setAttribute('stroke', 'black');

  svgRect.classList.add('draggable');

  return svgRect;
}