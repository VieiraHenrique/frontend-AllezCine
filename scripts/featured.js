const featuredGrid = document.getElementById('featuredGrid');
const templateFeaturedFilm = document.getElementById('templateFeaturedFilm')

function addFeaturedFilm(featured, genres){
    for(let i=0;i<10;i++){
        let newItem = document.createElement('div');
        newItem.innerHTML =templateFeaturedFilm.innerHTML;
        newItem.querySelector('h3').innerText = featured.results[i].title
        newItem.querySelector('.year').innerText = featured.results[i].release_date.slice(0,4) + ' - ';
        findGenre(featured.results[i].genre_ids, genres.genres);
        newItem.querySelector('.genre').innerText = `${genre[i]}`
        newItem.querySelector('img').setAttribute('src', `http://image.tmdb.org/t/p/w300/${featured.results[i].poster_path}`)
        featuredGrid.appendChild(newItem);
    }
}

let genre = []

function findGenre(filmGenreID, genres){
    filmGenreID.map((id)=>{
        for (i=0; i<genres.length;i++){
            if (id===genres[i].id){
                console.log(genres[i].name)
                genre.push(genres[i].name)
            }
        }
    })
}

/* const fetchFeatured = fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=112ca2b68890cedc6cd02c2b81593072')
.then(res=>res.json())
.then(data => {
    console.log(data.results);
    addFeaturedFilm(data)
}) */

const fetchFeatured = fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=112ca2b68890cedc6cd02c2b81593072');
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=112ca2b68890cedc6cd02c2b81593072&language=en-US');

Promise.all([fetchFeatured, fetchGenres])
.then(values=>{
    return Promise.all(values.map(v=>v.json()))
}).then(([featured,genres])=>{
    console.log(featured)
    console.log(genres)
    addFeaturedFilm(featured, genres)
})