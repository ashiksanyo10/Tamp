// ==UserScript==
// @name         Parent ID Finder Debug
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Debugging script to find and log the parent ID
// @match        https://*/tasks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Find the parent ID element
    const parentIdElement = document.querySelector('td.css-18tzy6q span');

    // Check if the element exists and log its content
    if (parentIdElement) {
        const parentIdText = parentIdElement.textContent.trim();
        console.log("Parent ID found:", parentIdText);
    } else {
        console.warn("Parent ID element not found.");
    }

})();
