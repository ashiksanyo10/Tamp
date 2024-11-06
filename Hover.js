// ==UserScript==
// @name         IMDb, GTI, and Tooltip Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Converts IMDb and GTI IDs to hyperlinks; automates clicks on GTI page; adds hover tooltip for parent ID.
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create tooltip on hover
    function addHoverTooltip() {
        // Select the <h4> element for hovering (e.g., with 'sample text (AU)')
        const hoverElement = document.querySelector('h4.MuiTypography-root.MuiTypography-h4.css-1lysj71');

        if (hoverElement) {
            // Find the parent ID from <td class="css-18tzy6q"><span>parent id</span></td>
            const parentIdElement = document.querySelector('td.css-18tzy6q span');
            if (!parentIdElement) {
                console.warn("Parent ID element not found.");
                return;
            }
            const parentIdText = parentIdElement.textContent;

            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.classList.add('hover-tooltip');
            tooltip.textContent = `Parent ID: ${parentIdText}`;
            document.body.appendChild(tooltip);

            // Hover events
            hoverElement.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });

            hoverElement.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            hoverElement.addEventListener('mousemove', (event) => {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            });
        } else {
            console.warn("Hover element not found.");
        }
    }

    // Add styles for the tooltip
    const style = document.createElement('style');
    style.textContent = `
        .hover-tooltip {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.75);
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            display: none;
            z-index: 1000;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Run the hover tooltip function
    addHoverTooltip();

})();
