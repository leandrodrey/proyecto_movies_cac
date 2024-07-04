document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("https://codo-a-codo-js-api.vercel.app/auth", {
            credentials: 'include'
        });

        if (response.ok) {
            const userData = await response.json();

            // Actualizar el menú para mostrar el nombre de usuario
            const iniciarSesionItem = document.querySelector(".iniciarSesion");
            iniciarSesionItem.textContent = userData.name;
            iniciarSesionItem.href = "#";

            const registrarseItem = document.querySelector(".registrarse");
            registrarseItem.style.display = "none";

            // Agregar funcionalidad de cierre de sesión
            iniciarSesionItem.addEventListener("click", async () => {
                try {
                    const logoutResponse = await fetch("https://codo-a-codo-js-api.vercel.app/auth/logout", {
                        method: "POST",
                        credentials: 'include'
                    });

                    if (logoutResponse.ok) {
                        window.location.href = "/index.html";
                    } else {
                        console.error("Error al cerrar sesión:", logoutResponse.status);
                    }
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                }
            });
        } else {
            console.error("Error al obtener datos de autenticación:", response.status);
        }
    } catch (error) {
        console.error("Error al comprobar la autenticación:", error);
    }
});
