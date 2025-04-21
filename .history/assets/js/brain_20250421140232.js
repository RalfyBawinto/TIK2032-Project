document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const contactForm = document.querySelector("#contact-form");

  let formChanged = false; // Flag untuk mendeteksi perubahan pada form

  // Menangani perubahan form
  if (contactForm) {
    contactForm.addEventListener("input", () => {
      formChanged = true; // Tandai form telah diubah
    });

    // Prevent form submission jika ada perubahan
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
          contactForm.reset(); // Reset form setelah berhasil kirim
          formChanged = false; // Reset flag form berubah
          showModal("Thank You!", "Your message has been sent successfully.");
        } else {
          showModal("Oops!", "There was a problem sending your message.");
        }
      } catch (error) {
        showModal("Error", "Something went wrong. Please try again later.");
      }
    });
  }

  // Peringatan jika pengguna ingin me-refresh halaman dengan form yang belum dikirim
  window.addEventListener("beforeunload", (e) => {
    if (formChanged) {
      const confirmationMessage =
        "You have unsaved changes in the contact form. Are you sure you want to leave?";
      (e || window.event).returnValue = confirmationMessage; // Untuk browser lama
      return confirmationMessage; // Untuk browser modern
    }
  });

  // ✅ Nav menu click (instant scroll + observer trigger)
  document.querySelectorAll(".main-header nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();

        document.documentElement.style.scrollBehavior = "auto";
        targetEl.scrollIntoView({ behavior: "auto" });

        // 🧠 Trigger observer again after scrolling
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "smooth";

          // 👇 Manual trigger visibility check
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

  // 🍔 Burger toggle
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

  // 👁️ Scroll reveal (berulang-ulang, bukan sekali saja)
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

  // Default: smooth scroll aktif untuk scroll biasa
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 100);
});
