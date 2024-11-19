// Define different ad content options
const ads = {
    "ad-1": {
        "type": "text",  // Type can be 'text' or 'image'
        "content": "<p>Huge Discounts Available! Visit our store now!</p>",  // For text ads
        "imageSrc": "path/to/ad-image1.jpg",  // For image ads
        "altText": "Ad 1",  // Alt text for image ads
    },
    "ad-2": {
        "type": "image",
        "content": "",  // No content for image ads
        "imageSrc": "path/to/ad-image2.jpg",
        "altText": "Ad 2",
    }
};

// Default ad (can change this logic as needed)
let currentAd = "ad-1";  // This can be dynamically updated based on different factors

// Function to load the ad content into the HTML page
function loadAd() {
    const adContainer = document.getElementById('bigyapan');  // Changed ID to 'bigyapan'

    // Clear any previous content
    adContainer.innerHTML = '';

    // Check the ad type and inject the appropriate content
    if (ads[currentAd].type === "text") {
        adContainer.innerHTML = ads[currentAd].content;  // Inject text content
    } else if (ads[currentAd].type === "image") {
        const img = document.createElement('img');
        img.src = ads[currentAd].imageSrc;
        img.alt = ads[currentAd].altText;
        adContainer.appendChild(img);  // Inject image
    }
}

// Call the loadAd function when the page is loaded
document.addEventListener('DOMContentLoaded', loadAd);
