const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height, scale;
const textPattern = "I LOVE YOU ";
let offset = 0;

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    scale = Math.min(width, height) / 35;
}

window.addEventListener('resize', init);
init();

function draw() {
    ctx.fillStyle = 'rgba(8, 8, 8, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `bold ${scale/2}px monospace`;
    ctx.fillStyle = '#ff2d55';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff2d55';

    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const pulse = 1 + 0.1 * Math.sin(Date.now() * 0.005);
        const posX = x * scale * pulse + width / 2;
        const posY = y * scale * pulse + height / 2;
        const char = textPattern[(Math.floor(t * 10) + offset) % textPattern.length];
        ctx.fillText(char, posX, posY);
    }
    offset++;
    requestAnimationFrame(draw);
}
draw();
