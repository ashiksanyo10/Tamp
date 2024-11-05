// ==UserScript==
// @name         IMDb ID Logger (with adjacent cell lookup)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Logs IMDb ID to console for debugging
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Delay to allow content to load
    setTimeout(() => {
        // Locate the cell with "IMDB Id" label
        const imdbLabelCell = document.querySelector('td.css-lemlyl span');

        if (imdbLabelCell && imdbLabelCell.textContent.trim() === "IMDB Id") {
            // If label is found, select the next sibling cell containing the IMDb ID
            const imdbIdCell = imdbLabelCell.closest('td').nextElementSibling.querySelector('span');

            if (imdbIdCell) {
                // Log the IMDb ID to console
                console.log("IMDb ID found:", imdbIdCell.textContent.trim());
            } else {
                console.warn("IMDb ID value element not found.");
            }
        } else {
            console.warn("IMDb Id label element not found.");
        }
    }, 3000); // Adjust the delay as needed

})();
