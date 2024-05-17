document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artistId');

    if (artistId) {
        fetchArtistDetails(artistId);
        fetchArtistTracks(artistId);
    }
});

function fetchArtistDetails(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(artist => {
            displayArtistDetails(artist);
            fetchArtistTracks(artist.name); // Aggiungi questa linea per cercare le tracce dell'artista
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

function fetchArtistTracks(artistName) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayTopTracks(data.data);
        })
        .catch(error => console.error('Error fetching artist tracks:', error));
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
                <div class="mb-3 pt-3" id="playLibreria">
                    <a href="#" class="ps-5 text-success fs-3 text play-track" data-preview="${track.preview}" data-cover="${track.album.cover_big}" data-title="${track.title}" data-artist="${track.artist.name}"><i class="bi bi-play-circle"></i></a>
                    <a href="#" class="ps-5 text-white fs-5 text"><i class="bi bi-suit-heart"></i></a>
                    <a href="#" class="ps-5 text-white fs-5 text"><i class="bi bi-arrow-down-circle"></i></a>
                    <a href="#" class="ps-5 text-white fs-5 text"><i class="bi bi-three-dots"></i></a>
                </div>
                <div class="titRipTime">
                    <p># TITOLO</p>
                </div>
                <p class="p-3">${track.title}</p>
            </div>
        `;
        tracksContainer.appendChild(trackElement);
    });

    // Aggiungi un evento click ai pulsanti di riproduzione
    document.querySelectorAll('.play-track').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const previewUrl = this.getAttribute('data-preview');
            const coverUrl = this.getAttribute('data-cover');
            const title = this.getAttribute('data-title');
            const artist = this.getAttribute('data-artist');
            playPreview(previewUrl, coverUrl, title, artist);
        });
    });
}

// Funzione per riprodurre l'anteprima della traccia e cambiare l'immagine di copertina
function playPreview(previewUrl, coverUrl, title, artist) {
    const audioPlayer = document.getElementById('audioPlayer');
    const playerCover = document.querySelector('.footer .w-25'); // Assumendo che questa sia l'immagine del player
    const trackTitle = document.querySelector('.footer h5'); // Titolo della traccia nel player
    const trackArtist = document.querySelector('.footer p'); // Nome dell'artista nel player

    // Cambia l'immagine di copertina
    playerCover.src = coverUrl;

    // Aggiorna i dettagli del brano (titolo e artista)
    trackTitle.textContent = title;
    trackArtist.innerHTML = `${artist} <span class="span"><i class="bi bi-suit-heart cuore-footer"></i></span>`;

    // Riproduci l'anteprima della traccia
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}

//-------------------------------PLAYER---------------------------------------------//

var audio = document.getElementById('audioPlayer'); 
var volumeSlider = document.getElementById('volume-slider'); 
             
function changeVolume(volume) {
    audio.volume = volume / 100;
}

//-------------------------------PROGRESS MUSIC--------------------//

document.addEventListener('DOMContentLoaded', function() {
    let progressBar = document.getElementById("progressBar");
    let song = document.getElementById("audioPlayer");

    // Il codice per gestire la barra di progresso deve essere aggiornato dinamicamente
    song.addEventListener('loadedmetadata', function() {
        progressBar.max = song.duration;
    });

    song.ontimeupdate = function() {
        progressBar.value = song.currentTime;
    };

    progressBar.oninput = function() {
        song.currentTime = progressBar.value;
    };
});
