let canvas;
let ctx;
let boardHeight = 10;
let boardWidth = 8;



document.addEventListener('DOMContentLoaded', SetupCanvas);


function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(200, 25, 400, 700);
}