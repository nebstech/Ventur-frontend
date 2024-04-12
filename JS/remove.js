document.addEventListener('DOMContentLoaded', function() {
    const removeButton = document.querySelector('.rmv-done');
    if (removeButton) {
        removeButton.addEventListener('click', removeTrip);
    }

    populateTripsSelect();
});

function populateTripsSelect() {
    const tripsSelect = document.querySelector('.trip-select');
    tripsSelect.innerHTML = '<option selected>Select Trip</option>';

    const localTrips = JSON.parse(localStorage.getItem('trips'));
    if (localTrips) {
        localTrips.forEach(trip => {
            console.log('Local trip name:', trip.name);
            const option = document.createElement('option');
            option.value = trip.id;
            option.textContent = trip.name;
            tripsSelect.appendChild(option);
        });
    }

    fetch('https://coral-app-hed6u.ondigitalocean.app/trip')
    .then(response => response.json())
    .then(tripsFromDb => {
        tripsFromDb.forEach(trip => {
            console.log('DB trip:', trip);
            const option = document.createElement('option');
            option.value = trip._id;
            option.textContent = trip.name || trip.title || 'Unnamed Trip';
            tripsSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Failed to load trips from the database:', error));
}

function getTripId() {
    return localStorage.getItem('currentTripId');
}

function removeTrip() {
    const tripId = getTripId();
    if (!tripId) {
        console.error('No trip ID found');
        return;
    }

    fetch(`https://coral-app-hed6u.ondigitalocean.app/trip/${tripId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to remove trip');
        }
        return response.json();
    })
    .then(data => {
        console.log('Trip removed:', data);
        window.location.href = 'home.html'; // Redirect to the home page after successful deletion
    })
    .catch(error => {
        console.error('Error removing trip:', error);
    });
}

function logout() {
    fetch('https://coral-app-hed6u.ondigitalocean.app/user/logout', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        window.location.href = 'index.html'; // or your logout landing page URL
    })
    .catch(error => {
        console.error('Error:', error);
    });
}