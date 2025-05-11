document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const nav = document.querySelector(".nav");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const contactForm = document.querySelector("#contact-form");
  const rocketLoader = document.getElementById("rocket-loader");
  const sendingText = document.getElementById("sending-text");

  let formChanged = false;

  // === FORM HANDLING ===
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");
    const spinnerLoader = document.getElementById("spinner-loader");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        formChanged = Array.from(inputs).some(
          (el) => el.value.trim().length > 0
        );
      });
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      // Show spinner
      if (spinnerLoader) spinnerLoader.style.display = "flex";

      try {
        const response = await fetch("https://formspree.io/f/meoajpkz", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          formChanged = false;

          setTimeout(() => {
            if (spinnerLoader) spinnerLoader.style.display = "none";
            showModal("Thank You!", "Your message has been sent successfully.");
          }, 800);
        } else {
          showModal("Oops!", "There was a problem sending your message.");
          if (spinnerLoader) spinnerLoader.style.display = "none";
        }
      } catch (error) {
        showModal("Error", "Something went wrong. Please try again later.");
        if (spinnerLoader) spinnerLoader.style.display = "none";
      }
    });
  }

  window.addEventListener("beforeunload", (e) => {
    if (formChanged) {
      const msg = "You have unsaved changes in the contact form. Leave anyway?";
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  });

  // === SMOOTH SCROLL TO SECTION + CLOSE BURGER ===
  document.querySelectorAll(".main-header nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        document.documentElement.style.scrollBehavior = "auto";
        targetEl.scrollIntoView({ behavior: "auto" });

        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";
          revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.classList.add("visible");
            } else {
              el.classList.remove("visible");
            }
          });
        }, 50);
      }

      nav.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // === BURGER TOGGLE + FIX DOUBLE CLICK + CLOSE IF OUTSIDE ===
  if (burger && navMenu && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.contains("active");
      if (isOpen) {
        nav.classList.remove("active");
        burger.classList.remove("active");
      } else {
        nav.classList.add("active");
        burger.classList.add("active");
      }
    });

    document.addEventListener("click", (e) => {
      const isClickInsideNav =
        nav.contains(e.target) || burger.contains(e.target);
      if (!isClickInsideNav && nav.classList.contains("active")) {
        nav.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  }

  // === MODAL HANDLING ===
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

  // === SCROLL REVEAL ===
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
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // === MENU ACTIVE ON SCROLL ===
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-header nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // === SMOOTH SCROLL DEFAULT ===
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 100);
});
