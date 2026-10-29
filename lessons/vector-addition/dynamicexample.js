var width = window.innerWidth;
var height = window.innerHeight;
var scale = 3;
var aug = 40 * 5;
var add = aug + 40 * 8;

var stage = new Konva.Stage({
    container: 'container',
    width: document.getElementById('container').offsetWidth,
    height: height / 1.5
});
var layer = new Konva.Layer();

var vectorGroup = new Konva.Group({
    x: stage.getWidth() / scale - 100,
    y: stage.getHeight() / scale,
});  

var textGroup = new Konva.Group({});    

function vectorText(vectext, xpos, ypos, color, opac) { 
    var that = new Konva.Text({
        x: xpos,
        y: ypos,
        text: vectext,
        fontStyle: 'bold',
        fontSize: 30,
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
        pointerLength: 20,
        pointerWidth: 20,
        fill: color,
        stroke: color,
        opacity: opac,
        strokeWidth: 4
    });    
    return that; 
}  

var augendText = vectorText(aug / 40, stage.getWidth() / scale + aug / 2 - 120, stage.getHeight() / scale + 20, 'green', 0);  
var addendText = vectorText(add / 40, stage.getWidth() / scale + aug / 2 - 120 + add / 2, stage.getHeight() / scale + 20, 'blue', 0);  
var sumText = vectorText(add / 40 + aug / 40, stage.getWidth() / scale + add / 2 - 120, stage.getHeight() / scale - 100, 'red', 0);   

var augend = vector(0, 0, 0, 0, aug, 'green', 0);
var addend = vector(0, 0, 0, aug, add, 'blue', 0);  
var sum = vector(-50, 0, 0, 0, add, 'red', 0);  

vectorGroup.add(augend);
vectorGroup.add(addend);
vectorGroup.add(sum);

layer.add(augendText);  
layer.add(addendText);
layer.add(sumText);
layer.add(vectorGroup);  
layer.add(textGroup);

stage.add(layer);

document.getElementById('Reset').addEventListener('click', function() {
    augendText.opacity(0);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(0);
    addend.opacity(0);
    sum.opacity(0);
    layer.draw();
}, true);     

document.getElementById('Step 1').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(1);
    addend.opacity(0);
    sum.opacity(0);
    layer.draw();
}, true);  

document.getElementById('Step 2').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(1);
    sumText.opacity(0);
    augend.opacity(1);
    addend.opacity(1);
    sum.opacity(0);
    layer.draw();
}, true);    

document.getElementById('Step 3').addEventListener('click', function() {
    augendText.opacity(1);
    addendText.opacity(1);
    sumText.opacity(1);
    augend.opacity(1);
    addend.opacity(1);
    sum.opacity(1);
    layer.draw();
}, true);   

document.getElementById('New Example').addEventListener('click', function() {
    augendText.opacity(0);
    addendText.opacity(0);
    sumText.opacity(0);
    augend.opacity(0);
    addend.opacity(0);
    sum.opacity(0);
    
    var aug = 40 * Math.floor((Math.random() * 10) + 1);
    var add = aug + 40 * Math.floor((Math.random() * 10) + 1);
    
    augend.points([0, 0, aug, 0]);
    addend.points([aug, 0, add, 0]);
    sum.points([0, -50, add, -50]);
    
    augendText.text(aug / 40);
    augendText.x(stage.getWidth() / scale + aug / 2 - 120);
    augendText.y(stage.getHeight() / scale + 20);
    
    addendText.text(add / 40);
    addendText.x(stage.getWidth() / scale + aug / 2 - 120 + add / 2);
    addendText.y(stage.getHeight() / scale + 20);
    
    sumText.text(aug / 40 + add / 40);
    sumText.x(stage.getWidth() / scale + add / 2 - 120);
    sumText.y(stage.getHeight() / scale - 100);
    
    layer.draw();
}, true);
