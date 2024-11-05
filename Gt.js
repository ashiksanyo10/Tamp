// ==UserScript==
// @name         IMDb and GTI Hyperlink Creator with Automation
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Converts IMDb and GTI IDs to hyperlinks; automates clicks on GTI page
// @match        https://*/tasks/*
// @match        https://a.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find and convert IMDb and GTI IDs to hyperlinks
    function convertIdsToLinks() {
        // Search for all span elements that might contain IMDb or GTI IDs
        const elements = document.querySelectorAll('td span');

        elements.forEach(span => {
            const textContent = span.textContent.trim();

            // IMDb ID regex
            const imdbIdRegex = /^tt\d{7,8}$/;

            // GTI ID regex (matches 'gti: <code>' format)
            const gtiRegex = /^gti:\s*([a-zA-Z0-9]+)$/;

            // Convert IMDb IDs to hyperlinks
            if (imdbIdRegex.test(textContent)) {
                const imdbLink = `https://www.imdb.com/title/${textContent}`;
                createHyperlink(span, imdbLink, textContent);
            }

            // Convert GTI IDs to hyperlinks
            const gtiMatch = textContent.match(gtiRegex);
            if (gtiMatch) {
                const gtiCode = gtiMatch[1]; // Extract the GTI code after "gti: "
                const gtiLink = `https://a.com/${gtiCode}`;
                createHyperlink(span, gtiLink, gtiCode);
            }
        });
    }

    // Helper function to replace text with a hyperlink
    function createHyperlink(element, url, displayText) {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.textContent = displayText;
        linkElement.style.color = 'blue';
        linkElement.style.textDecoration = 'underline';

        element.replaceWith(linkElement); // Replace text with the link
        console.log(`Created hyperlink for ${displayText}: ${url}`);
    }

    // Automate clicks on the GTI page
    function automateGTIPage() {
        const playableAssetButton = document.querySelector('button.css-162w5mb');
        const sourceAssetButton = document.evaluate(
            "//button[@role='button' and text()='Source asset']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (playableAssetButton) {
            playableAssetButton.click();
            console.log("Clicked 'Playable Asset' button.");

            setTimeout(() => {
                if (sourceAssetButton) {
                    sourceAssetButton.click();
                    console.log("Clicked 'Source Asset' button.");
                } else {
                    console.warn("Source Asset button not found.");
                }
            }, 1000); // Adjust delay as needed
        } else {
            console.warn("Playable Asset button not found.");
        }
    }

    // Run the hyperlink conversion on the main page
    if (window.location.hostname !== 'a.com') {
        convertIdsToLinks();
    }

    // Automate button clicks on the GTI page (https://a.com/*)
    if (window.location.hostname === 'a.com') {
        // Use a MutationObserver to wait until buttons are available in the DOM
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    automateGTIPage();
                    observer.disconnect(); // Stop observing after automation
                    break;
                }
            }
        });

        // Start observing the body for changes
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
