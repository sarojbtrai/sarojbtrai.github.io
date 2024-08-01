document.addEventListener('DOMContentLoaded', function() {
    const province1Input = document.getElementById('province1');
    const province2Input = document.getElementById('province2');
    const compareButton = document.getElementById('compare-button');
    const comparisonResults = document.getElementById('comparison-results');
    const comparisonTableBody = document.getElementById('comparison-table-body');
    const suggestionsProvince1 = document.getElementById('suggestions-province1');
    const suggestionsProvince2 = document.getElementById('suggestions-province2');
    const province1Header = document.getElementById('province1-header');
    const province2Header = document.getElementById('province2-header');

    let provinces = {};

    async function loadProvinces() {
        try {
            const response = await fetch('provinces.json');
            const data = await response.json();
            provinces = data; // Load all provinces data
            return Object.keys(provinces); // Return the list of province names
        } catch (error) {
            console.error('Error loading provinces:', error);
            alert('Error loading provinces data.');
            return [];
        }
    }

    async function createSuggestionBox(input, suggestionsContainer) {
        const provinceNames = await loadProvinces();

        input.addEventListener('focus', function() {
            showSuggestions(this, provinceNames, suggestionsContainer);
        });

        input.addEventListener('input', function() {
            showSuggestions(this, provinceNames, suggestionsContainer);
        });
    }

    function showSuggestions(input, provinceNames, suggestionsContainer) {
        const value = input.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (value) {
            provinceNames.filter(name => name.toLowerCase().includes(value)).forEach(name => {
                const suggestion = document.createElement('div');
                suggestion.textContent = name;
                suggestion.classList.add('suggestion-item');
                suggestion.addEventListener('click', function() {
                    input.value = name;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestion);
            });
        }
    }

    createSuggestionBox(province1Input, suggestionsProvince1);
    createSuggestionBox(province2Input, suggestionsProvince2);

    compareButton.addEventListener('click', async function() {
        const province1 = province1Input.value.trim();
        const province2 = province2Input.value.trim();

        if (provinces[province1] && provinces[province2]) {
            comparisonTableBody.innerHTML = ''; // Clear previous results

            // Update headers with selected province names
            province1Header.textContent = province1;
            province2Header.textContent = province2;

            // Get all metrics from both provinces
            const province1Data = provinces[province1];
            const province2Data = provinces[province2];
            const allMetrics = new Set([...Object.keys(province1Data), ...Object.keys(province2Data)]);

            allMetrics.forEach(metric => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${province1Data[metric] || 'N/A'}</td>
                    <td>${metric}</td>
                    <td>${province2Data[metric] || 'N/A'}</td>
                `;
                comparisonTableBody.appendChild(row);
            });

            comparisonResults.style.display = 'block';
        } else {
            alert('Please select valid provinces.');
        }
    });
});
