document.addEventListener("DOMContentLoaded", function () {
   // Load header
   fetch("components/header.html")
      .then((response) => response.text())
      .then((data) => {
         document.getElementById("header-container").innerHTML = data;

         // Initialize mobile menu toggle after header is loaded
         initMobileMenu();
      })
      .catch((error) => console.error("Error loading header:", error));

   // Load footer
   fetch("components/footer.html")
      .then((response) => response.text())
      .then((data) => {
         document.getElementById("footer-container").innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));

   // Function to initialize mobile menu toggle
   function initMobileMenu() {
      const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
      const mainNav = document.querySelector(".main-nav");

      if (mobileMenuToggle && mainNav) {
         mobileMenuToggle.addEventListener("click", function () {
            this.classList.toggle("active");
            mainNav.classList.toggle("active");
         });
      }
   }
});
