// ==UserScript==
// @name         Lang Annotations Checker & IMDb Link Converter
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Checks for language annotations and converts IMDb IDs to clickable links
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let matchedFlag = false;

    // XPath for notes button and text table
    const XPATHS = {
        notesButton: "//button[@mdn-tab-value='notes']",
        textTable: "//table[@class='css-mjgyps']"
    };

    // Helper function to get element by XPath
    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Function to check for language annotation
    function checkForLanguageAnnotation() {
        const textElement = getElementByXPath(XPATHS.textTable);
        if (textElement) {
            const textContent = textElement.textContent.toLowerCase();
            if (textContent.includes('languagetheme')) {
                matchedFlag = true; // Set flag to prevent repeat alerts
                console.log("Language annotation found.");
            } else {
                alert('Add Language Annotations');
            }
        } else {
            console.error("Text element not found.");
        }
    }

    // Function to open notes and check text content
    function openNotesAndCheck() {
        const notesButton = getElementByXPath(XPATHS.notesButton);
        if (notesButton) {
            notesButton.click();
            setTimeout(checkForLanguageAnnotation, 500); // Short delay to let content load
        } else {
            console.error("Notes button not found.");
        }
    }

    // Function to convert IMDb ID to a hyperlink, if valid
    function convertImdbIdToLink() {
        // Select the <span> element with the IMDb ID within the <td> element
        const imdbElement = document.querySelector("td.css-18tzy6q > span");

        if (imdbElement) {
            // Get the IMDb ID text
            const imdbId = imdbElement.textContent.trim();

            // Validate IMDb ID format (usually starts with "tt" followed by numbers)
            const imdbIdPattern = /^tt\d+$/;
            if (imdbIdPattern.test(imdbId)) {
                // Create the URL
                const imdbUrl = `https://www.imdb.com/title/${imdbId}`;

                // Create an <a> tag
                const imdbLink = document.createElement("a");
                imdbLink.href = imdbUrl;
                imdbLink.target = "_blank"; // Opens the link in a new tab
                imdbLink.textContent = imdbId;

                // Replace the original <span> content with the <a> link
                imdbElement.replaceWith(imdbLink);
            } else {
                console.warn("IMDb ID format is invalid or not present:", imdbId);
            }
        } else {
            console.warn("IMDb ID element not found.");
        }
    }

    // Initialize observer to detect the summarize button
    const observer = new MutationObserver(() => {
        const summarizeButton = document.querySelector('button.css-bni06b');
        if (summarizeButton && !matchedFlag) {
            summarizeButton.addEventListener('click', function(event) {
                event.preventDefault();
                openNotesAndCheck();
            });
            console.log("Summarize button found and event listener added.");
            observer.disconnect(); // Stop observing once summarize button is found
        }
    });

    // Start observing the document for mutations
    observer.observe(document.body, { childList: true, subtree: true });

    // Call IMDb ID link converter function
    convertImdbIdToLink();

})();
