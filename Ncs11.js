// ==UserScript==
// @name         Navbar Icon Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds an icon shortcut to the navbar that opens a website in a new tab
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the navbar to load
    function addIconShortcut() {
        // Select the navbar using the specific class
        const navbar = document.querySelector('.css-1n9ux6q');

        if (navbar) {
            // Check if icon already exists to avoid duplication
            if (navbar.querySelector('.icon-shortcut')) return;

            // Create the icon shortcut button
            const iconButton = document.createElement('button');
            iconButton.className = 'icon-shortcut';
            iconButton.innerHTML = '<i style="font-size: 18px; cursor: pointer;">🔗</i>'; // Simple link icon emoji

            // Set up the click event to open a new tab
            iconButton.addEventListener('click', function() {
                window.open("https://yourwebsite.com", "_blank"); // Replace with desired URL
            });

            // Style the button
            iconButton.style.background = 'none';
            iconButton.style.border = 'none';
            iconButton.style.cursor = 'pointer';
            iconButton.style.marginRight = '10px';
            iconButton.style.display = 'inline-flex';
            iconButton.style.alignItems = 'center';

            // Insert the icon button before the search bar
            const searchBar = navbar.querySelector('input[type="text"]');
            if (searchBar) {
                navbar.insertBefore(iconButton, searchBar);
                console.log("Icon shortcut added to navbar.");
            }
        } else {
            console.log("Navbar not found.");
        }
    }

    // Observe for changes in the DOM to dynamically add the icon when the navbar loads
    const observer = new MutationObserver(addIconShortcut);
    observer.observe(document.body, { childList: true, subtree: true });

    // Run once in case the navbar is already loaded
    addIconShortcut();
})();
