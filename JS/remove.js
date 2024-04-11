
document.addEventListener('DOMContentLoaded', function() {
  const removeButton = document.querySelector('.rmv-done');
  if (removeButton) {
      removeButton.addEventListener('click', removeTrip);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  populateTripsSelect();
});

function populateTripsSelect() {
  const tripsSelect = document.querySelector('.trip-select');
  
  // Clear existing options
  tripsSelect.innerHTML = '<option selected>Select Trip</option>';

  // Load trips from local storage
  const localTrips = JSON.parse(localStorage.getItem('trips')); // Assuming 'trips' is the key for trips in local storage

  if (localTrips) {
      localTrips.forEach(trip => {
          const option = document.createElement('option');
          option.value = trip.id;
          option.textContent = trip.name;
          tripsSelect.appendChild(option);
      });
  }

  // Fetch trips from the database
  fetch('http://localhost:3000/trip') // Adjust the URL to your actual API endpoint
      .then(response => response.json())
      .then(tripsFromDb => {
          tripsFromDb.forEach(trip => {
              const option = document.createElement('option');
              option.value = trip._id; // Assuming your trip objects have an _id field
              option.textContent = trip.name; // Assuming your trip objects have a name field
              tripsSelect.appendChild(option);
          });
      })
      .catch(error => console.error('Failed to load trips from the database:', error));
}


function getTripId() {
  // Example of getting the trip ID from local storage
  return localStorage.getItem('currentTripId');
}

function removeTrip() {
  const tripId = getTripId();
  if (!tripId) {
      console.error('No trip ID found');
      return;
  }

  fetch(`http://localhost:3000/trip/${tripId}`, {
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
      // Redirect to the home page after successful deletion
      window.location.href = 'home.html';
  })
  .catch(error => {
      console.error('Error removing trip:', error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  populateTripsSelect();
});


