const url = "https://api.jikan.moe/v4/anime"

window.addEventListener("load",()=>{
    const form = document.getElementById('form');
    form.addEventListener("submit",buscarAnime);
});

function buscarAnime(event){
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${url}?q=${query}&page=1&limit=4`)
    .then(response => response.json())
    .then(data => imprimirData(data, query))
    .catch(error => console.log(error))

}

function imprimirData(data, query){
    console.log(data)
    const result = document.getElementById('results');

    if(data.data.length === 0){
        console.log("error resultado no hay anime")
        result.innerHTML = `
        <div class="result-failed">
        <p>No es posible encontrar información de <strong>"${query}".</strong></p>
        <p>Revise el nombre e inténtelo de nuevo.</p>
        </div>`
    }
    else if(query === ""){
        console.log("No se busca, query vacía.")
        result.innerHTML = `<div></div>`
    }
    else{
        console.log("notnulldata")
        result.innerHTML = data.data
        .sort((a,b)=>a.title-b.title)
        .map(animeData=>{
            return `
            <div class="container">
                <div class="results-pic">
                    <img src="${animeData.images.jpg.image_url}">
                </div>
                <div class="results-content">
                    <div class="content_title"><h2>${animeData.title}</h2><h3>${animeData.title_japanese}</h3></div>
                    <div class="content_synopsis">${animeData.synopsis}</div>
                    <div class="more_info"><a href="${animeData.url}">Más info...</a></div>
                </div>
            </div>
            `
        })
    }


}