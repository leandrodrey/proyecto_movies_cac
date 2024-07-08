document.addEventListener("DOMContentLoaded", function () {
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
            title,
            status,
            budget: parseInt(budget),
            revenue:  parseInt(revenue),
            year: parseInt(year),
            overview,
            duration: parseInt(duration),
            rate: parseInt(rate),
            poster,
            trailer,
            genres: genres.split(",").map(genre => genre.trim()), // Convertir a array
            directors: directors.split(",").map(director => director.trim()), // Convertir a array
            actors: actors.split(",").map(actor => actor.trim()), // Convertir a array
        };

        console.log("Información de la película a ser enviada:", movieData);

        try {
            const response = await fetch("https://codo-a-codo-js-api.vercel.app/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData),
            });

            if (response.ok) {
                alert("Película cargada exitosamente!");
                console.log("Respuesta:", response);
                console.log("Película Cargada:", response.json());
                form.reset();
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
