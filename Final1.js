// ==UserScript==
// @name         Logo Positioning Script with Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Place logo at specific position on navbar and open link in a new tab on click
// @author       You
// @match        *://*/*  // Change this to the specific URL where you want the script to run
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Create the logo element (using an image or text, here we use text for the shortcut)
    const logo = document.createElement('div');
    logo.innerText = 'Logo Shortcut'; // Replace with your actual logo or icon
    logo.style.position = 'absolute';
    logo.style.zIndex = '1000';
    logo.style.pointerEvents = 'auto'; // Make the logo clickable
    logo.style.padding = '5px 10px';
    logo.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    logo.style.color = 'white';
    logo.style.borderRadius = '5px';
    logo.style.fontSize = '14px';
    logo.style.cursor = 'pointer';  // Change the cursor to indicate it's clickable

    // Specify the exact coordinates where you want to place the logo
    const mouseX = 881;  // X-coordinate
    const mouseY = 13;   // Y-coordinate

    // Apply the position to the logo
    logo.style.left = `${mouseX}px`;
    logo.style.top = `${mouseY}px`;

    // Append the logo to the body
    document.body.appendChild(logo);

    // Add click event listener to open the link in a new tab
    logo.addEventListener('click', function() {
        // The URL you want to open when the logo is clicked
        window.open('https://www.classification.gov.au', '_blank');
    });
})();
