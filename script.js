// Modern particle and typing animation configuration
document.addEventListener("DOMContentLoaded", () => {
    // Initialize particle animation with enhanced visual settings
    initParticles();
    
    // Start typing animation with slight delay for better UX
    setTimeout(initTyped, 1000);
});

/**
 * Configure and initialize particle background effect
 */
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: 50,
                density: { enable: true, value_area: 900 }
            },
            color: { value: "#667eea" },
            shape: { 
                type: "circle",
                stroke: { width: 0, color: "#000000" }
            },
            opacity: { 
                value: 0.2, 
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: { 
                value: 3, 
                random: true,
                anim: { enable: true, speed: 1, size_min: 0.1, sync: false }
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                out_mode: "out",
                bounce: false
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#667eea",
                opacity: 0.2,
                width: 1
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 150, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

/**
 * Initialize typing animation with professional descriptions
 */
function initTyped() {
    new Typed("#typed", {
        strings: [
            "Computer Science Student",
            "Aspiring Data Scientist",
            "Java, Web, Python Developer",
            "Machine Learning Enthusiast",
            "Tech Innovator"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: false,
        cursorChar: "│",
        fadeOut: true,
        smartBackspace: true
    });

    document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';  // يعطي مؤشر يد للنقر
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank');  // يفتح الرابط في تاب جديد
    }
  });
});
}
