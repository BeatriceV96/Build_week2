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

         
          
         
       
       <div class="container" id="listaBrani">
         
           <div class="col-12">
             <table class="my-3 text-light w-100">
               <thead>
                 <tr class="text-secondary mb-5">
                   <th scope="col"># TITOLO</th>
                   <th scope="col">RIPRODUZIONI</th>
                   <th scope="col"><i class="bi bi-stopwatch"></i></th>
                 </tr>
               </thead>
               <tbody class="table-group-divider">
                 ${album.tracks.data.map(track => `
                   <tr class="evidenzia">
                     <td><a href="#" class="text-decoration-none text-white">${track.title}</a>
                      <p class="text-secondary">
                      ${album.artist.name}
                      </p>
                     </td>
                     <td>${track.duration}</td>
                     <td>${track.rank}</td>
                   </tr>
                 `).join("")}
               </tbody>
             </table>
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
