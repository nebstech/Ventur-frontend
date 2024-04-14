document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('location'); // Assuming 'location' is the query parameter
    const searchInput = document.getElementById('location-search');
    const tripsContainer = document.getElementById('trips-container');

    if (!searchInput || !tripsContainer) {
        console.error('One or more elements are missing in the DOM');
        return;
    }

    if (searchQuery) {
        searchInput.value = searchQuery; // Set the search input to the current query
        fetchSearchResults(searchQuery, tripsContainer);
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetchSearchResults(searchInput.value, tripsContainer);
        });
    } else {
        console.error('Search form is missing in the DOM');
    }
});

function fetchSearchResults(query, tripsContainer) {
    fetch(`https://coral-app-hed6u.ondigitalocean.app/api/trips/search/${encodeURIComponent(query)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(trips => displayTrips(trips, tripsContainer))
    .catch(error => {
        console.error('Error fetching search results:', error);
        tripsContainer.innerHTML = '<p>Error fetching search results.</p>';
    });
}

function displayTrips(trips, tripsContainer) {
    tripsContainer.innerHTML = ''; // Clear any previous content

    if (trips.length > 0) {
        trips.forEach(trip => {
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'content-wrapper';

            const tripName = document.createElement('h1');
            tripName.textContent = trip.name;

            const tripLocation = document.createElement('p');
            tripLocation.textContent = trip.location && trip.location.length > 0
                ? `Location: ${trip.location.map(loc => `${loc.city}, ${loc.state}`).join('; ')}`
                : 'Location details not available';

            const tripComment = document.createElement('p');
            tripComment.textContent = `Comment: ${trip.comments || 'No comment provided'}`;

            contentWrapper.appendChild(tripName);
            contentWrapper.appendChild(tripLocation);
            contentWrapper.appendChild(tripComment);
            tripsContainer.appendChild(contentWrapper);
        });
    } else {
        tripsContainer.innerHTML = '<p>No trips found for this location.</p>';
    }
}
