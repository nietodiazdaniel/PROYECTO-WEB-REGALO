document.addEventListener("DOMContentLoaded", function() {

    // --- ¡¡SEGURIDAD!! ---
    if (sessionStorage.getItem("fase3Completada") !== "true") {
        window.location.href = "fase1.html"; // ¡A la calle!
        return; 
    }

    // --- REFERENCIAS ---
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");
    const briefing = document.getElementById("fase-4-briefing");

    // --- LÓGICA DE ANIMACIÓN "MATRIX RAIN" ---

    // 1. Configurar el Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1; 
    }

    function draw() {
        ctx.fillStyle = "rgba(13, 13, 13, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00FF00"; 
        ctx.font = fontSize + "px 'Share Tech Mono', monospace";
        
        for(let i = 0; i < drops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++; 
        }
    }

    // Inicia la animación de la lluvia
    const matrixInterval = setInterval(draw, 33);

    // --- ¡¡AQUÍ ESTÁ LA TRANSICIÓN!! ---
    
    // 1. Después de 5 segundos...
    setTimeout(() => {
        // ...para de dibujar nuevos números
        clearInterval(matrixInterval); 
        
        // ...le dice al CSS que empiece a DESVANECER la lluvia
        canvas.style.opacity = 0; 
        
        // ...le dice al HTML que MUESTRE el briefing (aún invisible)
        briefing.classList.remove("d-none");
        
        // ...le dice al CSS que active la animación "fadeIn" (aparecer)
        briefing.classList.add("activa"); 
        
    }, 5000); // 5 segundos de lluvia

    // 2. Después de 6.5 segundos (5s + 1.5s de desvanecimiento)...
    setTimeout(() => {
        // ...elimina el canvas por completo (para poder hacer clic)
        canvas.style.display = "none"; 
        
    }, 6500); // 5000 + 1500 (duración de la transición del canvas)
});