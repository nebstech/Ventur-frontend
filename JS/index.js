const url = 'http://localhost:3000/api/data/';

// // Use the fetch function to get data from the URL
fetch(url)
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response body
    return response.json();
  })
  .then(data => {
    // Log the data to the console
    console.log(data);
  })
  .catch(error => {
    // Log any errors to the console
    console.error('Fetch error:', error);
  });

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const username = formData.get('username');
      const password = formData.get('password');

      fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Login failed');
          }
          return response.json();
      })
      .then(data => {
        if (data.token) {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = 'home.html';  // Redirect to the homepage
        } else {
            console.log('Login successful but no token received:', data);
        }
    })
      .catch(error => {
          console.error(error);
      });
  });
});
