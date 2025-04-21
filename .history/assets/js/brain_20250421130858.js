document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  // Toggle burger menu
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("active"); // Burger animation
    });
  }

  // Auto-close nav on link click (mobile)
  document.querySelectorAll(".main-header nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // Show modal function
  window.showModal = (title, text) => {
    if (modal && modalTitle && modalText) {
      modalTitle.textContent = title;
      modalText.textContent = text;
      modal.style.display = "flex";
    }
  };

  // Close modal function
  window.closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  // Close modal on 'X' button click
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Scroll reveal with IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: langsung tampilkan
    revealElements.forEach((el) => el.classList.add("visible"));
  }
});
