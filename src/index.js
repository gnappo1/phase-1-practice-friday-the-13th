//! Global vars

const nav = document.querySelector("#movie-list")
const movieImgDetail = document.querySelector("#detail-image")
const movieTitleDetail = document.querySelector("#title")
const movieReleaseYear = document.querySelector("#year-released")
const movieDesc = document.querySelector("#description")
const movieWatched = document.querySelector("#watched")
const movieBloodAmount = document.querySelector("#amount")

let currentFilm;
//! Helper functions
const displayMovieDetails = movie => {
    currentFilm = movie
    movieImgDetail.src = movie.image
    movieTitleDetail.textContent = movie.title
    movieReleaseYear.textContent = movie["release_year"]
    movieDesc.textContent = movie.description
    movieWatched.textContent = movie.watched ? "Watched" : "Unwatched"
    movieBloodAmount.textContent = movie["blood_amount"]
    movieWatched.addEventListener("click", (e) => {
        //! Change the button text
        const newText = e.target.textContent === "Unwatched" ? "Watched" : "Unwatched"
        e.target.textContent = newText
        //! Change the object itself TEMPORARILY
        movie.watched = !movie.watched
    })
}

//! Execute code

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(movies => {
    //! TAKE CARE OF FIRST MOVIE
    displayMovieDetails(movies[0])
    //! LOAD EVERY IMAGE INTO NAV
    movies.forEach(filmObj => {
        let image = document.createElement("img")
        image.src = filmObj.image
        image.alt = filmObj.title

        //! Attach the listener here
        image.addEventListener("click", () => displayMovieDetails(filmObj))
        nav.append(image)
    })
})