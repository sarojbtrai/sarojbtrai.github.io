// Global variable to store fetched country data
let countriesList = [];

// Fetch countries data from JSON file
function fetchCountries() {
    return fetch('countries.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch countries data');
            }
            return response.json();
        })
        .then(data => {
            countriesList = data.countries.map(country => ({
                ...country,
                Population: typeof country.Population === 'string' ? parseInt(country.Population.replace(/,/g, '')) : country.Population,
                GDP: typeof country.GDP === 'string' ? parseInt(country.GDP.replace(/,/g, '')) : country.GDP,
                Area: typeof country.Area === 'string' ? parseInt(country.Area.replace(/,/g, '')) : country.Area
            }));
            populateDataList();
            checkURLParams();
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

// Populate the datalist for country suggestions
function populateDataList() {
    const dataList = document.getElementById('countriesList');
    countriesList.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        dataList.appendChild(option);
    });
}

// Update suggestions in datalist based on user input
function updateSuggestions(event) {
    const input = event.target;
    const dataList = document.getElementById('countriesList');
    dataList.innerHTML = '';
    const value = input.value.trim().toLowerCase();
    const filteredCountries = countriesList.filter(country => country.name.toLowerCase().includes(value));
    filteredCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        dataList.appendChild(option);
    });
}

// Compare selected countries and display comparison table
function compareCountries() {
    const country1Input = document.getElementById('country1').value.trim();
    const country2Input = document.getElementById('country2').value.trim();

    const countryData1 = countriesList.find(c => c.name.toLowerCase() === country1Input.toLowerCase());
    const countryData2 = countriesList.find(c => c.name.toLowerCase() === country2Input.toLowerCase());

    if (!countryData1 || !countryData2) {
        document.getElementById('comparisonText').innerText = 'One or both countries not found.';
        document.getElementById('comparisonTable').style.display = 'none';
        document.getElementById('country1Flag').style.display = 'none';
        document.getElementById('country2Flag').style.display = 'none';
        return;
    }

    document.getElementById('comparisonText').innerText = `${countryData1.name} vs ${countryData2.name}`;
    document.getElementById('comparisonTable').style.display = 'table';

    document.getElementById('country1Header').innerText = countryData1.name;
    document.getElementById('country2Header').innerText = countryData2.name;

    const tableBody = document.querySelector('#comparisonTable tbody');
    tableBody.innerHTML = '';

    const metrics = ['Population', 'GDP', 'Area', 'Capital'];

    metrics.forEach(metric => {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = formatNumber(countryData1[metric]);
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = metric;
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = formatNumber(countryData2[metric]);
        row.appendChild(cell3);

        tableBody.appendChild(row);
    });

    updateStructuredData(countryData1.name, countryData2.name, countryData1, countryData2);
    displayFlags(countryData1.name, countryData2.name);
}

// Function to format numbers with commas for thousand separators
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display flags of the compared countries
function displayFlags(country1, country2) {
    const country1Flag = document.getElementById('country1Flag');
    const country2Flag = document.getElementById('country2Flag');

    country1Flag.src = `flag/${country1.toLowerCase().replace(/ /g, '-')}.png`;
    country2Flag.src = `flag/${country2.toLowerCase().replace(/ /g, '-')}.png`;

    country1Flag.style.display = 'block';
    country2Flag.style.display = 'block';
}

// Update JSON-LD structured data for SEO
function updateStructuredData(country1, country2, countryData1, countryData2) {
    const structuredDataElement = document.getElementById('structuredData');
    const structuredData = JSON.parse(structuredDataElement.textContent);

    structuredData.mainEntity.itemListElement = [
        {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@type": "Country",
                "name": country1,
                "population": countryData1.Population,
                "GDP": countryData1.GDP,
                "Area": countryData1.Area,
                "capital": countryData1.Capital
            }
        },
        {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@type": "Country",
                "name": country2,
                "population": countryData2.Population,
                "GDP": countryData2.GDP,
                "Area": countryData2.Area,
                "capital": countryData2.Capital
            }
        }
    ];

    structuredDataElement.textContent = JSON.stringify(structuredData, null, 2);
}

// Function to get URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        country1: params.get('country1'),
        country2: params.get('country2')
    };
}

// Check URL parameters and compare countries if present
function checkURLParams() {
    const { country1, country2 } = getURLParams();
    if (country1 && country2) {
        document.getElementById('country1').value = country1;
        document.getElementById('country2').value = country2;
        compareCountries();
    }
}

// Event listeners
document.getElementById('compareButton').addEventListener('click', compareCountries);
document.getElementById('country1').addEventListener('input', updateSuggestions);
document.getElementById('country2').addEventListener('input', updateSuggestions);

// Fetch countries data when the page loads
fetchCountries();
