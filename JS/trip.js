const url = 'http://localhost:3000/api/data';

function saveTrip() {
  const form = document.getElementById('add-trip-form');
  const formData = new FormData(form);

  const tripData = {
      name: formData.get('name'), // Assuming you have a 'name' field in your form
      // other trip fields...
      location: {
          country: formData.get('country'), // Ensure you have 'country' input in your form
          state: formData.get('state'), // Ensure you have 'state' input in your form
          city: formData.get('city') // Ensure you have 'city' input in your form
      }
  };

  fetch('http://localhost:3000/trips/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
      credentials: 'include'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to add trip');
      }
      return response.json();
  })
  .then(data => {
      console.log('Trip added successfully', data);
      // Redirect or perform actions after successful trip creation
  })
  .catch(error => {
      console.error('Error adding trip:', error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.getElementById('home-button');
  const logoutButton = document.getElementById('logout-button');

  if (homeButton) {
      homeButton.addEventListener('click', () => {
          window.location.href = 'home.html'; // or whatever your home page's path is
      });
  }

  if (logoutButton) {
      logoutButton.addEventListener('click', logout);
  }
});

function logout() {
  fetch('http://localhost:3000/user/logout', {
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
