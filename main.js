import { apiKey, DisplayMovieInfo } from './index.js';

document.querySelector('button').addEventListener('click', searchMovie);
document.querySelector('input').addEventListener('keydown', keypress);

const movieInfoDiv = document.getElementsByClassName('movie-container')[0];

function keypress(event) {
  if (event.key == 'Enter') {
    searchMovie();
  }
}

function searchMovie() {
  const movieTitle = document.getElementById('movieTitle').value;

  const apiUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
  movieInfoDiv.innerHTML = '<p>Searching...</p>';
  axios
    .get(apiUrl)
    .then((response) => {
      const movieInfo = response.data;
      movieInfoDiv.firstChild.remove();
      movieInfoDiv.append(DisplayMovieInfo(movieInfo));
    })
    .catch((error) => {
      console.error('Error fetching movie data:', error);
    });
}
