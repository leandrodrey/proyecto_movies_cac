const API_SERVER = 'https://codo-a-codo-js-api.vercel.app';
const tableBody = document.getElementById('movieTableBody');

async function fetchMovies() {
    try {
        const response = await fetch(`${API_SERVER}/movies`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        });

        if (response.ok) {
            const movies = await response.json();

            tableBody.innerHTML = '';

            movies.forEach(movie => {
                const row = tableBody.insertRow();

                const propertiesToDisplay = ['title'];
                propertiesToDisplay.forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = movie[key];
                });

                const editCell = row.insertCell();
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => handleEdit(movie.id));
                editCell.appendChild(editButton);

                const deleteCell = row.insertCell();
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => handleDelete(movie.id));
                deleteCell.appendChild(deleteButton);
            });
        } else {
            console.error('Error fetching movies:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to handle edit button click
function handleEdit(movieId) {
    window.location.href = `./editarpelicula.html?movieId=${movieId}`;
}

// Function to handle delete button click
async function handleDelete(movieId) {
    if (window.confirm("Are you sure you want to delete this movie?")) {
        try {
            const response = await fetch(`${API_SERVER}/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                },
            });

            if (response.ok) {
                console.log(response)
                console.log('Movie deleted successfully');
                await fetchMovies();
            } else {
                console.error('Error deleting movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log('Deletion canceled');
    }
}

fetchMovies(); // Call the function to fetch and display movies
