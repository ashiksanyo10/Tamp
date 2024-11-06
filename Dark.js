// ==UserScript==
// @name         Dark Mode Toggle Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A simple dark mode toggle for any website
// @author       You
// @match        *://*/*   // Applies to all websites
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply dark mode on page load if enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Add the button to toggle dark mode
    const button = document.createElement('button');
    button.textContent = 'Toggle Dark Mode';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = '#333';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    
    document.body.appendChild(button);

    // Function to toggle dark mode
    button.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save the user's preference in localStorage
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);
    });

    // Add styles for dark mode
    GM_addStyle(`
        .dark-mode {
            background-color: #121212 !important;
            color: white !important;
        }

        .dark-mode a {
            color: #1e90ff !important;
        }

        .dark-mode button {
            background-color: #555 !important;
            color: white !important;
        }

        .dark-mode h1, .dark-mode h2, .dark-mode h3, .dark-mode h4, .dark-mode h5, .dark-mode h6 {
            color: white !important;
        }

        .dark-mode p {
            color: #b0b0b0 !important;
        }

        /* Additional styles for better visibility */
        .dark-mode img {
            filter: brightness(0.8);
        }
    `);
})();
