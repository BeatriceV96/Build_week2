document.addEventListener('DOMContentLoaded', function() {
    // Ottieni l'ID dell'album dai parametri URL o usa un ID hardcoded se non specificato
    const queryParams = new URLSearchParams(window.location.search);
    const albumId = queryParams.get('id') || '75621062';  // Utilizzo di un fallback ID per dimostrazione

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
        .then(response => response.json())
        .then(album => {
            const albumInfoDiv = document.getElementById('card-row');
            albumInfoDiv.innerHTML = `
            <div>
            <div id="backLibreria" class= "d-flex align-items-center justify-content-around">
            <div>
            <img src="${album.cover_medium}" alt="Album Cover">
            </div>
            <div>
            <h2 class= " text-white text-center">${album.title}</h2>
            <p class= " text-white hover ">By <a class= "text-decoration-none text-white" href="artist.html?id=${album.artist.id}">${album.artist.name}</a></p>
             </div>  
             </div> 

             <div class="container" id= "listaBrani">
             <div class="row">
               <div class="col-8 flex-grow-1">
                  <div>
            <ol class= " text-white my-3 ">
                    ${album.tracks.data.map(track => `<li>${track.title} <br> QUEEN </li>`).join('')}
                </ol>
                </div>
            </div>
               </div>
               <div class="col-2">
               <div>
               <ol class= " text-white my-3 ">
                       ${album.tracks.data.map(track => `<li class="lista">${track.duration}</li>`).join('')}
                   </ol>
                   </div>
               </div>
               <div class="col-2">
               <div>
               <ol class= " text-white my-3 ">
                       ${album.tracks.data.map(track => `<li class="lista">${track.rank}</li>`).join('')}
                   </ol>
                   </div>
               </div>
             </div>
             
           </div>



            
                
            `;
        })
        .catch(error => console.error('Error fetching album data:', error));
});


const getList = function () {
    fetch( `https://striveschool-api.herokuapp.com/api/deezer/album/75621062`)

    .then ( (response) => {
        if (response.ok) {
            console.log(response)
            return response.json();
        } else{
            throw new Error('Errore non mi trova un cazzo')
        }
    })

    .then ( (lista) => {
        console.log(lista)
        generoCards(lista)
    })
}

getList()