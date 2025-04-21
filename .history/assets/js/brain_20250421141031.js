document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const contactForm = document.querySelector("#contact-form");

  let formChanged = false;

  // ✅ Tangani perubahan form: hanya tandai form berubah jika ada input
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        formChanged = Array.from(inputs).some(
          (el) => el.value.trim().length > 0
        );
      });
    });

    // ✅ Tangani pengiriman form
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

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
          showModal("Thank You!", "Your message has been sent successfully.");
        } else {
          showModal("Oops!", "There was a problem sending your message.");
        }
      } catch (error) {
        showModal("Error", "Something went wrong. Please try again later.");
      }
    });
  }

  // ❗ Tampilkan peringatan hanya jika form benar-benar diubah
  window.addEventListener("beforeunload", (e) => {
    if (formChanged) {
      const msg = "You have unsaved changes in the contact form. Leave anyway?";
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    }
  });

  // 🚀 Navigasi instan tanpa scroll animasi
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

      navMenu.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // 🍔 Toggle burger menu
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  // 💬 Modal logic
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

  // 👁️ Reveal saat scroll (berulang)
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

  // 🔁 Aktifkan smooth scroll default setelah load
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 100);
});
