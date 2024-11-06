// ==UserScript==
// @name         Hover Tooltip with Parent ID for Specific H4 Tags
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Show parent ID in tooltip when hovering over text in specific H4 elements if parent ID is available.
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add hover tooltip to specific <h4> elements
    function addHoverTooltipToSpecificH4() {
        // Step 1: Select all specific <h4> elements
        const h4Elements = document.querySelectorAll('h4.MuiTypography-root.MuiTypography-h4.css-1lysj71');

        // Step 2: Find the parent ID element
        const parentIdElement = document.querySelector('td.css-18tzy6q span');
        if (!parentIdElement) {
            console.warn("Parent ID element not found.");
            return;
        }
        const parentIdText = parentIdElement.textContent.trim();

        // Step 3: Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.classList.add('hover-tooltip');
        tooltip.textContent = `Parent ID: ${parentIdText}`;
        document.body.appendChild(tooltip);

        // Step 4: Attach hover events to each specific <h4> element
        h4Elements.forEach((h4) => {
            h4.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });

            h4.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            h4.addEventListener('mousemove', (event) => {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            });
        });
    }

    // Add CSS for the tooltip styling
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

    // Run the tooltip function after page load
    addHoverTooltipToSpecificH4();

})();
