document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("https://codo-a-codo-js-api.vercel.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            if (response.ok) {
                alert("Inicio de sesión exitoso!");
                console.log("Respuesta: ", response);
                console.log("Usuario Logeado: ", response.json());
            } else {
                const errorData = await response.json();
                alert("Error en el inicio de sesión: " + errorData.message || "Inténtalo nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Ocurrió un error inesperado. Inténtalo nuevamente más tarde.");
        }
    });
});
