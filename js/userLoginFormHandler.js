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
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            if (response.ok) {
                alert("Inicio de sesión exitoso!");
                window.location.href = "../index.html";
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