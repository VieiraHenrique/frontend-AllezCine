const featuredGrid = document.getElementById('featuredGrid');
const templateFeaturedFilm = document.getElementById('templateFeaturedFilm')

const modalMovie = document.getElementById('modal-movie');
const modalMovieTemplate = document.getElementById('modal-movie-template');
const featuredPrev = document.getElementById('featuredPrev');
const featuredNext = document.getElementById('featuredNext');




function openMoviePopup(MovieID, movie){
    let newItem = document.createElement('div');
    newItem.innerHTML = modalMovieTemplate.innerHTML;
    newItem.querySelector('.title').innerText = `${movie.title}`;
    newItem.querySelector('.overview').innerText = `${movie.overview}`
    newItem.querySelector('.year').innerText = movie.release_date.slice(0,4);
    modalMovie.appendChild(newItem)

    fetch(`https://api.themoviedb.org/3/movie/${MovieID}/videos?api_key=112ca2b68890cedc6cd02c2b81593072&language=en-US`)
    .then(res=>res.json())
    .then(data=>{

        newItem.querySelector('.trailer').innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0].key}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
        `
    })


    modalMovie.style.display = 'flex';
    const close = document.querySelector('.close');
    close.addEventListener('click', ()=>{
        modalMovie.style.display = 'none';
        newItem.remove()
    })
}

function findGenre(filmGenreID, genres){
    let genreArr = []
    genres.forEach((element)=>{
        if (filmGenreID.includes(element.id)){
            genreArr.push(element.name)
        }
    })

    genreArr = genreArr.join(' - ');

    return `${genreArr}`
    
};

const fetchFeatured = fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=112ca2b68890cedc6cd02c2b81593072');
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=112ca2b68890cedc6cd02c2b81593072&language=en-US');

let featuredPage = 0;

Promise.all([fetchFeatured, fetchGenres])
.then(values=>{
    return Promise.all(values.map(v=>v.json()))
}).then(([featured,genres])=>{
    featuredData = featured;
    genresData = genres;
    console.log(featuredData)
    addFeaturedFilm(featuredData, genresData, featuredPage)
    featuredNext.addEventListener('click', ()=>{
        console.log('next')
        if (featuredPage<=15) {
            featuredPage = featuredPage + 4;
        }
        addFeaturedFilm(featured, genres, featuredPage)
    })
    featuredPrev.addEventListener('click', ()=>{
        console.log('prev')
        if (featuredPage>=4){
            featuredPage = featuredPage - 4;
        }
        addFeaturedFilm(featured, genres, featuredPage)
    })
})

function addFeaturedFilm(featured, genres, i){
    featuredGrid.innerHTML = '';
    for(i;i<(featuredPage+4);i++){
        let newItem = document.createElement('div');
        newItem.innerHTML =templateFeaturedFilm.innerHTML;
        newItem.setAttribute('id', featured.results[i].id)
        newItem.querySelector('.rating').innerText = `Rating: ${featured.results[i].vote_average}`;
        newItem.querySelector('h3').innerText = featured.results[i].title
        newItem.querySelector('.year').innerText = featured.results[i].release_date.slice(0,4);
        newItem.querySelector('.genre').innerText = `${findGenre(featured.results[i].genre_ids, genres.genres)}`
        newItem.querySelector('img').setAttribute('src', `http://image.tmdb.org/t/p/w300/${featured.results[i].poster_path}`)
        featuredGrid.appendChild(newItem);
        newItem.addEventListener('click', ()=>{
            openMoviePopup(newItem.getAttribute('id'),featured.results[i]);
        })
    }
}