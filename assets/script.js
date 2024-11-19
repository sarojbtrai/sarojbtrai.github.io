document.addEventListener('DOMContentLoaded', () => {
  const enBtn = document.getElementById('en-btn');
  const npBtn = document.getElementById('np-btn');
  const homeBtn = document.getElementById('home-btn');
  const backBtn = document.getElementById('back-btn');
  const cards = document.querySelectorAll('.card');

  const currentUrl = window.location.href;
  const isNepali = currentUrl.includes('/np/');  // Check if the URL contains /np/ (Nepali)
  const isEnglish = currentUrl.includes('/en/');  // Check if the URL contains /en/ (English)

  // Set active button on load based on the current URL
  if (isNepali) {
    npBtn.classList.add('active');
    enBtn.classList.remove('active');
  } else if (isEnglish) {
    enBtn.classList.add('active');
    npBtn.classList.remove('active');
  }

  // Language switching event listeners
  enBtn.addEventListener('click', () => switchLanguage('EN'));
  npBtn.addEventListener('click', () => switchLanguage('NP'));

  function switchLanguage(language) {
    let newUrl = currentUrl;

    // Switch the language based on the current URL folder (/np/ or /en/)
    if (language === 'EN' && isNepali) {
      newUrl = currentUrl.replace('/np/', '/en/');  // Switch from Nepali to English
    } else if (language === 'NP' && isEnglish) {
      newUrl = currentUrl.replace('/en/', '/np/');  // Switch from English to Nepali
    }

    // Redirect to the new language-specific URL
    window.location.href = newUrl;
  }

  // Home button redirection based on language
  homeBtn.addEventListener('click', () => {
    const homepage = isNepali ? '/np/index.html' : '/en/index.html';
    window.location.href = homepage;  // Redirect to the correct home page based on the language
  });

  // Back button functionality to go back in the browser history
  backBtn.addEventListener('click', () => {
    history.back();
  });

  // Update the text on the page based on selected language
  function updateText(language) {
    const elementsWithTranslations = document.querySelectorAll('[data-en][data-np]');
    elementsWithTranslations.forEach(element => {
      if (language === 'EN') {
        element.textContent = element.getAttribute('data-en');  // Set English text
      } else {
        element.textContent = element.getAttribute('data-np');  // Set Nepali text
      }
    });
  }

  // Event listener for language toggle
  enBtn.addEventListener('click', () => {
    npBtn.classList.remove('active');
    enBtn.classList.add('active');
    updateText('EN');  // Update page text to English
  });

  npBtn.addEventListener('click', () => {
    enBtn.classList.remove('active');
    npBtn.classList.add('active');
    updateText('NP');  // Update page text to Nepali
  });
});
