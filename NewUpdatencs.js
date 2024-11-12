// ==UserScript==
// @name         Navbar NCS Link
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a "NCS" text link to the navbar
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add NCS text link to the navbar
    function addNCSLink() {
        // Select the navbar using a common class (you can adjust this selector based on your website's structure)
        const navbar = document.querySelector('.css-1n9ux6q'); // Adjust the class if needed

        if (navbar) {
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
            ncsLink.style.marginLeft = '10px';
            ncsLink.style.color = '#000';  // Adjust color as needed
            ncsLink.style.textDecoration = 'none';

            // Insert the NCS link into the navbar
            navbar.appendChild(ncsLink);
            console.log("NCS link added to navbar.");
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
