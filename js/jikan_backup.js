const base_url = "https://api.jikan.moe/v4";

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("searchBox");

    fetch(`${base_url}/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(dataString){
        dataString.data.sort((a,b)=>b.episodes-a.episodes).forEach(anime=>console.log(anime));
}

function pageLoaded(){
    const form = document.getElementById('form');
    form.addEventListener("submit",searchAnime);
}

window.addEventListener("load",pageLoaded);