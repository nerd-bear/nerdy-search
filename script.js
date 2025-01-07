function performSearch() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery) {
        saveSearchQuery(searchQuery);
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
}

function saveSearchQuery(query) {
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!searches.includes(query)) {
        searches.unshift(query);
        if (searches.length > 5) {
            searches = searches.slice(0, 5);
        }
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        displayRecentSearches();
    }
}

function displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const recentSearchesList = document.getElementById('recentSearchesList');
    recentSearchesList.innerHTML = searches
        .map(search => `<li onclick="searchAgain('${search}')">${search}</li>`)
        .join('');
}

function searchAgain(query) {
    document.getElementById('searchInput').value = query;
    performSearch();
}

document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function playSound() {
    var audio = new Audio('https://search.nerd-bear.org/audio/ambient-sound-primary.mp3');
    audio.volume = 0.1;
    audio.play();
}

playSound();

displayRecentSearches();
