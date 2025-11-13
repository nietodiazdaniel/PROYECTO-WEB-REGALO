document.addEventListener("DOMContentLoaded", function() {

    // --- ¡¡SEGURIDAD!! ---
    // Comprueba si el jugador ha pasado la Fase 2
    if (sessionStorage.getItem("fase2Completada") !== "true") {
        window.location.href = "fase1.html"; // ¡A la calle!
        return; 
    }

    // --- REFERENCIAS A ELEMENTOS ---
    const scanner = document.getElementById("scanner");
    const safeZone = document.getElementById("safe-zone");
    const btnInfiltrar = document.getElementById("btn-infiltrar");
    const resultadoMsg = document.getElementById("resultado-msg");
    const tituloFase = document.getElementById("fase3-titulo"); // ¡Nuevo!

    // --- ESTADO DEL JUEGO (¡NUEVO!) ---
    let nivelActual = 1;
    const niveles = [
        // Nivel 1 (índice 0)
        { 
            velocidad: "4s",  // Lento (4 segundos por ciclo)
            posicion: "20%" // Zona segura a la izquierda
        },
        // Nivel 2 (índice 1)
        { 
            velocidad: "2.5s", // Rápido
            posicion: "75%" // Zona segura a la derecha
        },
        // Nivel 3 (índice 2)
        { 
            velocidad: "1.5s", // ¡Muy rápido!
            posicion: "50%" // Zona segura en el centro
        }
    ];

    // --- LÓGICA DEL JUEGO ---
    btnInfiltrar.addEventListener("click", function() {
        // 1. Pausa la animación del escáner
        scanner.classList.add("parado");
        
        // 2. Coge la posición actual del escáner
        const scannerRect = scanner.getBoundingClientRect();
        
        // 3. Coge la posición de la zona segura
        const safeZoneRect = safeZone.getBoundingClientRect();

        // 4. Comprueba si el escáner está DENTRO de la zona segura
        if (scannerRect.left >= safeZoneRect.left && scannerRect.right <= safeZoneRect.right) {
            // ¡ÉXITO!
            nivelActual++; // Sube de nivel
            
            if (nivelActual > 3) {
                // --- ¡VICTORIA TOTAL! ---
                tituloFase.innerText = "BYPASS DEL FIREWALL (3/3)";
                resultadoMsg.innerText = "¡FIREWALL ANULADO! Accediendo al briefing...";
                resultadoMsg.className = "alert alert-success mt-4";
                btnInfiltrar.disabled = true; // Desactiva el botón
                
                setTimeout(() => {
                    sessionStorage.setItem("fase3Completada", "true");
                    window.location.href = "fase4.html"; // Redirige a la recompensa
                }, 2000);

            } else {
                // --- ¡ÉXITO DE NIVEL! ---
                resultadoMsg.innerText = `¡NIVEL ${nivelActual-1} SUPERADO! Preparando siguiente nivel...`;
                resultadoMsg.className = "alert alert-success mt-4";
                
                // Pasa al siguiente nivel después de 1 segundo
                setTimeout(iniciarNivel, 1000); 
            }

        } else {
            // ¡FALLO!
            resultadoMsg.innerText = "¡INTRUSIÓN DETECTADA! Reiniciando escáner...";
            resultadoMsg.className = "alert alert-danger mt-4";
            
            // Espera 1 segundo y vuelve a activar la animación (sin cambiar de nivel)
            setTimeout(() => {
                scanner.classList.remove("parado");
                resultadoMsg.classList.add("d-none"); // Oculta el error
            }, 1000);
        }
    });

    // --- Función para configurar cada nivel ---
    function iniciarNivel() {
        // Coge los datos del nivel actual (el array empieza en 0)
        let config = niveles[nivelActual - 1];
        
        // 1. Actualiza el título
        tituloFase.innerText = `BYPASS DEL FIREWALL (NIVEL ${nivelActual}/3)`;

        // 2. Mueve la zona segura (con la transición del CSS)
        safeZone.style.left = config.posicion;
        
        // 3. Oculta el mensaje y activa el botón
        resultadoMsg.classList.add("d-none");
        btnInfiltrar.disabled = false;
        
        // 4. (Re)inicia la animación del escáner con la nueva velocidad
        scanner.classList.remove("parado");
        scanner.style.animation = `scan-anim ${config.velocidad} ease-in-out infinite alternate`;
    }

    // --- Inicia el Nivel 1 al cargar la página ---
    iniciarNivel();
});