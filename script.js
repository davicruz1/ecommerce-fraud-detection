document.addEventListener("DOMContentLoaded", () => {
    // 1. Mouse Glow Effect
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // 2. Vanilla Tilt for Glass Cards (3D Hover Effect)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-visible');
                }, delay);
                delay += 150; // Stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, header, footer').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 4. Lightbox Modal for Images
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".close-modal");
    const cardImages = document.querySelectorAll(".glass-card img");

    cardImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = img.src;
        });
    });

    // Close modal on click of X
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target !== modalImg) {
            modal.classList.remove('show');
        }
    });
});
