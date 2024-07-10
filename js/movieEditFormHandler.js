const API_SERVER = 'https://codo-a-codo-js-api.vercel.app';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    if (!movieId) {
        console.error('movieId parameter not found in the URL');
        return;
    }

    // Fetch movie data
    try {
        const response = await fetch(`${API_SERVER}/movies/${movieId}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (response.ok) {
            const movieData = await response.json();
            console.log('Pelicula a modificar:', movieData);
            populateFormFields(movieData);
        } else {
            console.error('Error fetching movie data:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }


// Function to populate form fields with movie data
    function populateFormFields(movieData) {
        document.getElementById('title').value = movieData.title;
        document.getElementById('overview').value = movieData.overview ?? "";
        document.getElementById('year').value = movieData.year ?? "";
        document.getElementById('budget').value = movieData.budget ?? "";
        document.getElementById('revenue').value = movieData.revenue ?? "";
        document.getElementById('duration').value = movieData.duration ?? "";
        document.getElementById('rate').value = movieData.rate ?? "";
        document.getElementById('status').value = movieData.status ?? "";
        document.getElementById('poster').value = movieData.poster ?? "";
        document.getElementById('trailer').value = movieData.trailer ?? "";
        document.getElementById('genres').value = movieData.genres ?? "";
        document.getElementById('directors').value = movieData.directors ?? "";
        document.getElementById('actors').value = movieData.actors ?? "";
    }

// Submit form handler (sends PATCH request)
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Obtener los valores del formulario
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const status = document.getElementById("status").value;
        const budget = document.getElementById("budget").value;
        const revenue = document.getElementById("revenue").value;
        const overview = document.getElementById("overview").value;
        const duration = document.getElementById("duration").value;
        const rate = document.getElementById("rate").value;
        const poster = document.getElementById("poster").value;
        const trailer = document.getElementById("trailer").value;
        const genres = document.getElementById("genres").value;
        const directors = document.getElementById("directors").value;
        const actors = document.getElementById("actors").value;

        if (!title || !overview || !duration || !rate || !poster || !genres || !directors || !actors) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const movieData = {
            title: title,
            status: status,
            budget: parseInt(budget),
            revenue: parseInt(revenue),
            year: parseInt(year),
            overview: overview,
            duration: parseInt(duration),
            rate: parseInt(rate),
            poster: poster,
            trailer: trailer,
            genres: genres.split(",").map(genre => genre.trim()),
            directors: directors.split(",").map(director => director.trim()),
            actors: actors.split(",").map(actor => actor.trim()),
        };

        console.log("Información de la Película a ser enviada:", movieData);

        try {
            const response = await fetch(`${API_SERVER}/movies/${movieId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData),
            });

            if (response.ok) {
                alert("Película modificada exitosamente!");
                console.log("Respuesta:", response);
                console.log("Película Cargada:", response.json());
            } else {
                alert("Error al cargar la película. Inténtalo nuevamente.");
                console.error("Error:", await response.json());
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Ocurrió un error inesperado. Inténtalo nuevamente más tarde.");
        }
    });

});
