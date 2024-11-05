// ==UserScript==
// @name         IMDb ID Logger
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Logs IMDb ID to console for debugging
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait a bit to ensure the content is fully loaded
    setTimeout(() => {
        // Attempt to select the IMDb ID cell
        const imdbIdCell = document.querySelector('td.css-lemlyl + td.css-18tzy6q > span');

        if (imdbIdCell) {
            // Log the IMDb ID content to console
            console.log("IMDb ID found:", imdbIdCell.textContent.trim());
        } else {
            console.warn("IMDb ID element not found.");
        }
    }, 3000); // Adjust the delay as needed if content loads slowly

})();
