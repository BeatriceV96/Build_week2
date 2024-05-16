document.addEventListener('DOMContentLoaded', function() {
    const artists = [
        { id: 1, name: "The Beatles", image: "https://api.deezer.com/artist/1/image" },
        { id: 412, name: "Queen", image: "https://api.deezer.com/artist/412/image"},
        { id: 48975581, name: "Geolier", image: "https://api.deezer.com/artist/48975581/image" },
        { id: 3239781, name: "Fedez", image: "https://api.deezer.com/artist/3239781/image" },
        { id: 7979, name: "Fabri Fibra", image: "https://api.deezer.com/artist/7979/image" },
        { id: 1155242, name: "Salmo", image: "https://api.deezer.com/artist/7979/image" },
        { id: 2936, name: "Shiva", image: "https://api.deezer.com/artist/1155242/image" },
        { id: 9375398, name: "Capo Plaza", image: "https://api.deezer.com/artist/9375398/image" },
        { id: 13612387, name: "Måneskin", image: "https://api.deezer.com/artist/13612387/image" },
        { id: 7371074, name: "Sfera Ebbasta", image: "https://api.deezer.com/artist/7371074/image" },
        { id: 1288678, name: "Lazza", image: "https://api.deezer.com/artist/5893334/image" },
        { id: 5893334, name: "Guè", image: "https://api.deezer.com/artist/5893334/image" },
        { id: 10666539, name: "Tedua", image: "https://api.deezer.com/artist/10666539/image" },
        { id: 75618, name: "Marracash", image: "https://api.deezer.com/artist/75618/image" },
        { id: 12246, name: "Taylor Swift", image: "https://api.deezer.com/artist/12246/image" },
        { id: 245432, name: "Annalisa", image: "https://api.deezer.com/artist/245432/image" },
        { id: 145693, name: "ELODIE", image: "https://api.deezer.com/artist/145693/image" },
        { id: 10688385, name: "Rose Villain", image: "https://api.deezer.com/artist/10688385/image" },
        { id: 160, name: "Shakira", image: "https://api.deezer.com/artist/160/image" },
        { id: 564, name: "Rihanna", image: "https://api.deezer.com/artist/564/image" },
        { id: 6550, name: "Gabry Ponte", image: "https://api.deezer.com/artist/6550/image" },
        { id: 6855525, name: "Baby Gang", image: "https://api.deezer.com/artist/6855525/image" },
        { id: 10583405, name: "Bad Bunny", image: "https://api.deezer.com/artist/10583405/image" },
        { id: 246791, name: "Drake", image: "https://api.deezer.com/artist/246791/image" },
        { id: 4495513, name: "Travis Scott", image: "https://api.deezer.com/artist/4495513/image" },
    ];

    const container = document.getElementById('cercArtisti');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const results = artists.filter(artist => artist.name.toLowerCase().includes(searchTerm));

        displayResults(results);
    });

    function displayResults(results) {
        // Pulisci il contenuto del contenitore
        container.innerHTML = '';

        // Mostra i risultati
        results.forEach(artist => {
            const artistDiv = createArtistCard(artist);
            container.appendChild(artistDiv);
        });
    }

    function createArtistCard(artist) {
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist-card');
        artistDiv.classList.add('coloreCerca')
    
        artistDiv.innerHTML = `
        <div>
            <p class="pCastom">Artista: ${artist.name}</p>
            <img src="${artist.image}" alt="${artist.name}" style="max-width: 100px;">
            <button class="bottoneCerca" onclick="searchArtist(${artist.id})">Dettagli</button>

        </div>    
        `;
    
        return artistDiv;
    }
});