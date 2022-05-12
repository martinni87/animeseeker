const base_url = "https://api.jikan.moe/v4";

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/anime?q=${query}&page=1`)
        .then(res=>res.json())
        .then(updateDom)
        .catch(err=>document(err.message));
}

function updateDom(dataString){

    const searchResults = document.getElementById('search-results');
    
    const animeByCategories = dataString.data
        .reduce((acc,anime)=>{
            const {type} = anime;
            if (acc[type] === undefined) acc [type] = [];
            acc[type].push(anime);
            return acc;
        },{})

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{
            
            const animesHTML = animeByCategories[key]
            .sort((a,b)=>a.title-b.title)
            .map(anime=>{
                return `
                    <div class="container">
                        <div class="search__results--pic">
                            <img src="${anime.images.jpg.image_url}">
                        </div>
                        <div class="search__results--content">
                            <div class="content_title"><h2>${anime.title}</h2></div>
                            <div class="content_synopsis">${anime.synopsis}</div>
                        </div>
                        <div class="search_results--moreinfo">
                            <a href="${anime.url}">Más info...</a>
                        </div>
                    </div>
                `
            }).join("");
            
            return `
                <div class="row">${animesHTML}</div>`
        }).join("");

        //<section><h3>${key.toUpperCase()}</h3></section>
        
}

function pageLoaded(){
    const form = document.getElementById('form');
    form.addEventListener("submit",searchAnime);
}

window.addEventListener("load",pageLoaded);