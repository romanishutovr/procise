const openMenu = document.querySelector(".menu-open");
const closeMenu = document.querySelector(".menu-close");
const menuDiv = document.querySelector(".ozmenu");
const menu = document.querySelector(".ozmenu-nav");
const dropDowns = menu.getElementsByClassName("nav-dropdown");
const dropDownsChild = menu.querySelectorAll(".dropdown .nav-dropdown");

openMenu.addEventListener("click", menuToggle);
closeMenu.addEventListener("click", menuToggle);

document.body.insertAdjacentHTML("beforeend", "<div id='menu-overlay'></div>");
document.querySelector("#menu-overlay").addEventListener("click", menuToggle);

function menuToggle() {
  menuDiv.classList.toggle("active");
  document.body.classList.toggle("hide-scrolling");
  document.body.classList.toggle("ozmenu-active");
  document.getElementById("menu-overlay").classList.toggle("show");
}

for (var i = 0; i < dropDownsChild.length; i++) {
  dropDownsChild[i].classList.add("child");
  dropDownsChild[i].addEventListener("click", function () {
    this.classList.toggle("opened");
  });
}
for (var i = 0; i < dropDowns.length; i++) {
  if (!dropDowns[i].classList.contains("child")) {
    dropDowns[i].classList.add("parent");
    dropDowns[i].addEventListener("click", function () {
      this.classList.toggle("opened");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const elem = document.querySelector(".solutions");
  const menuNav = document.querySelector(".dropdown-menu");

  elem?.addEventListener("mouseover", function (e) {
    const first = elem.querySelector(".pos1");
    if (e.target.classList.contains("items")) {
      first.classList.replace("block", "hidden");

      return;
    }
    if (
      e.target.classList.contains("name") ||
      e.target.classList.contains("arrow") ||
      e.target.classList.contains("title")
    ) {
      first.classList.replace("hidden", "block");
      return;
    }
  });
  return;
});

document.addEventListener("DOMContentLoaded", function () {
  const elem = document.querySelector(".products");
  const menuNav = document.querySelector(".dropdown-menu");

  elem?.addEventListener("mouseover", function (e) {
    const first = elem.querySelector(".pos1");
    if (e.target.classList.contains("items")) {
      first.classList.replace("block", "hidden");

      return;
    }
    if (
      e.target.classList.contains("name") ||
      e.target.classList.contains("arrow") ||
      e.target.classList.contains("title")
    ) {
      first.classList.replace("hidden", "block");
      return;
    }
  });
  return;
});
