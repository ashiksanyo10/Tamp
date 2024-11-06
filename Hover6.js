// ==UserScript==
// @name         Parent Title Hover Tooltip with Fine-Tuned Positioning
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Displays Parent Title as a tooltip directly below h4 text with minimal offset
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find the Parent Title value
    function findParentTitle() {
        let parentTitleText = '';
        
        const parentTitleLabel = Array.from(document.querySelectorAll('td')).find(td => td.textContent.trim() === "Parent Title");
        
        if (parentTitleLabel) {
            const parentTitleValueTd = parentTitleLabel.nextElementSibling;
            if (parentTitleValueTd) {
                parentTitleText = parentTitleValueTd.textContent.trim();
            }
        }
        
        return parentTitleText;
    }

    // Function to create and show the hover tooltip
    function addHoverDialog(parentTitleText) {
        if (!parentTitleText) return;

        const h4Elements = document.querySelectorAll('h4.MuiTypography-root.MuiTypography-h4.css-1lysj71');
        
        h4Elements.forEach(h4 => {
            h4.addEventListener('mouseenter', function() {
                let tooltip = document.getElementById('parentTitleTooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.id = 'parentTitleTooltip';
                    tooltip.style.position = 'absolute';
                    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '6px 12px';
                    tooltip.style.borderRadius = '5px';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.style.transition = 'opacity 0.3s ease';
                    tooltip.style.zIndex = '1000';
                    tooltip.style.opacity = '0';
                    document.body.appendChild(tooltip);
                }

                tooltip.textContent = `Parent Title: ${parentTitleText}`;
                tooltip.style.opacity = '1';

                // Get the position of the h4 element
                const rect = h4.getBoundingClientRect();
                const tooltipWidth = tooltip.offsetWidth;

                // Set the tooltip position
                tooltip.style.top = `${rect.bottom + window.scrollY + -15}px`;  // 5px below the h4 element
                tooltip.style.left = `${rect.left + window.scrollX + rect.width / 120 - tooltipWidth / 90}px`;  // Centered horizontally

            });

            h4.addEventListener('mouseleave', function() {
                const tooltip = document.getElementById('parentTitleTooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        });
    }

    // Add the hover functionality when the page is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const parentTitleText = findParentTitle();
        addHoverDialog(parentTitleText);
    });

    // Observe the page for changes and reinitialize the tooltip logic
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const parentTitleText = findParentTitle();
                addHoverDialog(parentTitleText);
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
