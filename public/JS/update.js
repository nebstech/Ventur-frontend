document.addEventListener('DOMContentLoaded', function() {
  populateTripsSelect();
  const updateForm = document.getElementById('update-trip-form');
  if (updateForm) {
    updateForm.addEventListener('submit', function(event) {
      event.preventDefault();
      updateTrip();
    });
  }
});

function populateTripsSelect() {
  const tripsSelect = document.querySelector('.trip-select');
  tripsSelect.innerHTML = '<option value="" disabled selected>Select Trip</option>';

  fetch('https://coral-app-hed6u.ondigitalocean.app/api/trips') // Updated to correct API endpoint
  .then(response => {
    if (!response.ok) throw new Error('Failed to load trips from the database');
    return response.json();
  })
  .then(tripsFromDb => {
    tripsFromDb.forEach(trip => {
      const option = document.createElement('option');
      option.value = trip._id;
      option.textContent = trip.name || trip.title || 'Unnamed Trip';
      tripsSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Failed to load trips from the database:', error);
    alert('Failed to load trips. Please check your network or contact admin.');
  });
}

function updateTrip() {
  const tripsSelect = document.querySelector('.trip-select');
  const tripId = tripsSelect.value;
  if (!tripId) {
    alert("Please select a trip to update.");
    return;
  }

  const tripName = document.getElementById('trip-name').value;
  const tripComment = document.getElementById('trip-comment').value; // Ensure you have an input with id="trip-comment"

  fetch(`https://coral-app-hed6u.ondigitalocean.app/api/trips/${tripId}`, { // Updated to correct API endpoint
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: tripName,
      comment: tripComment
    })
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to update trip');
    alert('Trip updated successfully!');
    return response.json();
  })
  .then(updatedTrip => {
    console.log('Updated trip:', updatedTrip);
    // Optionally, refresh the list or update the UI accordingly
    populateTripsSelect(); // Refresh the trips select to show updated data
  })
  .catch(error => {
    console.error('Error updating trip:', error);
    alert('Failed to update trip. Please try again.');
  });
}
