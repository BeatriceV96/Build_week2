document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artistId');

    if (artistId) {
        fetchArtistDetails(artistId);
    }

    let progressBar = document.getElementById("progressBar");
    let song = document.getElementById("audioPlayer");

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

const artists = [
    { id: 1, name: "The Beatles", image: "" },
    { id: 48975581, name: "Geolier", image: "path/to/image2.jpg" },
    { id: 3239781, name: "Fedez", image: "path/to/image2.jpg" },
    { id: 7979, name: "Fabri Fibra", image: "path/to/image2.jpg" },
    { id: 1155242, name: "Salmo", image: "path/to/image2.jpg" },
    { id: 2936, name: "Shiva", image: "path/to/image2.jpg" },
    { id: 9375398, name: "Capo Plaza", image: "path/to/image2.jpg" },
    { id: 13612387, name: "Måneskin", image: "path/to/image2.jpg" },
    { id: 7371074, name: "Sfera Ebbasta", image: "path/to/image2.jpg" },
    { id: 1288678, name: "Lazza", image: "path/to/image2.jpg" },
    { id: 5893334, name: "Guè", image: "path/to/image2.jpg" },
    { id: 10666539, name: "Tedua", image: "path/to/image2.jpg" },
    { id: 75618, name: "Marracash", image: "path/to/image2.jpg" },
    { id: 12246, name: "Taylor Swift", image: "path/to/image2.jpg" },
    { id: 245432, name: "Annalisa", image: "path/to/image2.jpg" },
    { id: 145693, name: "ELODIE", image: "path/to/image2.jpg" },
    { id: 10688385, name: "Rose Villain", image: "path/to/image2.jpg" },
    { id: 160, name: "Shakira", image: "path/to/image2.jpg" },
    { id: 564, name: "Rihanna", image: "path/to/image2.jpg" },
    { id: 6550, name: "Gabry Ponte", image: "path/to/image2.jpg" },
    { id: 6855525, name: "Baby Gang", image: "path/to/image2.jpg" },
    { id: 10583405, name: "Bad Bunny", image: "path/to/image2.jpg" },
    { id: 246791, name: "Drake", image: "path/to/image2.jpg" },
    { id: 4495513, name: "Travis Scott", image: "path/to/image2.jpg" },
];

function fetchArtistDetails(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(artist => {
            displayArtistDetails(artist);
            fetchArtistTracks(artist.name); // Cerca le tracce dell'artista
            updateBackgroundVideo(artist.name); // Aggiorna il video di sfondo
        })
        .catch(error => console.error('Error fetching artist details:', error));
}

function updateBackgroundVideo(artistName) {
    const videoElement = document.getElementById('backgroundVideo');
    let videoSrc = ''; // URL del video in base all'artista

    // Rimuove gli spazi bianchi aggiuntivi dai nomi
    const cleanArtistName = artistName.trim().toLowerCase();
    const artist = artists.find(a => a.name.toLowerCase() === cleanArtistName);

    if (artist) {
        // Utilizziamo l'ID dell'artista per costruire il nome del file video
        videoSrc = `./video/${artist.id}.mp4`;
    } else {
        // Se l'artista non è trovato, utilizza un video predefinito
        videoSrc = 'default_video.mp4';
    }

    // Imposta l'attributo src del videoElement con il videoSrc ottenuto
    videoElement.src = videoSrc;
}

function displayArtistDetails(artist) {
    const container = document.getElementById('artistDetails');
    container.innerHTML = ''; // Pulisci il contenitore

    container.innerHTML = `
        <div>
            <div id="nomeImmagine">
            <video id="backgroundVideo" autoplay muted loop style="width: -webkit-fill-avail></video>
            
                <h1>${artist.name}</h1>
                <img class="w-25" src="${artist.picture_big}" alt="Image of ${artist.name}">
            </div>
        </div>
    `;
}

let currentTrackIndex = 0;
let tracks = [];

function fetchArtistTracks(artistName) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            tracks = data.data;
            displayTopTracks(tracks);
        })
        .catch(error => console.error('Error fetching artist tracks:', error));
}

function displayTopTracks(tracks) {
    const tracksContainer = document.getElementById('tracksContainer');
    tracksContainer.innerHTML = '';

    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.innerHTML = `
            <div class="gradiente">
                <div class="mb-3 pt-3" id="playLibreria">
                    <a href="#" class="ps-5 text-success fs-3 text play-track" data-index="${index}" data-preview="${track.preview}" data-cover="${track.album.cover_big}" data-title="${track.title}" data-artist="${track.artist.name}"><i class="bi bi-play-circle"></i></a>
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

    document.querySelectorAll('.play-track').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const index = parseInt(this.getAttribute('data-index'));
            playTrack(index);
        });
    });
}

function playTrack(index) {
    currentTrackIndex = index;
    const track = tracks[index];
    const audioPlayer = document.getElementById('audioPlayer');
    const playerCover = document.querySelector('.footer .w-25');
    const trackTitle = document.querySelector('.footer h5');
    const trackArtist = document.querySelector('.footer p');

    playerCover.src = track.album.cover_big;
    trackTitle.textContent = track.title;
    trackArtist.innerHTML = `${track.artist.name} <span class="span"><i class="bi bi-suit-heart cuore-footer"></i></span>`;

    audioPlayer.src = track.preview;
    audioPlayer.play();
    updatePlayPauseIcon();
}

function playPause() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (audioPlayer.paused) {
        playPauseIcon.classList.remove('bi-pause-circle');
        playPauseIcon.classList.add('bi-play-circle');
    } else {
        playPauseIcon.classList.remove('bi-play-circle');
        playPauseIcon.classList.add('bi-pause-circle');
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

function playBackTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function changeVolume(volume) {
    const audio = document.getElementById('audioPlayer');
    audio.volume = volume / 100;
}
