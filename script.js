// Handling the search form submission on the home page (index.html)
document.getElementById('searchForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect form data
  const destination = document.getElementById('destination').value.trim();
  const checkInDate = document.getElementById('checkInDate').value;
  const checkOutDate = document.getElementById('checkOutDate').value;
  const travelType = document.getElementById('travelType').value;

  // Redirect to search results page with query parameters
  window.location.href = `search.html?destination=${encodeURIComponent(destination)}&checkIn=${encodeURIComponent(checkInDate)}&checkOut=${encodeURIComponent(checkOutDate)}&type=${encodeURIComponent(travelType)}`;
});

// Load results on search.html
document.addEventListener('DOMContentLoaded', function() {
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
      const urlParams = new URLSearchParams(window.location.search);
      const destination = urlParams.get('destination');
      const type = urlParams.get('type');

      // Fetch mock data
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              const filteredResults = data[type].filter(item => item.destination.toLowerCase().includes(destination.toLowerCase()));

              if (filteredResults.length > 0) {
                  filteredResults.forEach(item => {
                      const resultItem = document.createElement('div');
                      resultItem.className = 'result-item';
                      resultItem.innerHTML = `
                          <h3>${item.name}</h3>
                          <p>${item.description}</p>
                          <p>Price: $${item.price}</p>
                          <button onclick="viewDetails('${item.id}', '${type}')">View Details</button>
                      `;
                      resultsSection.appendChild(resultItem);
                  });
              } else {
                  resultsSection.innerHTML = '<p>No results found.</p>';
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  }
});

// Redirect to details page with ID and type
function viewDetails(id, type) {
  window.location.href = `details.html?id=${id}&type=${type}`;
}

// Load details on details.html
document.addEventListener('DOMContentLoaded', function() {
  const detailsSection = document.getElementById('details');
  if (detailsSection) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const type = urlParams.get('type');

      // Fetch mock data
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              const item = data[type].find(item => item.id === id);
              if (item) {
                  detailsSection.innerHTML = `
                      <h3>${item.name}</h3>
                      <p>${item.description}</p>
                      <p>Price: $${item.price}</p>
                  `;

                  const bookNowBtn = document.getElementById('bookNowBtn');
                  bookNowBtn.addEventListener('click', function() {
                      window.location.href = `booking.html?id=${item.id}&type=${type}`;
                  });
              } else {
                  detailsSection.innerHTML = '<p>Details not found.</p>';
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  }
});

// Load booking form on booking.html
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const type = urlParams.get('type');

      // Fetch mock data to display booking item details (if necessary)
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              const item = data[type].find(item => item.id === id);
              if (item) {
                  // You can display the item details on the booking page if desired
                  // For simplicity, this is omitted, but you could add:
                  // document.getElementById('bookingDetails').innerHTML = `<p>Booking: ${item.name}</p>`;
              }
          })
          .catch(error => console.error('Error fetching data:', error));

      // Handle booking form submission
      bookingForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Collect booking form data
          const fullName = document.getElementById('fullName').value.trim();
          const email = document.getElementById('email').value.trim();
          const phone = document.getElementById('phone').value.trim();
          const paymentMethod = document.getElementById('paymentMethod').value;

          if (fullName && email && phone) {
              // Redirect to confirmation page with user details
              window.location.href = `confirmation.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
          } else {
              alert('Please fill in all required fields.');
          }
      });
  }
});

// Load confirmation data on confirmation.html
document.addEventListener('DOMContentLoaded', function() {
  const confirmationSection = document.getElementById('confirmation');
  if (confirmationSection) {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');
      const email = urlParams.get('email');

      confirmationSection.innerHTML = `
          <h2>Thank you, ${name}!</h2>
          <p>Your booking details have been sent to ${email}.</p>
      `;
  }
});
