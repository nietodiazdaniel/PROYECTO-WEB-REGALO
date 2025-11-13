document.addEventListener("DOMContentLoaded", function() {
    const btnFase1 = document.getElementById("btn-fase-1");
    const inputPass = document.getElementById("input-pass");
    const loginError = document.getElementById("login-error");

    btnFase1.addEventListener("click", function() {
        // ¡¡CAMBIA ESTA CONTRASEÑA!!
        const passCorrecta = "25112004"; 
        
        if (inputPass.value.toLowerCase() === passCorrecta) {
            // ¡ÉXITO! Guarda el "permiso"
            sessionStorage.setItem("fase1Completada", "true");
            // Y redirige a la siguiente fase
            window.location.href = "fase2.html"; 
        } else {
            loginError.classList.remove("d-none");
            inputPass.value = ""; 
        }
    });
});