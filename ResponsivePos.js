// ==UserScript==
// @name         Responsive Logo Positioning Script
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Place a base64 logo on a navbar at a specific position, responsive to layout changes
// @author       You
// @match        *://*/*  // Change this to the specific URL where you want the script to run
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the DOM to load
    window.addEventListener('load', () => {
        // Find the navbar element
        const navBar = document.querySelector('.css-1n9ux6q'); // Update the selector to match your navbar

        if (!navBar) {
            console.error('Navbar not found!');
            return;
        }

        // Create the logo element (base64 image for the logo)
        const logo = document.createElement('img');
        logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAk1BMVEU2Qkj///9sw501QUdtxZ5txZ9iqoxvyqI3REm2urxgpYkzOEJqvZkyPkQ2QUk1O0QpNz4/Vlbp6+tksJGcoqRVi3hOWl9ZZGl/h4rY29z5+fk9SU+lqqyJkJNham9FUFaSmJtJb2Z6w6NDZV6JxKowLT0uQ0ZRgXLEyMlvd3w+QUtMeGs7TVBZln9BXlsxM0CYxLEBbg9fAAADiUlEQVRIiY1WDXuiMAyuTRkFSekUQfEDb9vd6W6b9/9/3SVpi/icu10eEZS+JHnfpEHpr808GK2zaIquzZfGsCxgVGmy5QNb+E5mJtc6z01mykzcKGMqV9dz+szpwxZPfMH/zuvLx7dVpU31JACtcwdK0WHpdNdAOfdc6qcXoyWH3KFSVgHYT5bTAfC2MkaHHKq/Hg3TU/zhvufalEYrk1UKb5cCejIEeTKb3JqXOdOldFZZTMFYugCP7b7Z7Q8/CIMMTJ5WFQMynStIMVAmqI6bmdhiv20Xfd8XMWRXM7NqmQlLIRZa3xazZP2u49MV8JM9VFnlUg4WcDjNZhPEDcCuKG+m1TKhQN8APjx/06zXuxjZrBgjVpUpRTi0SBjKGA/y4GLLNA1FPwHQgUqbJXtgzejpFBCIg2IrlOK2uPWALjcVCxfjsRa7BbPT+RB1+DkJyeYUEgn3SjrQErC45yAKjFkCCgNFoh0tJ00etrRYkXqAwsreJ9n9/saDfYwsOcmBRFMS9AFTCHi+wxILh5wAF6wA2rG0AmkTALNUmdxiqG4MHrpPAcISC5doCjmcUw5KcuiLVLAMKFPH8XqFR2ap8ak/gu6jB2Vj0iQh5UB+8MyAU+oPHDYjgLs4sES0OohtFVb0ey9/ADZ9BARhwFZBOJdcgm+kEc7cNejXi2lpWFpGe5h03NjT2PahdQbE4dinarUjSwSgjnMuAYiXuGqxEIIm1eqoFvIo3HXXANv01wbaRR3iPRCWSLjkQRJVMXLmd9veryWrri4ocVgXm83m1LQeu1itSYdrx6XVSEY7ix0G61GF4tthuml1qtYxgwObZRwklvtjBNjAEnfcCNiKcFxMLF3QcXFAJdrbUEskHFW2i05FuBNFz6Ftd1IpNujOLRA9vI45ROE2624Y2vNJfpyln6SFE0uPKMVNTUHCRVL7KEd/HIs91hKx9MvJDiA7MezT/hUEP05mATipJRqSteM9xobR0RWjcouiG/ckOpywxGN1VXM/WAjbsffdutntmnWLPu4HUn6QOk5n5RvEkCJZ3qeRkv7ivEPHaZ6m73MISU/u/zUiQT2G8ibLV281fLYwyCzCMUuZIPT7s0Pe7++uVjKWVei4TBBGV6sPN+dJXl9kttdhsk+G/PxyyQNAfLzkuV6mt4by4Y4tKx68AZBl5reh94l/m4Si0muNWb4/mP94F/oD8Xo3sVGz6E4AAAAASUVORK5CYII='; // Base64 image

        logo.style.position = 'absolute';
        logo.style.zIndex = '1000';
        logo.style.width = '40px';
        logo.style.height = '40px';
        logo.style.cursor = 'pointer';

        // Append the logo inside the navbar
        navBar.appendChild(logo);

        // Adjust the logo's position relative to the navbar
        logo.style.left = `calc(${881 / window.innerWidth * 100}% - ${navBar.offsetLeft}px)`;
        logo.style.top = `calc(${13}px)`;

        // Recalculate the position on window resize
        window.addEventListener('resize', () => {
            logo.style.left = `calc(${881 / window.innerWidth * 100}% - ${navBar.offsetLeft}px)`;
        });

        // Add click event to open a link in a new tab
        logo.addEventListener('click', () => {
            window.open('https://www.classification.gov.au', '_blank');
        });
    });
})();