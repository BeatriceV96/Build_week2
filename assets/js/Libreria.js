/*-------------------------VOLUME/PLAY/PAUSE-----------------------*/ 
var audio = document.getElementById('audioPlayer'); 
var playPauseIcon = document.getElementById('playPauseIcon');

function playPause() {
    if (audio.paused) {
        audio.play(); 
        playPauseIcon.classList.remove('bi-play-circle'); 
        playPauseIcon.classList.add('bi-pause-circle'); 
    } else {
        audio.pause(); 
        playPauseIcon.classList.remove('bi-pause-circle'); 
        playPauseIcon.classList.add('bi-play-circle');
    }
}
                 //---------------REGOLO VOLUME------------------//
var audio = document.getElementById('audioPlayer'); 
var volumeSlider = document.getElementById('volume-slider'); 
             
                
function changeVolume(volume) {
    audio.volume = volume / 100;
}
 /*-----------------------------------------------------------------------------*/



document.addEventListener("DOMContentLoaded", function () {
  // Ottieni l'ID dell'album dai parametri URL o usa un ID hardcoded se non specificato
  const queryParams = new URLSearchParams(window.location.search);
  const albumId = queryParams.get("id") || "75621062"; // Utilizzo di un fallback ID per dimostrazione

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
    .then((response) => response.json())
    .then((album) => {
      const albumInfoDiv = document.getElementById("card-row");
      albumInfoDiv.innerHTML = `
          <div>
          <div id="backLibreria" class= "d-flex align-items-center justify-content-around">
          <div style= "margin: 1em">
          <img src="${
            album.cover_medium
          }" alt="Album Cover" style= "max-width: 100%">
          </div>
          <div class= "text-center">
          <h2 class= " text-white">${album.title}</h2>
          <p class= " text-white hover ">By <a class= "text-decoration-none text-white" href="artist.html?id=${
            album.artist.id
          }">${album.artist.name}</a></p>
           </div>  
           </div> 

          <div class="gradiente">
          <div class="mb-3 pt-3 " id="playLibreria">
          <a href= "#" class="ps-5 text-success fs-3 text

          " ><i class="bi bi-play-circle"></i></a>
          <a href= "#" class="ps-5 text-white fs-5 text" ><i class="bi bi-suit-heart"></i></a>
          <a href= "#" class="ps-5 text-white fs-5 text" ><i class="bi bi-arrow-down-circle"></i></a>
          <a href= "#" class="ps-5 text-white fs-5 text" ><i class="bi bi-three-dots"></i></a>
          </div>

         <div class="titRipTime">
          <p> # TITOLO </p>
          <p> RIPRODUZIONI </p>
          <p><i class="bi bi-stopwatch"></i></p>
         </div>
          

           <div class="container" id= "listaBrani">
           <div class="row">
             <div class="col-8 flex-grow-1">
                <div>
          <ol class= " text-white my-3 ">
                  ${album.tracks.data
                    .map(
                      (track) =>
                        `<li><a href= "#" class= "text-decoration-none text-white ">${track.title}</a> <br><span class="span-artist">${album.artist.name}</span></li>`
                    )
                    .join("")}
              </ol>
              </div>
          </div>
             </div>
             <div class="col-2">
             <div>
             <ol class= " text-white my-3 ">
                     ${album.tracks.data
                       .map(
                         (track) =>
                           `<li class="lista" style="color: #505050;">${track.duration}</li>`
                       )
                       .join("")}
                 </ol>
                 </div>
             </div>
             <div class="col-2">
             <div>
             <ol class= " text-white my-3 ">
                     ${album.tracks.data
                       .map(
                         (track) =>
                           `<li class="lista" style="color: #505050;">${track.rank}</li>`
                       )
                       .join("")}
                 </ol>
                 </div>
             </div>
           </div>
           </div>
         </div>



          
              
          `;
    })
    .catch((error) => console.error("Error fetching album data:", error));
});

const getList = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/75621062`)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Errore non mi trova un cazzo");
      }
    })

    .then((lista) => {
      console.log(lista);
      generoCards(lista);
    });
};

getList();
