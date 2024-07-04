const API_SERVER = 'https://codo-a-codo-js-api.vercel.app';
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
    }
};

// Función para cargar películas en la cuadrícula de tendencias
const cargarPeliculasTendencia = async (page = 1) => {
    // Realizamos una petición fetch a la API para obtener las películas populares
    const response = await fetch(`${API_SERVER}/movies`, options);
    const data = await response.json(); // Convertimos la respuesta a JSON
    const movies = data;// Extraemos las películas de la respuesta
    console.log(movies);
    const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');// Seleccionamos el contenedor de películas de tendencia en el DOM, la section que tiene dentro el div peliculas
    tendenciasContainer.innerHTML = '';// Limpiamos el contenido previo del contenedor

    //* Iteramos sobre cada película obtenida y creamos los elementos HTML para mostrar la película teniendo que en cuenta que se debe respetar la siguiente estructura por los estilos:
    /*<a href="./pages/detalle.html">
                    <div class="pelicula">
                        <img class="imgTendencia" src="./assets/img/peli_1.jpg" alt="The Beekeeper" loading="lazy">
                        <div class="tituloPelicula">
                            <h4>The Beekeeper</h4>
                        </div>
                    </div>
    </a>*/
    movies.forEach(movie => {
        // creo el ancla
        const ancla = document.createElement('a');
        ancla.href = './pages/detalle.html?movieId=' + movie.id;
        // creo el div pelicula
        const pelicula = document.createElement('div');
        pelicula.classList.add('pelicula');
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgTendencia');
        img.src = movie.poster;
        img.alt = movie.title;
        img.loading = 'lazy';
        // creo el div tituloPelicula
        const tituloPelicula = document.createElement('div');
        tituloPelicula.classList.add('tituloPelicula');
        // creo el h4
        const titulo = document.createElement('h4');
        titulo.textContent = movie.title;
        // relaciono los elementos
        ancla.appendChild(pelicula);
        pelicula.appendChild(img);
        pelicula.appendChild(tituloPelicula);
        tituloPelicula.appendChild(titulo);
        tendenciasContainer.appendChild(ancla);

    });

    // Actualizamos el atributo data-page con el número de página actual
    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

// Función para cargar películas en el carrusel de películas aclamadas
const cargarPeliculasAclamadas = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const response = await fetch(`${API_SERVER}/movies?genre=Drama&sortOrder=asc`, options);
    const data = await response.json();// Convertimos la respuesta a JSON
    const movies = data; // Extraemos las películas de la respuesta
    const aclamadasContainer = document.querySelector('.aclamadas'); // Seleccionamos el contenedor de películas aclamadas en el DOM

    // Iteramos sobre cada película obtenida para lograr la estructura de html que pongo a continuación:
    /*<div class="peliculaItem">
         <img class="imgAclamada" src="./assets/img/aclamada_1.jpg" alt="aclamada_1" loading="lazy">
      </div>*/
    movies.forEach(movie => {
        // creo el div peliculaItem
        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('peliculaItem');
        const ancla2 = document.createElement('a');
        ancla2.href = './pages/detalle.html?movieId=' + movie.id;
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgAclamada');
        img.src = movie.poster;
        img.alt = movie.title;
        img.loading = 'lazy';
        // relaciono los elementos
        peliculaItem.appendChild(ancla2);
        ancla2.appendChild(img);
        aclamadasContainer.appendChild(peliculaItem);
    });
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

// Event listener para el botón "Anterior"
botonAnterior.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Si es la primera página, no hacemos nada
    if (currentPage <= 1) return;
    // Cargar las películas de la página anterior
    cargarPeliculasTendencia(currentPage - 1);
});

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Cargar las películas de la página siguiente
    cargarPeliculasTendencia(currentPage + 1);
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en la cuadrícula de tendencias
    cargarPeliculasTendencia();
    // Cargamos las películas en el carrusel de películas aclamadas
    cargarPeliculasAclamadas();
});
