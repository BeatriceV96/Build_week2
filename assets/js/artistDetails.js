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

    const name = document.createElement('h1');
    name.textContent = artist.name;

    const img = new Image();
    img.src = artist.picture_big;
    img.alt = `Image of ${artist.name}`;

    container.appendChild(name);
    container.appendChild(img);
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
