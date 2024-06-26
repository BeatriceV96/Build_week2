  
/*--------------------------------------------------------------------------*/ 

document.addEventListener("DOMContentLoaded", function() {
    const artists = [
        { id: 1, name: "The Beatles", image: "" },
        { id: 412, name: "Queen", image: "path/to/image2.jpg"},
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

    artists.forEach(artist => {
        fetchArtistDetails(artist.id);
    });
});

function fetchArtistDetails(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(artist => {
            displayArtist(artist);
        })
        .catch(error => {
            console.error('Error fetching artist details:', error);
        });
}

function displayArtist(artist) {
    const container = document.getElementById('artistContainer');
    const card = document.createElement('div');
    card.className = 'cards';
    card.setAttribute('data-artist-id', artist.id);

    const img = document.createElement('img');
    img.src = artist.picture_medium;
    img.alt = artist.name;
    card.appendChild(img);

    const artistName = document.createElement('h3');
    artistName.textContent = artist.name;
    card.appendChild(artistName);

    
    card.addEventListener('click', function() {
        window.location.href = `artistDetails.html?artistId=${artist.id}`;
    });

    container.appendChild(card);
}
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artistId');

    if (artistId) {
        fetchArtistTopTracks(artistId);
    }
});

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
    tracksContainer.innerHTML = '';

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';

        const trackName = document.createElement('p');
        trackName.textContent = track.title;
        trackElement.appendChild(trackName);

        tracksContainer.appendChild(trackElement);
    });
}


//----------------------MUSIC PLAYER------------------------------//

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

//-------------------------------PROGRESS MUSIC--------------------//

let progressBar = document.getElementById("progressBar");
let song = document.getElementById("audioPlayer");

let duration = 197;

progressBar.max = duration;

song.ontimeupdate = function() {
    progressBar.value = Math.min(song.currentTime, duration);
};

progressBar.oninput = function() {
    song.currentTime = progressBar.value;
}; 
         