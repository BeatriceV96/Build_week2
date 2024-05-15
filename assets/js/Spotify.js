document.addEventListener("DOMContentLoaded", function() {
    const artists = [
        { id: 1, name: "Artist 1", image: "path/to/image1.jpg" },
        { id: 412, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 48975581, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 3239781, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 7979, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 1155242, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 2936, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 9375398, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 13612387, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 7371074, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 1288678, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 5893334, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 10666539, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 75618, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 12246, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 245432, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 145693, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 10688385, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 160, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 564, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 6550, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 6855525, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 10583405, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 246791, name: "Artist 2", image: "path/to/image2.jpg" },
        { id: 4495513, name: "Artist 2", image: "path/to/image2.jpg" },
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
