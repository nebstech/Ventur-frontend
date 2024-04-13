const url = `https://coral-app-hed6u.ondigitalocean.app/locations/${encodeURIComponent(locationQuery)}/trips`;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const locationQuery = params.get('location'); // Ensure this is within scope for subsequent use.
    if (locationQuery) {
        searchTripsByLocation(locationQuery);
    }
});

async function searchTripsByLocation(locationQuery) { // Ensure locationQuery is passed as a parameter
    try {
        const url = `https://coral-app-hed6u.ondigitalocean.app/locations/${encodeURIComponent(locationQuery)}/trips`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch trips');
        }
        const trips = await response.json();
        displayTrips(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
    }
}

function displayTrips(trips) {
    const tripsContainer = document.getElementById('trips-container');
    tripsContainer.innerHTML = ''; // Clear previous results

    if (trips.length > 0) {
        trips.forEach(trip => {
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'content-wrapper';  // Use class for styling, if multiple elements share this style

            const tripName = document.createElement('h1');
            tripName.textContent = trip.name;

            const tripLocation = document.createElement('p');
            tripLocation.textContent = `Location: ${trip.location.map(loc => loc.city).join(', ')}`;

            const tripComment = document.createElement('p');
            tripComment.textContent = `Comment: ${trip.comment || 'No comment provided'}`;

            contentWrapper.appendChild(tripName);
            contentWrapper.appendChild(tripLocation);
            contentWrapper.appendChild(tripComment);

            tripsContainer.appendChild(contentWrapper);
        });
    } else {
        tripsContainer.innerHTML = '<p>No trips found for this location.</p>';
    }
}
