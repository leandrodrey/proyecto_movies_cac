document.addEventListener('DOMContentLoaded', async () => {
    const API_SERVER = 'http://localhost:3000';
    const options = {
        method: 'GET', // Método de la petición (GET)
        headers: {
            accept: 'application/json', // Tipo de respuesta esperada (JSON)
        }
    };

    // Extraer el movieId de la URL (parámetros de búsqueda)
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    if (!movieId) {
        console.error("Error: No se proporcionó un movieId válido.");
        return;
    }

    try {
        // Realizar la solicitud fetch a la API
        const response = await fetch(`${API_SERVER}/movies/${movieId}`, options);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const movieData = await response.json();

        // Formatear la duración de la película en horas y minutos
        const hours = Math.floor(movieData.duration / 60);
        const minutes = movieData.duration % 60;
        const formattedDuration = `${hours}h ${minutes}m`;

        const currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });

        const detalleSection = document.querySelector('.detalle');
        detalleSection.style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url('${movieData.poster}')`;

        // Actualización del HTML con los datos de la película
        document.querySelector('.imgDetalle img').src = movieData.poster;
        document.querySelector('.movieTitle').textContent = movieData.title;
        document.querySelector('.movieYear').textContent = movieData.year;
        document.querySelector('.movieGenres').textContent = movieData.genres;
        document.querySelector('.movieDuration').textContent = formattedDuration;
        document.querySelector('.movieDescription').textContent = movieData.overview;
        document.querySelector('.movieStatus').textContent = movieData.status;
        document.querySelector('.movieLanguage').textContent = movieData.original_language ?? 'English';
        document.querySelector('.movieBudget').textContent = currencyFormatter.format(movieData.budget);
        document.querySelector('.movieRevenue').textContent = currencyFormatter.format(movieData.revenue);

        // Actualización del iframe del trailer
        const iframe = document.querySelector('.movieTrailer');
        if (movieData.trailer) {
            const videoId = movieData.trailer.split('v=')[1];
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            iframe.style.display = 'none';
        }

        // Actualizar los directores (asumiendo que puede haber más de uno)
        const directorContainer = document.querySelector('.contenedorCreditos');
        directorContainer.innerHTML = '';

        // Dividir el string de directores en un array
        const directorsArray = movieData.directors ? movieData.directors.split(',') : [];

        directorsArray.forEach(directorName => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${directorName}</h3><p>Director</p>`;
            directorContainer.appendChild(div);
        });

    } catch (error) {
        console.error("Error al obtener los datos de la película:", error);
    }
});
