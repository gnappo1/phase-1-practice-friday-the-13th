//! Global vars
let currentFilm;

const nav = document.querySelector("#movie-list")
const movieImgDetail = document.querySelector("#detail-image")
const movieTitleDetail = document.querySelector("#title")
const movieReleaseYear = document.querySelector("#year-released")
const movieDesc = document.querySelector("#description")
const movieWatched = document.querySelector("#watched")
const movieBloodAmount = document.querySelector("#amount")
const bloodForm = document.querySelector("#blood-form")

//! Helper functions
const displayMoviePoster = filmObj => {
    let image = document.createElement("img")
    image.src = filmObj.image
    image.alt = filmObj.title

    //! Attach the listener here deliverable 3
    image.addEventListener("click", () => displayMovieDetails(filmObj))
    nav.append(image)
}

const displayMovieDetails = movie => {
    currentFilm = movie
    movieImgDetail.src = movie.image
    movieTitleDetail.textContent = movie.title
    movieReleaseYear.textContent = movie["release_year"]
    movieDesc.textContent = movie.description
    movieWatched.textContent = movie.watched ? "Watched" : "Unwatched"
    movieBloodAmount.textContent = movie["blood_amount"]
}

const toggleWatchedProperty = (e) => {
    //! Change the button text
    const newText = e.target.textContent === "Unwatched" ? "Watched" : "Unwatched"
    e.target.textContent = newText
    //! Change the object itself TEMPORARILY
    currentFilm.watched = !currentFilm.watched
}

const toggleBloodCount = e => {
    //! NO PAGE REFRESHES EVER
    e.preventDefault()
    //! Figure out the number typed
    const droplets = e.target['blood-amount'].value
    //! Modify the object's property
    currentFilm["blood_amount"] += parseInt(droplets) || 0
    //! Update the page
    movieBloodAmount.textContent = currentFilm["blood_amount"]
    //! Reset the form
    e.target.reset()
}

//! Execute code

//! Get all movies and display only the first one (Deliverable 1 & 2)
fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(movies => {
    //! TAKE CARE OF FIRST MOVIE
    displayMovieDetails(movies[0])
    //! LOAD EVERY IMAGE INTO NAV
    movies.forEach(displayMoviePoster)
})

//! Deliverable 4
movieWatched.addEventListener("click", toggleWatchedProperty)

//! Deliverable 5
bloodForm.addEventListener("submit", toggleBloodCount)


// TODO REFLECTIONS
//! The exercise could be improved firing appropriate PATCH requests
//! Any time the "watched" and "blood_amount" properties need to change
//! And then updating the DOM accordingly
//! This way there would be no need for a global variable to preserve memory of the current film.