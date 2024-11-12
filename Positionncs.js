// ==UserScript==
// @name         Navbar NCS Link Left to Input
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a "NCS" text link to the left of the input box in the navbar
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add NCS link to the left of the input box
    function addNCSLink() {
        // Select the navbar using a common class (adjust based on your navbar's structure)
        const navbar = document.querySelector('.css-1n9ux6q'); // Adjust the class if needed

        if (navbar) {
            // Find the input box inside the navbar (adjust the selector if needed)
            const searchBar = navbar.querySelector('input[type="text"]');

            if (searchBar) {
                // Check if NCS link already exists to avoid duplication
                if (navbar.querySelector('.ncs-link')) return;

                // Create the NCS link
                const ncsLink = document.createElement('a');
                ncsLink.className = 'ncs-link';
                ncsLink.textContent = 'NCS';  // The plain text
                ncsLink.href = 'https://yourdesiredwebsite.com';  // Replace with your desired website
                ncsLink.target = '_blank';  // Open in a new tab

                // Style the link (optional)
                ncsLink.style.fontSize = '16px';
                ncsLink.style.marginRight = '10px'; // Space between NCS link and search bar
                ncsLink.style.color = '#000';  // Adjust color as needed
                ncsLink.style.textDecoration = 'none';
                ncsLink.style.display = 'inline-block'; // Ensure it's inline with the input box

                // Insert the NCS link before the search bar (left of it)
                navbar.insertBefore(ncsLink, searchBar);
                console.log("NCS link added to the left of the input box.");
            } else {
                console.log("Search bar not found.");
            }
        } else {
            console.log("Navbar not found.");
        }
    }

    // Observe for changes in the DOM to dynamically add the link when the navbar loads
    const observer = new MutationObserver(addNCSLink);
    observer.observe(document.body, { childList: true, subtree: true });

    // Run once in case the navbar is already loaded
    addNCSLink();
})();
