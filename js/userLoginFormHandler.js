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
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const userData = await response.json();
                alert("Inicio de sesión exitoso!");
                console.log("Respuesta: ", response);
                console.log("Usuario Logeado: ", userData);

                const loginForm = document.querySelector(".loginForm");
                loginForm.style.display = "none";
                const loggedSection = document.querySelector(".logged");
                loggedSection.appendChild(document.createTextNode("Bienvenido " + userData.user.name + "!!!"));
                loggedSection.appendChild(document.createElement("br"));
                loggedSection.appendChild(document.createElement("br"));
                // Create the "Crear Película" button
                const createButton = document.createElement('button');
                createButton.textContent = 'Crear Película';
                createButton.classList.add('boton');
                createButton.addEventListener('click', () => {
                    window.location.href = './crearpelicula.html';
                });


                const editButton = document.createElement('button');
                editButton.textContent = 'Listado de Películas';
                editButton.classList.add('boton');
                editButton.addEventListener('click', () => {
                    window.location.href = './listadodepeliculas.html';
                });

                loggedSection.appendChild(createButton);
                loggedSection.appendChild(editButton);
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
