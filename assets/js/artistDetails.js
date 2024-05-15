document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artistId');

    if (artistId) {
        fetchArtistDetails(artistId);
        fetchArtistTopTracks(artistId);
    }
});

function fetchArtistDetails(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(artist => {
            displayArtistDetails(artist);
        })
        .catch(error => console.error('Error fetching artist details:', error));
}

function displayArtistDetails(artist) {
    const container = document.getElementById('artistDetails');
    container.innerHTML = ''; // Pulisci il contenitore

    // Uso dei template literals per creare il contenuto
    container.innerHTML = `
        <div>
        <div id="nomeImmagine">
        <h1>${artist.name}</h1>
        <img class="w-25" src="${artist.picture_big}" alt="Image of ${artist.name}">
        </div>
        </div>
    `;
}

function fetchArtistTopTracks(artistId) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayTopTracks(data.data);
        })
        .catch(error => console.error('Error fetching artist top tracks:', error));
}

function displayTopTracks(tracks) {
    const tracksContainer = document.getElementById('tracksContainer');
    tracksContainer.innerHTML = ''; // Pulisce le tracce esistenti

    tracks.forEach(track => {
        // Crea un elemento traccia usando i template literals
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.innerHTML = `
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
        
       </div>
            <p class="p-3">${track.title}</p>
        `;
        
        tracksContainer.appendChild(trackElement);
    });
}
