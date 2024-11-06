// ==UserScript==
// @name         Parent Title Hover Tooltip
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Displays Parent Title as a tooltip when hovering over specific h4 text
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add hover dialog with Parent Title
    function addHoverDialog() {
        // Find the Parent Title element and retrieve its text
        const parentTitleElement = document.querySelector('td.css-18tzy6q span');
        if (!parentTitleElement) {
            console.warn("Parent Title not found.");
            return;
        }
        const parentTitleText = parentTitleElement.textContent.trim();

        // Find all h4 elements with the specific class that should display the tooltip
        const h4Elements = document.querySelectorAll('h4.MuiTypography-root.MuiTypography-h4.css-1lysj71');
        
        h4Elements.forEach(h4 => {
            // Add hover event listeners for each h4 element
            h4.addEventListener('mouseenter', function() {
                // Create a tooltip element if it doesn't already exist
                let tooltip = document.getElementById('parentTitleTooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.id = 'parentTitleTooltip';
                    tooltip.style.position = 'absolute';
                    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '5px 10px';
                    tooltip.style.borderRadius = '5px';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.style.transition = 'opacity 0.2s';
                    tooltip.style.zIndex = '1000';
                    tooltip.style.opacity = '0';
                    document.body.appendChild(tooltip);
                }

                // Set the tooltip content to the Parent Title text and position it
                tooltip.textContent = `Parent Title: ${parentTitleText}`;
                tooltip.style.opacity = '1';
                const rect = h4.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;
            });

            h4.addEventListener('mouseleave', function() {
                // Hide the tooltip when not hovering
                const tooltip = document.getElementById('parentTitleTooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        });
    }

    // Observe the DOM for changes to dynamically add hover tooltips as new elements are added
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                addHoverDialog(); // Call function to add hover tooltip
                break; // Exit after processing the first mutation
            }
        }
    });

    // Start observing the body for child nodes (set to observe changes within the DOM tree)
    observer.observe(document.body, { childList: true, subtree: true });
})();
