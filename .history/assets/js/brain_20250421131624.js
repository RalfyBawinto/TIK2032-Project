document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  // Disable smooth scroll when nav link clicked
  document.querySelectorAll(".main-header nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      document.documentElement.classList.remove("smooth-scroll");

      // Optional: force instant scroll manually
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault(); // prevent default smooth scroll
        targetEl.scrollIntoView({ behavior: "auto" });
      }

      navMenu.classList.remove("active");
      burger.classList.remove("active");

      // Re-enable smooth scroll after delay (for scroll from other parts)
      setTimeout(() => {
        document.documentElement.classList.add("smooth-scroll");
      }, 300);
    });
  });

  // Burger toggle
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  // Modal handlers...
  window.showModal = (title, text) => {
    if (modal && modalTitle && modalText) {
      modalTitle.textContent = title;
      modalText.textContent = text;
      modal.style.display = "flex";
    }
  };

  window.closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("visible", entry.isIntersecting)
        );
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // Set default scroll behavior to smooth AFTER load
  setTimeout(() => {
    document.documentElement.classList.add("smooth-scroll");
  }, 100);
});
