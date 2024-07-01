// faq sekce

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".faq-item");

  accordions.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      const control = self.querySelector(".accordions-control");
      const content = self.querySelector(".accordions-content");

      self.classList.toggle("open");

      if (self.classList.contains("open")) {
        control.setAttribute("aria-expanded", true);
        content.setAttribute("aria-hidden", false);
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        control.setAttribute("aria-expanded", false);
        content.setAttribute("aria-hidden", true);
        content.style.maxHeight = null;
      }
    });
  });
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    const pwd = document.getElementById("pwd").value;
    const cpwd = document.getElementById("cpwd").value;
    const errorElement = document.getElementById("passwordMatchError");

    if (pwd !== cpwd) {
      errorElement.textContent = "Hesla se neshodují";
      event.preventDefault();
    } else {
      errorElement.textContent = "";
    }
  });
