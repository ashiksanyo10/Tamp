// ==UserScript==
// @name         Parent Title Hover Tooltip with Adjacent Selection
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Displays Parent Title as a tooltip when hovering over specific h4 text
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find the Parent Title based on the label and its adjacent <td>
    function findParentTitle() {
        let parentTitleText = '';
        
        // Locate the <td> with "Parent Title" label
        const parentTitleLabel = Array.from(document.querySelectorAll('td')).find(td => td.textContent.trim() === "Parent Title");
        console.log("Searching for 'Parent Title' label...");
        
        if (parentTitleLabel) {
            console.log("Found 'Parent Title' label.");
            // Get the adjacent <td> element with the actual Parent Title value
            const parentTitleValueTd = parentTitleLabel.nextElementSibling;
            if (parentTitleValueTd) {
                parentTitleText = parentTitleValueTd.textContent.trim();
                console.log("Found 'Parent Title' value:", parentTitleText);
            } else {
                console.warn("Parent Title value element not found next to the label.");
            }
        } else {
            console.warn("Parent Title label not found.");
        }
        
        return parentTitleText;
    }

    // Function to add hover dialog with Parent Title on h4 elements
    function addHoverDialog(parentTitleText) {
        // Only proceed if Parent Title is found
        if (!parentTitleText) {
            console.warn("Parent Title not found. Skipping tooltip attachment.");
            return;
        }

        // Find all h4 elements with the specified classes to attach tooltip functionality
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

    // Run the functions when the DOM content is loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Page loaded. Running findParentTitle and addHoverDialog functions.");

        // Call functions and log output
        const parentTitleText = findParentTitle(); // Try to get Parent Title
        console.log("Parent Title Text retrieved:", parentTitleText);

        addHoverDialog(parentTitleText); // Attach hover functionality with tooltip
    });

    // Observe the DOM for changes (if elements load dynamically)
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const parentTitleText = findParentTitle(); // Re-run title search
                addHoverDialog(parentTitleText); // Re-apply tooltip hover
                break; // Exit after the first mutation
            }
        }
    });

    // Start observing the body for child nodes (set to observe changes within the DOM tree)
    observer.observe(document.body, { childList: true, subtree: true });
})();
