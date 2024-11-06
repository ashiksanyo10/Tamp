// ==UserScript==
// @name         Hover Dialogue with Copyable Text
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Show parent title in hover dialogue box and make text copyable
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to display the hover dialogue box with parent title
    function createHoverDialogueBox(e) {
        // Find the parent title (from the td with css-lemlyl + css-18tzy6q)
        const parentTitleElement = document.querySelector('td.css-lemlyl + td.css-18tzy6q');
        const parentTitle = parentTitleElement ? parentTitleElement.textContent.trim() : 'Parent Title not found';
        
        // Create the hover dialogue box
        let hoverBox = document.createElement('div');
        hoverBox.id = 'hover-box';
        hoverBox.style.position = 'absolute';
        hoverBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        hoverBox.style.color = 'white';
        hoverBox.style.padding = '8px 16px';
        hoverBox.style.borderRadius = '4px';
        hoverBox.style.fontSize = '14px';
        hoverBox.style.maxWidth = '300px';
        hoverBox.style.wordWrap = 'break-word';
        hoverBox.style.zIndex = '9999';
        hoverBox.style.userSelect = 'text';  // Allow text selection for copying
        hoverBox.style.whiteSpace = 'pre-wrap';
        
        // Set the content as the parent title
        hoverBox.textContent = parentTitle;
        
        // Append the hover box to the body
        document.body.appendChild(hoverBox);

        // Position the hover box just below the h4 element
        const h4Element = e.target.closest('h4');
        if (h4Element) {
            const h4Position = h4Element.getBoundingClientRect();
            hoverBox.style.top = `${h4Position.bottom + window.scrollY + 5}px`;  // 5px below the h4
            hoverBox.style.left = `${h4Position.left + window.scrollX}px`;  // Align with the left of the h4
        }
    }

    // Function to remove the hover dialogue box
    function removeHoverDialogueBox() {
        const hoverBox = document.getElementById('hover-box');
        if (hoverBox) {
            hoverBox.remove();
        }
    }

    // Attach hover event listener to all h4 elements with specific class
    const h4Elements = document.querySelectorAll('.MuiTypography-root.MuiTypography-h4.css-1lysj71');
    h4Elements.forEach(h4 => {
        h4.addEventListener('mouseenter', createHoverDialogueBox);  // Show hover box on hover
        h4.addEventListener('mouseleave', removeHoverDialogueBox);  // Hide hover box on mouse leave
    });
})();
