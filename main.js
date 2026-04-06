document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // Add mouse move listener for generic glow effect globally if needed
    document.addEventListener("mousemove", (e) => {
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });
    // Fetch and render countries data
    fetch('countries_data.json')
        .then(response => response.json())
        .then(data => {
            const marquee1 = document.getElementById('marquee1');
            const marquee2 = document.getElementById('marquee2');
            
            if(marquee1 && marquee2) {
                // Split data into two rows
                const row1Data = data.slice(0, Math.ceil(data.length / 2));
                const row2Data = data.slice(Math.ceil(data.length / 2));
                
                // Helper to map country code to emoji flag
                const getFlagEmoji = (countryCode) => {
                    if(!countryCode || countryCode.length !== 2) return '🌍';
                    const codePoints = countryCode
                        .toUpperCase()
                        .split('')
                        .map(char => 127397 + char.charCodeAt(0));
                    return String.fromCodePoint(...codePoints);
                };

                const createPill = (country) => {
                    return `<div class="country-pill">
                        <span class="country-flag">${getFlagEmoji(country.code)}</span>
                        <span class="country-name">${country.name}</span>
                        <span class="bank-count">${country.banks.toLocaleString()} Banks</span>
                    </div>`;
                };

                const row1Html = row1Data.map(createPill).join('');
                const row2Html = row2Data.map(createPill).join('');

                marquee1.innerHTML = row1Html;
                document.getElementById('marquee1-clone').innerHTML = row1Html;
                
                marquee2.innerHTML = row2Html;
                document.getElementById('marquee2-clone').innerHTML = row2Html;
            }
        })
        .catch(err => console.error("Could not load country data: ", err));

    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
