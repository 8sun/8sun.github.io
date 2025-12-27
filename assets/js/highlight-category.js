document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const links = nav.querySelectorAll('a');

    // Get the full pathname to detect category from URL structure
    let currentPath = window.location.pathname;
    let currentCategory = null;

    console.log(`Current path: ${currentPath}`);

    // Check if we're on a paginated category page (e.g., /site/poetry/2/index.html)
    const paginatedMatch = currentPath.match(/\/([^\/]+)\/\d+\/index\.html$/);
    if (paginatedMatch) {
        currentCategory = paginatedMatch[1]; // Extract category name (e.g., "poetry")
        console.log(`Detected paginated category: ${currentCategory}`);
    } else {
        // For regular pages, get the filename
        let currentUrl = currentPath.split('/').pop().toLowerCase();
        if (!currentUrl || currentUrl === '' || currentUrl === '/') {
            currentUrl = 'index.html';
        }

        // Extract base category name (remove trailing digits)
        let baseUrl = currentUrl.replace(/(\d+)(?=\.html$)/, '');

        if (baseUrl === 'index.html') {
            currentCategory = 'home';
        } else {
            currentCategory = baseUrl.replace('.html', '');
        }
        console.log(`Detected regular page category: ${currentCategory}`);
    }

    links.forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;

        let linkCategory = null;
        let linkText = link.textContent.trim().toLowerCase();

        // Determine what category this link represents
        if (linkText === 'home' || href.includes('index.html')) {
            linkCategory = 'home';
        } else {
            // Extract category from href filename
            let hrefFile = href.split('/').pop().toLowerCase();
            linkCategory = hrefFile.replace('.html', '');
        }

        console.log(`Link category: ${linkCategory}, Current category: ${currentCategory}`);

        // Highlight if categories match
        if (currentCategory === linkCategory) {
            link.classList.add('active-category');
            console.log(`Highlighted: ${linkText}`);
        }
    });
});
