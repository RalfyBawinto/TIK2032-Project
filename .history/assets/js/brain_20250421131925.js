document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  // ✅ Nav menu click: No smooth scroll
  document.querySelectorAll(".main-header nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault(); // prevent default anchor smooth scroll
        // 🚫 remove smooth behavior
        document.documentElement.style.scrollBehavior = "auto";
        targetEl.scrollIntoView({ behavior: "auto" });

        // ✅ restore smooth scroll after
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";
        }, 300);
      }

      navMenu.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // 🍔 Burger menu toggle
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  // 🧼 Modal logic
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

  // 👁️ Scroll reveal
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

  // 🔁 Set default smooth scroll (for normal scrolls)
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 100);
});
