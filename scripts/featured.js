const featuredGrid = document.getElementById('featuredGrid');
const templateFeaturedFilm = document.getElementById('templateFeaturedFilm')

function addFeaturedFilm(featured, genres){
    for(let i=0;i<12;i++){
        let newItem = document.createElement('div');
        newItem.innerHTML =templateFeaturedFilm.innerHTML;
        newItem.querySelector('h3').innerText = featured.results[i].title
        newItem.querySelector('.year').innerText = featured.results[i].release_date.slice(0,4);
        newItem.querySelector('.genre').innerText = `${findGenre(featured.results[i].genre_ids, genres.genres)}`
        newItem.querySelector('img').setAttribute('src', `http://image.tmdb.org/t/p/w300/${featured.results[i].poster_path}`)
        featuredGrid.appendChild(newItem);
    }
}

function findGenre(filmGenreID, genres){
    console.log(genres[0].id)
    let genreArr = []
    genres.forEach((element)=>{
        if (filmGenreID.includes(element.id)){
            genreArr.push(element.name)
        }
    })

    genreArr = genreArr.join(' - ');

    return `${genreArr}`
    
}

const fetchFeatured = fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=112ca2b68890cedc6cd02c2b81593072');
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=112ca2b68890cedc6cd02c2b81593072&language=en-US');

Promise.all([fetchFeatured, fetchGenres])
.then(values=>{
    return Promise.all(values.map(v=>v.json()))
}).then(([featured,genres])=>{
    addFeaturedFilm(featured, genres)
})