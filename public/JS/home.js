const url = 'https://coral-app-hed6u.ondigitalocean.app/api/data'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form'); // Make sure your form has this ID
  const input = document.getElementById('location-search');

  form.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent the form from submitting traditionally
      const locationQuery = input.value.trim();
      if (locationQuery) {
          // Redirect to the search results page with the query parameter
          window.location.href = `search.html?location=${encodeURIComponent(locationQuery)}`;
      }
  });
});

async function searchTripsByLocation(locationQuery) {
  try {
      const url = `http://localhost:3001/locations/${locationQuery}/trips`;  // Adjust the port if your backend is on a different one
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

document.addEventListener('DOMContentLoaded', function() {
  fetchTrips();
});

function fetchTrips() {
  fetch('https://coral-app-hed6u.ondigitalocean.app/api/trips')  // Adjust the URL to match your server setup
      .then(response => response.json())
      .then(trips => displayTrips(trips))
      .catch(error => console.error('Failed to load trips:', error));
}

function displayTrips(trips) {
  const tripsList = document.getElementById('trip-list');
  tripsList.innerHTML = ''; // Clear previous content

  if (!Array.isArray(trips)) {
      console.error('Expected an array of trips, received:', trips);
      return; // Exit the function if trips is not an array
  }

  trips.forEach(trip => {
      const tripEntry = document.createElement('div');
      tripEntry.className = 'trip-entry';
      tripEntry.innerHTML = `
          <h3>${trip.name}</h3>
          <p><strong>Location:</strong> ${formatLocation(trip.location)}</p>
          <p><strong>Comment:</strong> ${trip.comments}</p>  
      `;

      tripsList.appendChild(tripEntry);
  });
}




function formatLocation(locationArray) {
  return locationArray.map(loc => `${loc.city}, ${loc.state}, ${loc.country}`).join(' | ');
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

// function loadTrips() {
//   fetch('https://coral-app-hed6u.ondigitalocean.app/trip', { credentials: 'include' }) 
//       .then(response => response.json())
//       .then(trips => {
//           console.log(trips); // Process and display trips on the home page
//       })
//       .catch(error => console.error('Failed to load trips:', error));
// }

// document.addEventListener('DOMContentLoaded', loadTrips);
