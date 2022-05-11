const base_url = "https://api.jikan.moe/v4";

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(dataString){

    const searchResults = document.getElementById('search-results');

    /*
    dataString.data
        .sort((a,b)=>a.episodes-b.episodes)
        .forEach(anime=>console.log(anime));
    */
    
    searchResults.innerHTML = dataString.data
        .sort((a,b)=>a.title-b.title)
        .map(anime=>{
            return `
                <div class="col s12 m7">
                    <div class="card">
                        <div class="card-image">
                            <img src="${anime.images.jpg.image_url}">
                            <span class="card-title">${anime.tittle}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>${anime.synopsis}</p>
                    </div>
                    <div class="card-action">
                        <a href="${anime.url}">Más info...</a>
                    </div>
                </div>
            `
        });
        
}

function pageLoaded(){
    const form = document.getElementById('form');
    form.addEventListener("submit",searchAnime);
}

window.addEventListener("load",pageLoaded);