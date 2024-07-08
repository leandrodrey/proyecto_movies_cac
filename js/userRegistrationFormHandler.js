document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const pais = document.getElementById("pais").value;
        const terminos = document.getElementById("terminos").checked;

        // Validación básica (puedes agregar más validaciones)
        if (!nombre || !apellido || !email || !password || !fechaNacimiento || !pais || !terminos) {
            alert("Por favor, completa todos los campos y acepta los términos y condiciones.");
            return;
        }

        // Construir el objeto de datos para enviar
        const userData = {
            name: nombre,
            lastname: apellido,
            email: email,
            password: password,
            birthdate: fechaNacimiento,
            country: pais,
        };

        console.log("Información del Usuario a ser enviada en el form: ", userData);

        try {
            const response = await fetch("https://codo-a-codo-js-api.vercel.app/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Registro exitoso!");
                console.log("Respuesta: ", response);
                console.log("Usuario Creado: ", response.json());
            } else {
                alert("Error en el registro: Inténtalo nuevamente.");
                console.log("Error: ", response.json());
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Ocurrió un error inesperado. Inténtalo nuevamente más tarde.");
        }
    });
});
