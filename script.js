document.addEventListener("DOMContentLoaded", () => {

  // ── 1. Mouse Glow ──────────────────────────────────────────────
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // ── 2. VanillaTilt apenas nos cards normais (sem notebook) ──────
  if (typeof VanillaTilt !== 'undefined') {
    const tiltTargets = document.querySelectorAll(
      ".glass-card:not(.notebook-card)"
    );
    VanillaTilt.init(tiltTargets, {
      max: 4,
      speed: 500,
      glare: true,
      "max-glare": 0.12,
      scale: 1.01,
      perspective: 1200,
    });
  }

  // ── 3. Scroll Reveal com stagger por grupo ─────────────────────
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger suave: 0ms para o primeiro visível de cada lote
        const delay = i * 80;
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, header, footer').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // ── 4. Lightbox Modal para imagens ─────────────────────────────
  const modal    = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close-modal");

  // Seleciona TODAS as imagens clicáveis da página
  document.querySelectorAll(".glass-card img").forEach((img) => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('show');
    });
  });

  const closeModal = () => modal.classList.remove('show');

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
