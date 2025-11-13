document.addEventListener("DOMContentLoaded", function() {
    // --- ¡¡SEGURIDAD!! ---
    if (sessionStorage.getItem("fase1Completada") !== "true") {
        window.location.href = "fase1.html"; // ¡A la calle!
        return; 
    }
    // (El resto del código v6 del slot machine que te di antes va aquí...)
    // ...
    // ...
    // (Asegúrate de que en comprobarResultado() ponga:)
    // if (exito) {
    //     ...
    //     setTimeout(() => {
    //         sessionStorage.setItem("fase2Completada", "true"); // ¡Guarda el permiso!
    //         window.location.href = "fase3.html"; // ¡VICTORIA!
    //     }, 2000);
    // ...
    // (Voy a pegar el código v6 completo por si acaso)

    const btnParar = document.getElementById("btn-parar");
    const cilindrosDivs = [
        document.querySelector("#cilindro1 .numeros"),
        document.querySelector("#cilindro2 .numeros"),
        document.querySelector("#cilindro3 .numeros"),
        document.querySelector("#cilindro4 .numeros"),
        document.querySelector("#cilindro5 .numeros")
    ];
    const cilindrosContenedores = document.querySelectorAll(".cilindro");
    const resultadoMsg = document.getElementById("resultado-msg");

    let cilindroActual = 0;
    const codigoSecretoJuego = [7, 3, 9, 1, 5]; // ¡Pon tu código aquí!
    let resultadoFinal = [0, 0, 0, 0, 0];
    let intervalos = [];
    let juegoTerminado = false;

    btnParar.addEventListener("click", function() {
        if (juegoTerminado) {
            iniciarJuego();
            return;
        }
        pararCilindroActual();
    });

    function iniciarJuego() {
        cilindroActual = 0;
        resultadoFinal = [0, 0, 0, 0, 0];
        juegoTerminado = false;
        
        btnParar.innerText = "PARAR CILINDRO 1";
        btnParar.disabled = false;
        resultadoMsg.classList.add("d-none");
        
        intervalos.forEach(clearInterval);
        intervalos = [];
        cilindrosContenedores.forEach(c => c.classList.remove("border-success", "border-danger"));

        cilindrosDivs.forEach((cilindro, index) => {
            cilindro.dataset.numeroActual = Math.floor(Math.random() * 10);
            let velocidad = 700 + (index * 10); 
            
            intervalos[index] = setInterval(() => {
                let num = parseInt(cilindro.dataset.numeroActual) + 1;
                if (num > 9) { num = 0; }
                cilindro.dataset.numeroActual = num;
                const alturaNumero = cilindro.clientHeight / 20; 
                const posicionFinal = -(alturaNumero * (num + 10));
                cilindro.style.transform = `translateY(${posicionFinal}px)`;
            }, velocidad);
        });
    }

    function pararCilindroActual() {
        clearInterval(intervalos[cilindroActual]);
        let numeroSeleccionado = parseInt(cilindrosDivs[cilindroActual].dataset.numeroActual);
        resultadoFinal[cilindroActual] = numeroSeleccionado;
        cilindroActual++;

        if (cilindroActual >= 5) {
            btnParar.innerText = "COMPROBANDO...";
            btnParar.disabled = true;
            comprobarResultado();
        } else {
            btnParar.innerText = `PARAR CILINDRO ${cilindroActual + 1}`;
        }
    }

    function comprobarResultado() {
        let exito = true;
        for (let i = 0; i < codigoSecretoJuego.length; i++) {
            if (resultadoFinal[i] !== codigoSecretoJuego[i]) {
                exito = false;
                break;
            }
        }

        if (exito) {
            cilindrosContenedores.forEach(c => c.classList.add("border-success"));
            resultadoMsg.innerText = "ÉXITO. ACCESO CONCEDIDO.";
            resultadoMsg.className = "alert alert-success mt-4";
            
            setTimeout(() => {
                sessionStorage.setItem("fase2Completada", "true"); // ¡Guarda el permiso!
                window.location.href = "fase3.html"; // ¡VICTORIA!
            }, 2000);

        } else {
            cilindrosContenedores.forEach(c => c.classList.add("border-danger"));
            resultadoMsg.innerText = "ERROR. CÓDIGO INCORRECTO.";
            resultadoMsg.className = "alert alert-danger mt-4";
            juegoTerminado = true;
            btnParar.innerText = "REINTENTAR";
            btnParar.disabled = false;
        }
    }
    
    iniciarJuego();
});