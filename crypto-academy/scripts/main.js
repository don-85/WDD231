document.addEventListener('DOMContentLoaded', () => {
    console.log('CryptoAcademy website loaded!');

    // Smooth scrolling for anchor links
    // This provides a better user experience when navigating the single page.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});