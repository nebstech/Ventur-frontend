document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Correctly scope username and password variables inside the event listener
          const formData = new FormData(registerForm);
          const username = formData.get('username');  // Ensure this matches the name attribute of your form input
          const password = formData.get('password');  // Same here

          // Proceed with the fetch request...
            fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
            },
              body: JSON.stringify({ username, password })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Registration failed');
              }
              return response.json();
          })
          .then(data => {
              console.log('Registration successful:', data);
              window.location.href = '/home.html'; // Redirect on successful registration
          })
          .catch(error => {
              console.error('Registration error:', error);
          });
      });
  } else {
      console.log('Register form not found');
  }
});
