function resetVisuals() {
    augendText.opacity(0);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(0);
    addend.opacity(0);
    sum.opacity(0);
}

document.getElementById('Reset').addEventListener('click', function() {
    resetVisuals();
    layer.draw();
}, true);

document.getElementById('New Example').addEventListener('click', function() {
    // Hide all vector arrows and text labels so the canvas starts completely blank
    resetVisuals();
    
    // Generate new random values
    currentAugVal = Math.floor((Math.random() * 8) + 1);
    currentAddVal = Math.floor((Math.random() * 8) + 1);
    
    // Recalculate layout and redraw canvas
    updateLayout();
}, true);
