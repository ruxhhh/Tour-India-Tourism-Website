// EVENT HANDLING - only show welcome alert on home page
window.onload = function () {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    alert('Welcome to Tour India Website');
  }
};

// API INTEGRATION
fetch('https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true')
  .then((response) => response.json())
  .then((data) => {
    if (document.getElementById('weather')) {
      document.getElementById('weather').innerText =
        'Current Temperature: ' + data.current_weather.temperature + '°C';
    }
  });

// LOCAL STORAGE + DOM MANIPULATION
let total = localStorage.getItem('budget') ? parseInt(localStorage.getItem('budget')) : 0;

if (document.getElementById('total')) {
  document.getElementById('total').innerText = '₹' + total;
}

// EVENT HANDLING
function addBudget(price) {
  total = total + price;

  localStorage.setItem('budget', total);

  document.getElementById('total').innerText = '₹' + total;

  alert('Package Added!');
}

// CONFIRM BOOKING
function confirmBooking() {
  if (total == 0) {
    alert('Please select package');
  } else {
    alert('Booking Confirmed! Total Budget ₹' + total);

    total = 0;
    localStorage.removeItem('budget');

    document.getElementById('total').innerText = '₹0';
  }
}

// FORM VALIDATION + DYNAMIC INPUT
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  if (name == '' || email == '' || message == '') {
    alert('Please fill all fields');
    return;
  }

  if (!email.includes('@')) {
    alert('Invalid Email');
    return;
  }

  // LOCAL STORAGE
  let contactData = {
    name: name,
    email: email,
    message: message,
  };

  localStorage.setItem('contactData', JSON.stringify(contactData));

  alert('Thank you for contacting us!');
});
