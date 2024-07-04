document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://codo-a-codo-js-api.vercel.app/auth', {
            credentials: 'include'
        });
        if (!response.ok) {
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = './iniciosesion.html';
        }
    } catch (error) {
        console.error("Error al verificar la autenticación:", error);
    }
});
