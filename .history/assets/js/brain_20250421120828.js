document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  // burger menu toggle
  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      burger.classList.toggle("active"); // <- Tambahkan ini untuk animasi burger
    });
  }

  // Auto-close nav menu saat klik salah satu menu link (mobile)
  const navLinks = document.querySelectorAll(".main-header nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // Function to open modal
  window.showModal = function (title, text) {
    if (modal && modalTitle && modalText) {
      modalTitle.textContent = title;
      modalText.textContent = text;
      modal.style.display = "flex";
    }
  };

  // Function to close modal
  window.closeModal = function () {
    if (modal) {
      modal.style.display = "none";
    }
  };

  // Close modal when close button is clicked
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  // Close modal if user clicks outside of the modal
  window.addEventListener("click", function (event) {
    if (modal && event.target === modal) {
      closeModal();
    }
  });

  // Scroll reveal with IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: langsung tampilkan semua elemen
    revealElements.forEach((el) => el.classList.add("visible"));
  }
});
