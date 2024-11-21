// ==UserScript==
// @name         Logo Positioning Script with Base64 Logo and Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Place base64 logo at specific position on navbar and open link in a new tab on click
// @author       You
// @match        *://*/*  // Change this to the specific URL where you want the script to run
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Create the logo element (using base64 image for the logo)
    const logo = document.createElement('img');
    logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAk1BMVEU2Qkj///9sw501QUdtxZ5txZ9iqoxvyqI3REm2urxgpYkzOEJqvZkyPkQ2QUk1O0QpNz4/Vlbp6+tksJGcoqRVi3hOWl9ZZGl/h4rY29z5+fk9SU+lqqyJkJNham9FUFaSmJtJb2Z6w6NDZV6JxKowLT0uQ0ZRgXLEyMlvd3w+QUtMeGs7TVBZln9BXlsxM0CYxLEBbg9fAAADiUlEQVRIiY1WDXuiMAyuTRkFSekUQfEDb9vd6W6b9/9/3SVpi/icu10eEZS+JHnfpEHpr808GK2zaIquzZfGsCxgVGmy5QNb+E5mJtc6z01mykzcKGMqV9dz+szpwxZPfMH/zuvLx7dVpU31JACtcwdK0WHpdNdAOfdc6qcXoyWH3KFSVgHYT5bTAfC2MkaHHKq/Hg3TU/zhvufalEYrk1UKb5cCejIEeTKb3JqXOdOldFZZTMFYugCP7b7Z7Q8/CIMMTJ5WFQMynStIMVAmqI6bmdhiv20Xfd8XMWRXM7NqmQlLIRZa3xazZP2u49MV8JM9VFnlUg4WcDjNZhPEDcCuKG+m1TKhQN8APjx/06zXuxjZrBgjVpUpRTi0SBjKGA/y4GLLNA1FPwHQgUqbJXtgzejpFBCIg2IrlOK2uPWALjcVCxfjsRa7BbPT+RB1+DkJyeYUEgn3SjrQErC45yAKjFkCCgNFoh0tJ00etrRYkXqAwsreJ9n9/saDfYwsOcmBRFMS9AFTCHi+wxILh5wAF6wA2rG0AmkTALNUmdxiqG4MHrpPAcISC5doCjmcUw5KcuiLVLAMKFPH8XqFR2ap8ak/gu6jB2Vj0iQh5UB+8MyAU+oPHDYjgLs4sES0OohtFVb0ey9/ADZ9BARhwFZBOJdcgm+kEc7cNejXi2lpWFpGe5h03NjT2PahdQbE4dinarUjSwSgjnMuAYiXuGqxEIIm1eqoFvIo3HXXANv01wbaRR3iPRCWSLjkQRJVMXLmd9veryWrri4ocVgXm83m1LQeu1itSYdrx6XVSEY7ix0G61GF4tthuml1qtYxgwObZRwklvtjBNjAEnfcCNiKcFxMLF3QcXFAJdrbUEskHFW2i05FuBNFz6Ftd1IpNujOLRA9vI45ROE2624Y2vNJfpyln6SFE0uPKMVNTUHCRVL7KEd/HIs91hKx9MvJDiA7MezT/hUEP05mATipJRqSteM9xobR0RWjcouiG/ckOpywxGN1VXM/WAjbsffdutntmnWLPu4HUn6QOk5n5RvEkCJZ3qeRkv7ivEPHaZ6m73MISU/u/zUiQT2G8ibLV281fLYwyCzCMUuZIPT7s0Pe7++uVjKWVei4TBBGV6sPN+dJXl9kttdhsk+G/PxyyQNAfLzkuV6mt4by4Y4tKx68AZBl5reh94l/m4Si0muNWb4/mP94F/oD8Xo3sVGz6E4AAAAASUVORK5CYII='; // Base64 image data

    logo.style.position = 'absolute';
    logo.style.zIndex = '1000';
    logo.style.pointerEvents = 'auto'; // Make the logo clickable
    logo.style.width = '40px';  // Adjust size of the logo
    logo.style.height = '40px'; // Adjust size of the logo
    logo.style.cursor = 'pointer';  // Change the cursor to indicate it's clickable

    // Specify the exact coordinates where you want to place the logo
    const mouseX = 881;  // X-coordinate
    const mouseY = 13;   // Y-coordinate

    // Apply the position to the logo
    logo.style.left = `${mouseX}px`;
    logo.style.top = `${mouseY}px`;

    // Append the logo to the body
    document.body.appendChild(logo);

    // Add click event listener to open the link in a new tab
    logo.addEventListener('click', function() {
        // The URL you want to open when the logo is clicked
        window.open('https://www.classification.gov.au', '_blank');
    });
})();
