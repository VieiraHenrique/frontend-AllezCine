const genreGrid = document.getElementById('genreGrid');
const genresMoviesButtons = document.querySelectorAll('.genres-movie__buttons div');


function addGenreMovie(genreMovie, genre){
    for (let i = 0; i<12; i++){

        let newItem = document.createElement('div');
        newItem.innerHTML = templateFeaturedFilm.innerHTML;
        newItem.setAttribute('id', genreMovie[i].id)
        newItem.querySelector('h3').innerText = genreMovie[i].title;
        newItem.querySelector('.year').innerText = genreMovie[i].release_date.slice(0,4);
        newItem.querySelector('.genre').innerText = `${genre}`
        newItem.querySelector('img').setAttribute('src', `http://image.tmdb.org/t/p/w300/${genreMovie[i].poster_path}`)
        genreGrid.appendChild(newItem);
        
        newItem.addEventListener('click', ()=>{
            openMoviePopup(newItem.getAttribute('id'),genreMovie[i]);
        })


    }
}


genresMoviesButtons.forEach((el)=>{
    el.addEventListener('click',()=>{
        genresMoviesButtons.forEach((e)=>{
            e.classList.remove('selected')
        })
        el.classList.add('selected')
        const fetchGenreMovie = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=112ca2b68890cedc6cd02c2b81593072&with_genres=${el.getAttribute('genre')}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.results)
            genreGrid.innerHTML =''
            addGenreMovie(data.results, el.innerText)
        })
    })
})


const fetchGenreMovie = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=112ca2b68890cedc6cd02c2b81593072&with_genres=35`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.results)
            genreGrid.innerHTML =''
            addGenreMovie(data.results, 'Comedy')
        })