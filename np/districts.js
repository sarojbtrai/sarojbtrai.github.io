// districts.js

// Fetch the districts JSON file from the current folder (np)
fetch('districts.json')
  .then(response => response.json())
  .then(data => {
    // Store the fetched data in a variable
    const districtsData = data;
    loadDistricts(districtsData);  // Load the districts after fetching data
  })
  .catch(error => console.error('Error loading districts:', error));

// Function to load district cards
function loadDistricts(districtsData) {
  const container = document.getElementById('districts-container');
  container.innerHTML = '';  // Clear any existing cards

  districtsData.forEach(district => {
    const card = document.createElement('div');
    card.className = 'district-card';
    card.innerHTML = `
      <h3 class="district-name">${district.name}</h3>
      <p class="district-description">Description of ${district.name}</p>
      <a href="${district.link}" class="card-link">View Details</a>
    `;
    container.appendChild(card);
  });
}

// Function to filter districts based on the search input
function filterDistricts() {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const filteredDistricts = districtsData.filter(district => {
    return district.name.toLowerCase().includes(searchQuery);
  });

  const container = document.getElementById('districts-container');
  container.innerHTML = '';  // Clear existing cards

  // Display the filtered results
  filteredDistricts.forEach(district => {
    const card = document.createElement('div');
    card.className = 'district-card';
    card.innerHTML = `
      <h3 class="district-name">${district.name}</h3>
      <p class="district-description">Description of ${district.name}</p>
      <a href="${district.link}" class="card-link">View Details</a>
    `;
    container.appendChild(card);
  });
}
