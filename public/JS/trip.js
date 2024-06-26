function loadCountries() {
    fetch('https://coral-app-hed6u.ondigitalocean.app/locations') // Use HTTP when working locally unless you have HTTPS set up
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
    fetch(`https://coral-app-hed6u.ondigitalocean.app/locations?country=${encodeURIComponent(country)}`)
        .then(response => response.json())
        .then(data => {
            const stateSelect = document.querySelector('.state');
            stateSelect.innerHTML = '<option selected>Select State</option>';
            data.forEach(state => {
                const option = new Option(state, state);
                stateSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading states:', error));
}

function loadCities(country, state) {
    fetch(`https://coral-app-hed6u.ondigitalocean.app/locations?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}`)
        .then(response => response.json())
        .then(data => {
            const citySelect = document.querySelector('.city');
            citySelect.innerHTML = '<option selected>Select City</option>';
            data.forEach(city => {
                const option = new Option(city, city);
                citySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading cities:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadCountries();
    const countrySelect = document.querySelector('.country');
    const stateSelect = document.querySelector('.state');
    const form = document.getElementById('add-trip-form');
    const homeButton = document.getElementById('home-button');
    const logoutButton = document.getElementById('logout-button');

    countrySelect.addEventListener('change', function() {
        loadStates(this.value);
    });

    stateSelect.addEventListener('change', function() {
        const country = countrySelect.value;
        loadCities(country, this.value);
    });

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'home.html'; // or your home page URL
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch('https://coral-app-hed6u.ondigitalocean.app/trip', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to save trip');
            }
            const data = await response.json();
            if (data && data._id) {
                localStorage.setItem('currentTripId', data._id);
                window.location.href = 'home.html'; // or your success page URL
            } else {
                throw new Error('Trip ID is missing in the response.');
            }
        } catch (error) {
            console.error('Error saving trip:', error);
        }
    });
});

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
