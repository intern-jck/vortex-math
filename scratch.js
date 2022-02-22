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
        if (!confirm("Coloring loops is only supported for moduli up to 1000. Would you like to turn off coloring?")) return
        false;
        setColoring(0);
        draw();
    }
    setMaxModulus(x);
    if (getModulus() > int(x)) { setModulus(x); draw(); } // mod cannot be larger than (new) max
}