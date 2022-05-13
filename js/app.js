/**
 * APLICACIÓN PARA BÚSQUEDA DE INFORMACIÓN SOBRE ANIMES
 * @author Martín Antonio Córdoba Getar
 * @description Uso de Jikan API para realizar peticiones y devolver al usuario resultados por pantalla.
 * @version 1.0
 * @date Mayo de 2022
 */

const url = "https://api.jikan.moe/v4/anime" //Asignamos url de la api

//Creamos listener de eventos para capturar lo que metamos en el formulario y se lo pasamos a la función buscarAnime como parámetro.
window.addEventListener("load",()=>{
    const form = document.getElementById('form');
    form.addEventListener("submit",buscarAnime);
});

//Función para buscar el anime en la base de datos con la api
function buscarAnime(event){
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search"); //Tomamos la información de lo que ponemos en el cuadro de búsqueda

    fetch(`${url}?q=${query}&page=1&limit=4`) //Hacemos una llamada a la api con la información del query. Limitamos a 4 resultados máximo.
    .then(response => response.json()) //Nos devuelve una respuesta que transformamos en array con json
    .then(data => imprimirData(data, query)) //Nos llevamos esa información a la función imprimirData (respuesta y query) para procesarla.
    .catch(error => console.log(error)) //En caso de error nos lo muestra en la consola del navegador

}

function imprimirData(data, query){
    //console.log(data)
    const result = document.getElementById('results'); //Asignamos el div de id results a la constante result, que utilizaremos para imprimir todo.

    if(data.data.length === 0){ //Si no hay anime, devuelve un array de longitud 0, lo capturamos y lanzamos el mensaje "no hay anime" en el result
        //console.log("error resultado no hay anime")
        result.innerHTML = `
        <div class="result-failed">
        <p>No es posible encontrar información de <strong>"${query}".</strong></p>
        <p>Revise el nombre e inténtelo de nuevo.</p>
        </div>`
    }
    else if(query === ""){ //Si el query está vacío, imprimo un div vacío para limpiar la pantalla, no se realiza búsqueda.
        //console.log("No se busca, query vacía.")
        result.innerHTML = `<div></div>`
    }
    else{ //En caso contrario, el anime existe y obtenemos resultados.
        //console.log("notnulldata")
        result.innerHTML = data.data //Asignamos los resultados a result
        .sort((a,b)=>a.title-b.title) //Ordenamos los títulos alfabéticamente según el título.
        .map(animeData=>{ //mapeamos la data y devolvemos la siguiente estructura dentro del div results
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
        }).join(""); //Unimos los 4 resultados y evitamos que aparezca una coma separando los objetos.
    }
}