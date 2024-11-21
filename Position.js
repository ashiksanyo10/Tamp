const navBar = document.querySelector('.css-1n9ux6q');

navBar.addEventListener('mousemove', function(event) {
    const rect = navBar.getBoundingClientRect();
    console.log(`Mouse X: ${event.clientX - rect.left}, Mouse Y: ${event.clientY - rect.top}`);
});
