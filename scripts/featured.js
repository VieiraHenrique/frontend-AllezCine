const featuredGrid = document.getElementById('featuredGrid');
const templateFeaturedFilm = document.getElementById('templateFeaturedFilm')

function addFeaturedFilm(data){
    for(let i=0;i<20;i++){
        let newItem = document.createElement('div');
        newItem.innerHTML =templateFeaturedFilm.innerHTML;
        newItem.querySelector('h3').innerText = data.results[i].title
        newItem.querySelector('.year').innerText = data.results[i].release_date.slice(0,4)
        newItem.querySelector('img').setAttribute('src', `http://image.tmdb.org/t/p/w185/${data.results[i].poster_path}`)
        featuredGrid.appendChild(newItem);
    }
}

fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=112ca2b68890cedc6cd02c2b81593072')
.then(res=>res.json())
.then(data => {
    console.log(data.results);
    addFeaturedFilm(data)
})