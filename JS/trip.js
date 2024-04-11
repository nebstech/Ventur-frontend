function saveTrip() {
    const tripName = document.getElementById('trip-name').value;
    const tripComment = document.getElementById('trip-comment').value;
    const tripImage = document.getElementById('trip-image').files[0];

    const formData = new FormData();
    formData.append('name', tripName);
    formData.append('comment', tripComment);
    if (tripImage) {
        formData.append('image', tripImage);
    }

    fetch('http://localhost:3000/trip', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Trip saved:', data);
        
        // Check if the data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
            // Assuming the first element is the newly created trip
            const trip = data[0];
            localStorage.setItem('currentTripId', trip._id);
            window.location.href = 'location.html'; // Redirect to the location page
        } else {
            throw new Error('No trip data received.');
        }
    })
    .catch(error => console.error('Error saving trip:', error));
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
