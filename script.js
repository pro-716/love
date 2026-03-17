const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');
const history = document.getElementById('history');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let words = "I LOVE YOU "; // النص الذي تريد تكراره
let isRunning = false;

// وظائف الـ Terminal
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
        }
        startSequence();
    }
});

function startSequence() {
    typeLog("جارِ تحليل الكلمة...");
    typeLog("جارِ حساب مصفوفة الأحرف...");
    setTimeout(() => {
        terminal.style.display = 'none'; // إخفاء شاشة الإدخال
        canvas.style.display = 'block'; // إظهار القلب
        document.querySelector('.footer').style.color = '#333'; // إظهار الفوتر بلون خافت
        startDrawingLoop();
    }, 1200);
}

// === منطق الرسم الجديد تماماً لملء القلب بالنصوص ===

let textOffset = 0; // لتحريك النص

function startDrawingLoop() {
    isRunning = true;
    requestAnimationFrame(renderFilledHeart);
}

function renderFilledHeart() {
    if (!isRunning) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // تنظيف الشاشة بخلفية سوداء
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // إعدادات النص (صغير ومتقارب جداً)
    const fontSize = 10;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.fillStyle = '#ff2d55'; // اللون الأحمر
    ctx.shadowBlur = 0; // نلغي التوهج القوي لكي تظهر الحروف واضحة ومكدسة

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 40; // مقياس التكبير

    // استراتيجية "الملء" الجديدة:
    // سنقوم بمسح مساحة الشاشة شبكة (Grid) نقطة بنقطة،
    // وإذا كانت النقطة تقع "داخل" معادلة القلب، سنرسم حرفاً فيها.

    let index = textOffset; // لكي يبدأ النص من مكان متحرك

    for (let y = height; y > 0; y -= fontSize) { // نتحرك صفاً صفاً من الأعلى للأسفل
        for (let x = 0; x < width; x += fontSize * 0.6) { // نتحرك عموداً عموداً من اليسار لليمين

            // تحويل إحداثيات الشاشة (x, y) إلى إحداثيات رياضية (tx, ty) ممركزة
            const tx = (x - centerX) / scale;
            const ty = (centerY - y) / scale;

            // معادلة القلب الشهيرة (إذا كان الناتج <= 0، فالنقطة داخل القلب)
            // (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
            const heartEquation = Math.pow(Math.pow(tx, 2) + Math.pow(ty, 2) - 1, 3) - Math.pow(tx, 2) * Math.pow(ty, 3);

            if (heartEquation <= 0) {
                // نحن داخل القلب، نرسم الحرف التالي من النص
                const char = words[Math.floor(index) % words.length];
                ctx.fillText(char, x, y);
                index++; // ننتقل للحرف التالي في الجملة
            }
        }
        // index += 5; // اختياري: إضافة إزاحة بين الصفوف لجعلها تبدو أكثر فوضوية
    }

    // إضافة حركة بسيطة للنص
    textOffset += 0.1;

    requestAnimationFrame(renderFilledHeart);
}

window.addEventListener('resize', () => {
    // إعادة ضبط الحجم عند تغيير حجم الشاشة
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
