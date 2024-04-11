const url = 'http://localhost:3000/api/data';

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