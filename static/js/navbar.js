const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  if (hamburger.classList.contains("active")) {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }
}

navLinks.forEach(item => {
	item.addEventListener("click", function() {
		console.log("hamburger.classList: ", navMenu.classList)
		if (navMenu.classList.contains("active")) {
			navMenu.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});
});