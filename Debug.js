// ==UserScript==
// @name         IMDb ID Logger (with adjacent cell lookup)
// @namespace    http://tampermonkey.net/
// @version      1.2
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
            // Find the IMDb ID in the adjacent cell
            const imdbIdCell = imdbLabelCell.closest('td').nextElementSibling.querySelector('span');

            if (imdbIdCell) {
                // Log the IMDb ID to console
                const imdbIdValue = imdbIdCell.textContent.trim();
                console.log("IMDb ID found:", imdbIdValue);
                
                // Here, you can create a hyperlink if needed
                const imdbLink = `https://www.imdb.com/title/${imdbIdValue}`;
                console.log("IMDb link:", imdbLink);
            } else {
                console.warn("IMDb ID value element not found.");
            }
        } else {
            console.warn("IMDb Id label element not found.");
        }
    }, 3000); // Adjust the delay as needed

})();
