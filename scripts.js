document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const langSwitcher = document.getElementById('lang-switcher');

    // Highlight the active link based on the current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref || currentPage === linkHref.replace('.html', '-np.html')) {
            link.classList.add('active');
        }
    });

    menuButton.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && event.target !== menuButton) {
            sidebar.classList.remove('open');
        }
    });

    // Function to switch language
    function switchLanguage() {
        const currentLang = localStorage.getItem('language') || 'en';
        const newLang = currentLang === 'en' ? 'np' : 'en';
        console.log(`Switching from ${currentLang} to ${newLang}`);
        localStorage.setItem('language', newLang);
        updatePage(newLang);
    }

    // Function to update the page based on selected language
    function updatePage(language) {
        const pageUrl = window.location.href;
        if (language === 'np') {
            if (!pageUrl.includes('-np.html')) {
                window.location.href = pageUrl.replace('.html', '-np.html');
            }
        } else {
            if (pageUrl.includes('-np.html')) {
                window.location.href = pageUrl.replace('-np.html', '.html');
            }
        }
        // Update button text based on language
        const buttonText = language === 'en' ? 'NP' : 'EN';
        if (langSwitcher) langSwitcher.textContent = buttonText;
    }

    // Set up the language switcher button
    if (langSwitcher) {
        langSwitcher.addEventListener('click', switchLanguage);
    }

    // Load the saved language setting
    const savedLang = localStorage.getItem('language') || 'en';
    updatePage(savedLang);

    // Handle collapsible sections
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
