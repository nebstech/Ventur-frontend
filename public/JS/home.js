document.addEventListener('DOMContentLoaded', () => {
  fetchTrips();
  setupSearchForm();
});

function fetchTrips() {
  fetch('https://coral-app-hed6u.ondigitalocean.app/api/trips')
      .then(response => response.json())
      .then(trips => displayTrips(trips))
      .catch(error => {
          console.error('Failed to load trips:', error);
          const tripsList = document.getElementById('trip-list');
          tripsList.innerHTML = '<p>Error loading trips.</p>';
      });
}

function displayTrips(trips) {
  const tripsList = document.getElementById('trip-list');
  tripsList.innerHTML = ''; // Clear previous content

  trips.forEach(trip => {
      const tripEntry = document.createElement('div');
      tripEntry.className = 'trip-entry';
      tripEntry.innerHTML = `
          <h3>${trip.name}</h3>
          <p><strong>Location:</strong> ${formatLocation(trip.location)}</p>
          <p><strong>Comment:</strong> ${trip.comments || 'No comments'}</p>
      `;
      tripsList.appendChild(tripEntry);
  });
}

function formatLocation(locationArray) {
  return locationArray.map(loc => `${loc.city}, ${loc.state}, ${loc.country}`).join(' | ');
}

function setupSearchForm() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('location-search');

  if (form && input) {
      form.addEventListener('submit', (event) => {
          event.preventDefault();
          const locationQuery = input.value.trim();
          if (locationQuery) {
              window.location.href = `search.html?location=${encodeURIComponent(locationQuery)}`;
          }
      });
  } else {
      console.error("Search form or input not found in the DOM");
  }
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
      window.location.href = 'index.html';
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
