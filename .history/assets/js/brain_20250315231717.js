document.addEventListener("DOMContentLoaded", function () {
  // Burger Menu
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".main-header nav ul");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModalButton = document.querySelector(".close");
  // dark mode
  // const toggleButton = document.getElementById("darkModeToggle");
  // const body = document.body;

  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  window.showModal = function (title, text) {
    if (modal && modalTitle && modalText) {
      modalTitle.textContent = title;
      modalText.textContent = text;
      modal.style.display = "flex";
    }
  };

  window.closeModal = function () {
    if (modal) {
      modal.style.display = "none";
    }
  };

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  window.addEventListener("click", function (event) {
    if (modal && event.target === modal) {
      closeModal();
    }
  });

  // // Cek apakah mode gelap aktif sebelumnya
  // if (localStorage.getItem("darkMode") === "enabled") {
  //   body.classList.add("dark-mode");
  //   toggleButton.textContent = "☀️";
  // }

  // toggleButton.addEventListener("click", function () {
  //   body.classList.toggle("dark-mode");

  //   // Simpan status mode di localStorage
  //   if (body.classList.contains("dark-mode")) {
  //     localStorage.setItem("darkMode", "enabled");
  //     toggleButton.textContent = "☀️";
  //   } else {
  //     localStorage.setItem("darkMode", "disabled");
  //     toggleButton.textContent = "🌙";
  //   }
  // });
});
