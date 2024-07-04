document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('https://codo-a-codo-js-api.vercel.app/auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            console.log("Usuario autenticado:", userData);
        } else if (response.status === 401) {
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = './iniciosesion.html';
        } else {
            console.error("Error inesperado al verificar la autenticación:", response.status);
        }
    } catch (error) {
        console.error("Error al verificar la autenticación:", error);
    }
});
