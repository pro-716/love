const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let words = "I LOVE YOU ";
let isRunning = false;
let currentScale = 0; // يبدأ من الصفر للنمو التدريجي
let targetScale = 0;

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val !== "") words = val.toUpperCase() + " ";
        terminal.style.display = 'none';
        canvas.style.display = 'block';
        startSequence();
    }
});

function startSequence() {
    isRunning = true;
    // ضبط الحجم النهائي بناءً على شاشة الآيباد
    targetScale = Math.min(window.innerWidth, window.innerHeight) / 22; 
    requestAnimationFrame(render);
}

function render() {
    if (!isRunning) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    const fontSize = 11; // حجم الخط ليكون واضحاً مثل التيك توك
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.fillStyle = '#ff2d55';

    // زيادة المقياس تدريجياً ليظهر تأثير "النمو"
    if (currentScale < targetScale) {
        currentScale += 0.3; // سرعة النمو
    }

    const centerX = width / 2;
    const centerY = height / 2;

    let charIndex = 0;

    // مسح الشاشة لرسم القلب الممتلئ
    for (let y = height; y > 0; y -= fontSize) {
        for (let x = 0; x < width; x += fontSize * 0.6) {
            
            // تحويل الإحداثيات بالنسبة للمركز والمقياس الحالي
            const tx = (x - centerX) / currentScale;
            const ty = (centerY - y) / currentScale;

            // معادلة شكل القلب
            const res = Math.pow(tx*tx + ty*ty - 1, 3) - tx*tx * ty*ty*ty;

            if (res <= 0) {
                const char = words[charIndex % words.length];
                ctx.fillText(char, x, y);
                charIndex++;
            }
        }
    }

    requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
    targetScale = Math.min(window.innerWidth, window.innerHeight) / 22;
});
