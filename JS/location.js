function loadCountries() {
    fetch('http://localhost:3000/locations')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.querySelector('.country');
            countrySelect.innerHTML = '<option selected>Select Country</option>';
            data.forEach(country => {
                const option = new Option(country, country);
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading countries:', error));
}

function loadStates(country) {
    fetch(`http://localhost:3000/locations?country=${country}`)
        .then(response => response.json())
        .then(states => {
            const stateSelect = document.querySelector('.state');
            stateSelect.innerHTML = '<option selected>Select State</option>';
            states.forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
            });

            stateSelect.addEventListener('change', () => {
                const selectedState = stateSelect.value;
                loadCities(selectedState);
            });
        })
        .catch(error => console.error('Error loading states:', error));
}

function loadCities(state) {
    const countrySelect = document.querySelector('.country');
    const country = countrySelect.value;
    fetch(`http://localhost:3000/locations?country=${country}&state=${state}`)
        .then(response => response.json())
        .then(cities => {
            const citySelect = document.querySelector('.city');
            citySelect.innerHTML = '<option selected>Select City</option>';
            cities.forEach(city => {
                const option = new Option(city, city);
                citySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading cities:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadCountries();
    document.querySelector('.country').addEventListener('change', function() {
        loadStates(this.value);
    });
});

function saveLocation() {
    const countrySelect = document.querySelector('.country');
    const stateSelect = document.querySelector('.state');
    const citySelect = document.querySelector('.city');
    const tripId = localStorage.getItem('currentTripId');

    console.log('Trip ID:', tripId); // Debugging to see the trip ID value

    if (!countrySelect) {
        console.error('Country select dropdown is missing');
        return;
    }
    if (!stateSelect) {
        console.error('State select dropdown is missing');
        return;
    }
    if (!citySelect) {
        console.error('City select dropdown is missing');
        return;
    }
    if (!tripId) {
        console.error('No trip ID found');
        return;
    }

    const locationData = {
        country: countrySelect.value,
        state: stateSelect.value,
        city: citySelect.value,
        tripId: tripId
    };

    console.log('Sending location data:', locationData); // Check what data is being sent

    fetch(`http://localhost:3000/trip/${tripId}/location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationData)
    })
    .then(response => {
        console.log('Response status:', response.status); // Check the response status
        if (!response.ok) {
            throw new Error(`Failed to save location, status code: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Location added to trip:', data);
        window.location.href = 'home.html'; // Redirect to the homepage
    })
    .catch(error => {
        console.error('Error saving location:', error);
    });
}
