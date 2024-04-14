document.addEventListener('DOMContentLoaded', function() {
    const removeButton = document.querySelector('.rmv-done');
    if (removeButton) {
        removeButton.addEventListener('click', removeTrip);
    }

    populateTripsSelect();
});

function populateTripsSelect() {
    const tripsSelect = document.querySelector('.trip-select');
    tripsSelect.innerHTML = ''; // Clear existing options

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select Trip';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    tripsSelect.appendChild(defaultOption);

    // Load trips from localStorage
    const localTrips = JSON.parse(localStorage.getItem('localTrips'));
    if (localTrips) {
        localTrips.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.id; // Assuming 'id' is the correct identifier
            option.textContent = trip.name;
            tripsSelect.appendChild(option);
        });
    }

    // Fetch trips from the API
    fetch('https://coral-app-hed6u.ondigitalocean.app/api/trips')
    .then(response => response.json())
    .then(tripsFromDb => {
        tripsFromDb.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip._id; // Assuming '_id' is the identifier from the API
            option.textContent = trip.name || trip.title || 'Unnamed Trip';
            tripsSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Failed to load trips from the database:', error));

    // Handle selection changes
    tripsSelect.addEventListener('change', function() {
        localStorage.setItem('selectedTripId', this.value);
    });
}


function getTripId() {
    return localStorage.getItem('currentTripId');
}

function removeTrip() {
    const tripId = localStorage.getItem('selectedTripId'); // Assuming you store the trip ID upon selection

    if (!tripId) {
        console.error('No trip ID found');
        alert('Please select a trip to remove.');
        return;
    }

    // Perform the DELETE request
    fetch(`http://localhost:3001/trip/${tripId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to remove trip');
        }
        return response.json();
    })
    .then(data => {
        console.log('Trip removed:', data);
        alert('Trip successfully removed.');
        window.location.reload(); // Optionally reload the page or redirect
    })
    .catch(error => {
        console.error('Error removing trip:', error);
        alert('Failed to remove the trip. Please try again.');
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
