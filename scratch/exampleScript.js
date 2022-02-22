
function mylinear(t, x1, y1, x2, y2) {
    if (t <= x1) return y1;
    if (t >= x2) return y2;
    return ((t - x2) * y1 - (t - x1) * y2) / (x1 - x2);
}
colors = ["#4363d8", "#f58231", "#3cb44b", "#e6194b", "#eed008", "#46f0f0", "#911eb4", "#f032e6", "#88ee33", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#000099", "#808080"]; // based on https://sashamaps.net/docs/resources/20-colors/

$(document).ready(draw);
function draw() {
    n = getModulus();
    m = getMultiplier();
    canvas = document.getElementById('thecanvas');
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = mylinear(n, 9, 30, 150, 8) + 'pt sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    labeling = getLabeling();
    coloring = getColoring();
    arrowheadLocation = getArrowheadLocation();
    arrowheadAngle = mylinear(n, 50, Math.PI / 2.5, 100, Math.PI / 6);
    c = canvas.width / 2; // center
    r = 0.48 * canvas.width; // radius
    if (labeling > 0) { r = (n < 30 ? mylinear(n, 7, 0.459, 30, 0.457) : mylinear(n, 30, 0.457, 150, 0.469)) * canvas.width; }

    context.beginPath();
    context.lineWidth = getLineWidth();
    context.strokeStyle = 'black'; // default, might change later
    context.lineJoin = 'round'; // to avoid spikes
    context.lineCap = 'round';

    if (coloring == 1) { // color based on length
        for (i = 0; i < n; i++) {
            if ((i * m) % n != i) {
                x1 = c + r * Math.sin(i * 2 * Math.PI / n);
                y1 = c - r * Math.cos(i * 2 * Math.PI / n);
                x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
                y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
                lengthPercentage = ((x1 - x2) ** 2 + (y1 - y2) ** 2) / (4 * r * r);
                h = Math.round((0.8 - 0.8 * lengthPercentage) * 360);
                context.beginPath();
                context.moveTo(x1, y1);
                context.strokeStyle = 'hsl(' + h + ', 100%, 50%)';
                context.lineTo(x2, y2);
                if (arrowheadLocation > 0) drawArrowhead(context, x1, y1, x2, y2, arrowheadLocation, arrowheadAngle, 0.05 * r);
                context.stroke();
            }
        }
    }
    else if (coloring >= 2) { // color loops
        loops = new Array();
        for (i = 0; i < n; i++) {
            orbit = [i];
            j = (m * i) % n;
            if (i != j) {
                while (!orbit.includes(j)) {
                    orbit.push(j);
                    j = (m * j) % n;
                }
                if (j == i && i == Math.min(...orbit)) loops.push(orbit);
            }

            console.log(j, orbit[i], loops[i])
        }
        verticesInLoops = loops.flat();
        console.log(loops)

        // color non-loop edges ...
        context.lineWidth = context.lineWidth / 1.5;
        context.beginPath();
        context.strokeStyle = '#ccc';
        for (i = 0; i < n; i++) {
            if (!verticesInLoops.includes(i) && (i * m) % n != i) {
                x1 = c + r * Math.sin(i * 2 * Math.PI / n);
                y1 = c - r * Math.cos(i * 2 * Math.PI / n);
                x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
                y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                if (arrowheadLocation > 0) drawArrowhead(context, x1, y1, x2, y2, arrowheadLocation, arrowheadAngle, 0.05 * r);
            }
        }
        context.stroke();
        // ... then loops
        context.lineWidth = context.lineWidth * 2;
        for (i = 0; i < loops.length; i++) {
            context.beginPath();
            x1 = c + r * Math.sin(loops[i][0] * 2 * Math.PI / n);
            y1 = c - r * Math.cos(loops[i][0] * 2 * Math.PI / n);
            context.moveTo(x1, y1);
            for (j = 1; j < loops[i].length; j++) // index, not vertex
            {
                x2 = c + r * Math.sin(loops[i][j] * 2 * Math.PI / n);
                y2 = c - r * Math.cos(loops[i][j] * 2 * Math.PI / n);
                context.lineTo(x2, y2);
            }
            context.closePath(); // connects loop back to (x1,y1)
            context.strokeStyle = colors[i % colors.length];
            context.stroke();
            if (arrowheadLocation > 0) {
                context.beginPath();
                for (j = 1; j < loops[i].length; j++) {
                    x2 = c + r * Math.sin(loops[i][j] * 2 * Math.PI / n);
                    y2 = c - r * Math.cos(loops[i][j] * 2 * Math.PI / n);
                    drawArrowhead(context, x1, y1, x2, y2, arrowheadLocation, arrowheadAngle, 0.05 * r);
                    x1 = x2; y1 = y2;
                }
                x2 = c + r * Math.sin(loops[i][0] * 2 * Math.PI / n);
                y2 = c - r * Math.cos(loops[i][0] * 2 * Math.PI / n);
                drawArrowhead(context, x1, y1, x2, y2, arrowheadLocation, arrowheadAngle, 0.05 * r);
                context.stroke();
            }
        }
    } else { // single color
        context.strokeStyle = 'black';
        for (i = 0; i < n; i++) {
            if ((i * m) % n != i) {
                x1 = c + r * Math.sin(i * 2 * Math.PI / n);
                y1 = c - r * Math.cos(i * 2 * Math.PI / n);
                x2 = c + r * Math.sin(m * i * 2 * Math.PI / n);
                y2 = c - r * Math.cos(m * i * 2 * Math.PI / n);
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                if (arrowheadLocation > 0) drawArrowhead(context, x1, y1, x2, y2, arrowheadLocation, arrowheadAngle, 0.05 * r);
            }
        }
        context.stroke();
    }

    if (labeling > 0) {
        context.font = mylinear(n, 9, 30, 150, 8) + 'pt sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        r = 0.48 * canvas.width;
        for (i = 1; i < (labeling == 2 || n <= 150 ? n : 0.992 * n); i++) {
            if (labeling == 2 || n <= 150 || (labeling == 1 && i % (Math.round(n / 100)) == 0)) {
                x1 = c + r * Math.sin(i * 2 * Math.PI / n);
                y1 = c - r * Math.cos(i * 2 * Math.PI / n);
                context.fillText(i, x1, y1);
            }
        }
        if (n == Math.round(n)) context.fillText(n, c, c - r); // always include
    }
}
function drawArrowhead(context, x1, y1, x2, y2, location, angle, size) {
    // location is between 0 and 1 (1 = tip at (x2,y2))
    // angle is measurement from main line to arrow line
    // size is length of arrow segments

    var a = Math.atan2(y1 - y2, x1 - x2);
    var xt, yt;

    if (location == 0.05) {
        xt = x1 - 2 * size * Math.cos(a);
        yt = y1 - 2 * size * Math.sin(a);
    } else if (location == 0.95) {
        xt = x2 + size * Math.cos(a);
        yt = y2 + size * Math.sin(a);
    } else {
        xt = (1 - location) * x1 + location * x2;
        yt = (1 - location) * y1 + location * y2;
    }

    context.moveTo(xt + size * Math.cos(a + angle / 2), yt + size * Math.sin(a + angle / 2));
    context.lineTo(xt, yt);
    context.lineTo(xt + size * Math.cos(a - angle / 2), yt + size * Math.sin(a - angle / 2));
}

function getModulus() {
    return document.getElementById('modulus-text').value;
}
function setModulus(x, adjustSlider = true) {
    if (getFractional() == 0) x = Math.round(x);
    if (adjustSlider) document.getElementById('modulus-slider').value = x;
    document.getElementById('modulus-text').value = x;
    document.getElementById('multiplier-slider').max = x;
}

function getMultiplier() {
    return document.getElementById('multiplier-text').value;
}
function setMultiplier(x, adjustSlider = true) {
    if (getFractional() == 0) x = Math.round(x);
    if (adjustSlider) document.getElementById('multiplier-slider').value = x;
    document.getElementById('multiplier-text').value = x;
}


function getMaxModulus() {
    return parseInt(document.getElementById('modulus-slider').max);
}
function setMaxModulus(x) {
    document.getElementById('modulus-slider').max = x;
    $('#max-mod-select').selectpicker('val', x);
}
function setMaxModulusWithChecks(x) {
    if (x > 1000 && getColoring() == 2) {
        if (!confirm("Coloring loops is only supported for moduli up to 1000. Would you like to turn off coloring?")) return false;
        setColoring(0);
        draw();
    }
    setMaxModulus(x);
    if (getModulus() > int(x)) { setModulus(x); draw(); } // mod cannot be larger than (new) max
}

function getLineWidth() {
    var w = document.getElementById('linewidth-select').value;
    if (w == 'auto') { // auto
        var n = getModulus();
        w = 0.15;
        if (n <= 250) w = 1.5 * mylinear(n, 30, 2, 250, 0.15);
        if (n <= 30) w = 1.5 * mylinear(n, 2, 5, 30, 2);
    }
    return w;
}
function setLineWidth(x) {
    $('#linewidth-select').selectpicker('val', x);
}

function getArrowheadLocation() {
    return document.getElementById('arrowhead-select').value; // 0 is none
}
function setArrowheadLocation(x) {
    $('#arrowhead-select').selectpicker('val', x);
}

function getLabeling() {
    return parseInt(document.getElementById('labeling-select').value);
}
function setLabeling(x) {
    $('#labeling-select').selectpicker('val', x);
}

function getColoring() {
    return parseInt(document.getElementById('coloring-select').value);
}
function setColoring(x) {
    $('#coloring-select').selectpicker('val', x);
}
function setColoringWithChecks(x) {
    if (x == 2) { // coloring by loops has some requirements
        var y = getModulus();
        var z = y > 999 ? 1000 : Math.round(y);
        if (y > 1000) {
            if (!confirm("Coloring loops is only supported for integer moduli up to 1000. Would you like to change the modulus from " + y + " to " + z + "?")) return false;
            setMaxModulus(z);
            setModulus(z);
            document.getElementById('multiplier-slider').max = z;
            setFractionalWithChecks(0);
        } else if (document.getElementById('modulus-slider').max > 1000) {
            // if only the max is too big, change it silently.
            document.getElementById('modulus-slider').max = 1000;
            setMaxModulus(1000);
            setFractionalWithChecks(0);
        }
    }
    setColoring(x);
}

function getFractional() {
    return parseInt(document.getElementById('fractional-select').value);
}
function setFractional(x) {
    $('#fractional-select').selectpicker('val', x);
}
function setFractionalWithChecks(x) {
    if (x == 0) {
        document.getElementById('modulus-slider').step = '1';
        document.getElementById('multiplier-slider').step = '1';
        setModulus(Math.round(getModulus()));
        setMultiplier(Math.round(getMultiplier()));
        setFractional(0);
    } else {
        document.getElementById('modulus-slider').step = 'any';
        document.getElementById('multiplier-slider').step = 'any';
        if (getColoring() > 1) setColoring(0); // dont' allow loop-coloring with fractional
        setFractional(1);
    }
}

function prepExample(n, m, c) {
    setMaxModulus(n > 200 ? (n > 1000 ? 10000 : 1000) : 200);
    setColoring(c);
    if (c > 1) setFractionalWithChecks(0);
    setLabeling(n > 200 ? 0 : 1);
    setArrowheadLocation(n <= 10 ? 0.05 : 0);
    setModulus(n);
    setMultiplier(m);
    setLineWidth('auto');
}
