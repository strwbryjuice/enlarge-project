var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('myCanvas');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};
var draw = true;
var erase = false;

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    ctx.lineWidth = 10; // you can adjust the size of the eraser here
    if(draw){
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = '#00CC99';
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
    if(erase){
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
};

document.getElementById('drawBtn').addEventListener('click', function() {
    draw = true;
    erase = false;
}, false);

document.getElementById('eraseBtn').addEventListener('click', function() {
    erase = true;
    draw = false;
}, false);

document.getElementById('clearBtn').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);

document.getElementById('saveBtn').addEventListener('click', function() {
    var dataUrl = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'drawing.png';
    a.click();
}, false);