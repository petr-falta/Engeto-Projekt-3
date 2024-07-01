window.onscroll = () => {
  // STICKY MENU
  const nav = document.querySelector("nav");
  if (window.scrollY > 0) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
  // BACK TO TOP
  const scrollPosition = window.pageY || document.documentElement.scrollTop; // Získejte aktuální vertikální pozici posunutí
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight; // Získejte aktuální výšku prohlížeče
  const documentHeight = document.documentElement.scrollHeight; // Získejte celkovou výšku dokumentu (včetně posunovatelné oblasti)
  const nearBottom = documentHeight - (scrollPosition + windowHeight) < 400; // Výpočet, zda se uživatel nachází do 400 px od spodku dokumentu

  // Zobrazit ikonu, když je uživatel do 400 px od spodku stránky
  const backToTop = document.getElementById("back-to-top");
  if (nearBottom) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling
  });
};

// MOBILE MENU
const menuIcon = document.querySelector(".menu-icon__cheeckbox");
const menuList = document.querySelector(".mobile-menu");
var overlay = document.querySelector(".overlay");

menuIcon.addEventListener("change", function () {
  if (this.checked) {
    menuList.style.display = "flex";
    overlay.style.display = "block";
  } else {
    menuList.style.display = "none";
    overlay.style.display = "none";
  }
});

// DARK / LIGHT
const storageKey = "theme-preference";

const onClick = () => {
  // převrátit aktuální hodnotu
  theme.value = theme.value === "light" ? "dark" : "light";

  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.value);

  document
    .querySelector("#theme-toggle")
    ?.setAttribute("aria-label", theme.value);
};

const theme = {
  value: getColorPreference(),
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  document.querySelector("#theme-toggle").addEventListener("click", onClick);
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });
