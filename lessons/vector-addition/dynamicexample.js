var scale = 3;

var containerEl = document.getElementById('container');

var stage = new Konva.Stage({
    container: 'container',
    width: containerEl.offsetWidth || 600,
    height: 320
});

var layer = new Konva.Layer();

var vectorGroup = new Konva.Group({
    x: stage.getWidth() / scale - 50,
    y: stage.getHeight() / 2,
});  

var textGroup = new Konva.Group({});    

function vectorText(vectext, xpos, ypos, color, opac) { 
    var that = new Konva.Text({
        x: xpos,
        y: ypos,
        text: vectext,
        fontStyle: 'bold',
        fontSize: 24,
        fontFamily: 'Calibri',
        opacity: opac,
        fill: color
    });    
    return that; 
}    

function vector(vert, xpos, ypos, start, end, color, opac) { 
    var that = new Konva.Arrow({
        x: xpos,
        y: ypos,
        points: [start, vert, end, vert],
        pointerLength: 15,
        pointerWidth: 15,
        fill: color,
        stroke: color,
        opacity: opac,
        strokeWidth: 4
    });    
    return that; 
}  

var currentAugVal = 5;
var currentAddVal = 8;

var aug = 25 * currentAugVal;
var add = aug + 25 * currentAddVal;

var augendText = vectorText(currentAugVal, stage.getWidth() / scale + aug / 2 - 50, stage.getHeight() / 2 + 20, 'green', 0);  
var addendText = vectorText(currentAddVal, stage.getWidth() / scale + aug + (add - aug) / 2 - 50, stage.getHeight() / 2 + 20, 'blue', 0);  
var sumText = vectorText(currentAugVal + currentAddVal, stage.getWidth() / scale + add / 2 - 50, stage.getHeight() / 2 - 70, 'red', 0);   

var augend = vector(0, 0, 0, 0, aug, 'green', 0);
var addend = vector(0, 0, 0, aug, add, 'blue', 0);  
var sum = vector(-40, 0, 0, 0, add, 'red', 0);  

vectorGroup.add(augend);
vectorGroup.add(addend);
vectorGroup.add(sum);

layer.add(augendText);  
layer.add(addendText);  
layer.add(sumText);
layer.add(vectorGroup);  
layer.add(textGroup);

stage.add(layer);

function resetVisuals() {
    augendText.opacity(0);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(0);
    addend.opacity(0);
    sum.opacity(0);
}

function updateLayout() {
    var containerWidth = containerEl.offsetWidth;
    var containerHeight = 320;

    if (containerWidth <= 0) return;

    stage.width(containerWidth);
    stage.height(containerHeight);

    var maxUnits = Math.max(currentAugVal + currentAddVal, 10);
    var availableWidth = containerWidth * 0.75;
    var unitPx = Math.min(availableWidth / maxUnits, 25);

    aug = unitPx * currentAugVal;
    add = aug + unitPx * currentAddVal;

    var startX = Math.max((containerWidth - add) / 2, 20);
    var centerY = containerHeight / 2;

    vectorGroup.x(startX);
    vectorGroup.y(centerY);

    augend.points([0, 0, aug, 0]);
    addend.points([aug, 0, add, 0]);
    sum.points([0, -40, add, -40]);

    augendText.text(currentAugVal);
    augendText.x(startX + aug / 2 - 8);
    augendText.y(centerY + 15);

    addendText.text(currentAddVal);
    addendText.x(startX + aug + (add - aug) / 2 - 8);
    addendText.y(centerY + 15);

    sumText.text(currentAugVal + currentAddVal);
    sumText.x(startX + add / 2 - 8);
    sumText.y(centerY - 75);

    layer.draw();
}

window.addEventListener('resize', updateLayout);
updateLayout();

document.getElementById('reset-btn').addEventListener('click', function() {
    resetVisuals();
    layer.draw();
});     

document.getElementById('step1-btn').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(1);
    addend.opacity(0);
    sum.opacity(0);
    layer.draw();
});  

document.getElementById('step2-btn').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(1);
    sumText.opacity(0);
    augend.opacity(1);
    addend.opacity(1);
    sum.opacity(0);
    layer.draw();
});    

document.getElementById('step3-btn').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(1);
    sumText.opacity(1);
    augend.opacity(1);
    addend.opacity(1);
    sum.opacity(1);
    layer.draw();
});   

document.getElementById('new-example-btn').addEventListener('click', function() {
    resetVisuals();
    
    currentAugVal = Math.floor((Math.random() * 8) + 1);
    currentAddVal = Math.floor((Math.random() * 8) + 1);
    
    updateLayout();
});
