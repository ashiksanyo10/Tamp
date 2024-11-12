// ==UserScript==
// @name         Navbar Shortcut Icon
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a shortcut icon next to the search bar in the navbar
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // URL of the website you want to open when the icon is clicked
    const shortcutURL = 'https://www.example.com';

    // URL of the favicon to use as the icon (replace with the URL of your desired favicon)
    const faviconURL = 'https://www.example.com/favicon.ico';

    // Create the icon element
    const iconElement = document.createElement('img');
    iconElement.src = faviconURL;
    iconElement.alt = 'Shortcut Icon';
    iconElement.style.width = '20px'; // Adjust size as needed
    iconElement.style.height = '20px';
    iconElement.style.cursor = 'pointer';
    iconElement.style.marginRight = '10px'; // Space between icon and search bar

    // Set the click event to open the shortcutURL in a new tab
    iconElement.addEventListener('click', function() {
        window.open(shortcutURL, '_blank');
    });

    // Insert the icon before the search bar
    const navBar = document.querySelector('.css-1n9ux6q');
    if (navBar) {
        navBar.insertBefore(iconElement, navBar.querySelector('input'));
        console.log('Shortcut icon added successfully.');
    } else {
        console.log('Navbar not found.');
    }
})();
