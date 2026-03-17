const input = document.getElementById('commandInput');
const terminal = document.getElementById('terminal');
const history = document.getElementById('history');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height, scale;
let words = "LOVE "; // النص الذي سيشكل القلب
let isRunning = false;

// وظيفة عرض رسائل في الـ Terminal
function typeLog(message) {
    const line = document.createElement('div');
    line.textContent = `> ${message}`;
    history.appendChild(line);
}

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val !== "") {
            words = val.toUpperCase() + " "; // القلب سيشكل الكلمة التي كتبتها
            startSequence();
        }
    }
});

function startSequence() {
    typeLog("جارِ معالجة البيانات...");
    typeLog("جارِ تحميل مصفوفة المشاعر...");
    
    setTimeout(() => {
        terminal.style.display = 'none'; // إخفاء شاشة الإدخال
        canvas.style.display = 'block'; // إظهار القلب
        initCanvas();
        isRunning = true;
        draw();
    }, 1500);
}

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    scale = Math.min(width, height) / 38;
}

let offset = 0;
function draw() {
    if (!isRunning) return;

    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `bold ${scale/2}px monospace`;
    ctx.fillStyle = '#ff2d55';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff2d55';

    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        const pulse = 1 + 0.1 * Math.sin(Date.now() * 0.005);
        const posX = x * scale * pulse + width / 2;
        const posY = y * scale * pulse + height / 2;

        const char = words[(Math.floor(t * 10) + offset) % words.length];
        ctx.fillText(char, posX, posY);
    }
    
    offset++;
    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { if(isRunning) initCanvas(); });
