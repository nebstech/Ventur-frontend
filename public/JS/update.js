document.addEventListener('DOMContentLoaded', function() {
  populateTripsSelect();
  const updateForm = document.getElementById('update-trip-form');
  updateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    updateTrip();
  });
});

function populateTripsSelect() {
  const tripsSelect = document.querySelector('.trip-select');
  tripsSelect.innerHTML = '<option value="" disabled selected>Select Trip</option>'; // Make 'Select Trip' not selectable

  fetch('https://coral-app-hed6u.ondigitalocean.app/trip')
  .then(response => response.json())
  .then(tripsFromDb => {
    tripsFromDb.forEach(trip => {
      const option = document.createElement('option');
      option.value = trip._id;
      option.textContent = trip.name || trip.title || 'Unnamed Trip';
      tripsSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Failed to load trips from the database:', error));
}

function updateTrip() {
  const tripsSelect = document.querySelector('.trip-select');
  const tripId = tripsSelect.value;
  const tripName = document.getElementById('trip-name').value;
  const tripComment = document.getElementById('trip-comment').value; // Ensure you have an input with id="trip-comment"

  fetch(`https://coral-app-hed6u.ondigitalocean.app/trip/${tripId}`, {
      method: 'PATCH',  // Changed from 'PUT' to 'PATCH' to match your Express setup
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: tripName,
          comment: tripComment  // Make sure the server expects a 'comment' field in the payload
      })
  })
  .then(response => {
      if (!response.ok) throw new Error('Failed to update trip');
      alert('Trip updated successfully!');
      return response.json();
  })
  .catch(error => {
      console.error('Error updating trip:', error);
      alert('Failed to update trip. Please try again.');
  });
}



















// document.addEventListener('DOMContentLoaded', function() {
//   const updateButton = document.querySelector('.update-done');
//   if (updateButton) {
//       updateButton.addEventListener('click', updateTrip);
//   }

//   populateTripsSelect();
// });

// function updateTrip() {
//     const tripSelect = document.querySelector('.trip-select');
//     const tripId = tripSelect.value; // Get the selected trip ID
//     if (!tripId) {
//         alert("Please select a trip to update.");
//         return;
//     }

//     // Assuming you have input fields for updating trip details
//     const tripName = document.getElementById('trip-name').value; // Example for trip name update

//     fetch(`https://coral-app-hed6u.ondigitalocean.app/trip/${tripId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: tripName // Update this part according to your trip model and what you want to update
//         })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Failed to update trip.');
//     })
//     .then(updatedTrip => {
//         console.log('Updated trip:', updatedTrip);
//         alert('Trip updated successfully!');
//         // Optionally, refresh the list or update the UI accordingly
//     })
//     .catch(error => {
//         console.error('Error updating trip:', error);
//         alert('Error updating trip. Please try again.');
//     });
// }


// function loadTripDetails(tripId) {
//   if (!tripId) return; // Exit if no trip is selected

//   fetch(`https://coral-app-hed6u.ondigitalocean.app/trip/${tripId}`)
//   .then(response => response.json())
//   .then(trip => {
//       document.getElementById('trip-name').value = trip.name; // Assuming 'name' is a field you want to update
//   })
//   .catch(error => console.error('Failed to load trip details:', error));
// }

// function populateTripsSelect() {
//   const tripsSelect = document.querySelector('.trip-select');
//   tripsSelect.innerHTML = '<option value="" disabled selected>Select Trip</option>'; // Improved default option

//   // Load local trips
//   const localTrips = JSON.parse(localStorage.getItem('trips'));
//   if (localTrips) {
//       localTrips.forEach(trip => {
//           addOptionToSelect(trip.id, trip.name, tripsSelect);
//       });
//   }

//   // Fetch trips from the database
//   fetch('https://coral-app-hed6u.ondigitalocean.app/trip')
//   .then(response => {
//       if (!response.ok) throw new Error('Failed to fetch trips');
//       return response.json();
//   })
//   .then(tripsFromDb => {
//       if (tripsFromDb.length === 0 && (!localTrips || localTrips.length === 0)) {
//           addOptionToSelect('', 'No trips available', tripsSelect);
//       } else {
//           tripsFromDb.forEach(trip => {
//               addOptionToSelect(trip._id, trip.name || trip.title || 'Unnamed Trip', tripsSelect);
//           });
//       }
//   })
//   .catch(error => {
//       console.error('Failed to load trips from the database:', error);
//       addOptionToSelect('', 'Failed to load trips', tripsSelect);
//   });
// }

// function addOptionToSelect(value, text, selectElement) {
//   const option = document.createElement('option');
//   option.value = value;
//   option.textContent = text;
//   selectElement.appendChild(option);
// }
