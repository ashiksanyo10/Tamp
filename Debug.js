// ==UserScript==
// @name         IMDb ID Hyperlink Creator
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Converts IMDb ID text to hyperlink on the page
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find and convert IMDb ID text to hyperlink
    function convertImdbIdToLink() {
        // Search for all spans that contain text resembling IMDb IDs (e.g., starting with 'tt')
        const imdbIdElements = document.querySelectorAll('td span');
        
        imdbIdElements.forEach(span => {
            const textContent = span.textContent.trim();
            // Check if the text starts with 'tt' and is followed by 7 to 8 digits
            const imdbIdRegex = /^tt\d{7,8}$/;

            if (imdbIdRegex.test(textContent)) {
                const imdbLink = `https://www.imdb.com/title/${textContent}`;
                // Create a hyperlink
                const linkElement = document.createElement('a');
                linkElement.href = imdbLink;
                linkElement.target = '_blank'; // Open link in a new tab
                linkElement.textContent = textContent; // Set the text as the IMDb ID
                linkElement.style.color = 'blue'; // Optional: change link color
                linkElement.style.textDecoration = 'underline'; // Optional: add underline for clarity

                // Replace the span with the hyperlink
                span.replaceWith(linkElement);
                console.log("Converted IMDb ID to hyperlink:", textContent);
            }
        });
    }

    // Observe the DOM for changes
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                convertImdbIdToLink(); // Call the function to convert IMDb ID to hyperlink
                break; // Exit after the first mutation
            }
        }
    });

    // Start observing the body for child nodes (can be modified as needed)
    observer.observe(document.body, { childList: true, subtree: true });
})();
