const url = `http://localhost:3000/locations/${encodeURIComponent(locationQuery)}/trips`;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const locationQuery = params.get('location');
  if (locationQuery) {
      searchTripsByLocation(locationQuery);
  }
});

const getAllTripsByLocation = async (req, res) => {
  try {
      const locationId = req.params.locationId;
      // Assuming you're looking for trips where the location includes an object with a specific ID
      const trips = await Trip.find({"location._id": locationId});
      if (!trips) {
          return res.status(404).json({error: 'No trips found for this location'});
      }
      res.json(trips);
  } catch (error) {
      console.error('Error fetching trips by location:', error);
      res.status(500).json({error: 'Error retrieving trips'});
  }
};

async function searchTripsByLocation(locationQuery) {
  try {
      const url = `http://localhost:3000/locations/${locationQuery}/trips`;  // Adjust the port if your backend is on a different one
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
          contentWrapper.id = 'content-wrapper';  // Consider using a class if multiple elements will share this ID

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
