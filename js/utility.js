function toggleTheme() {
	const body = document.querySelector("body");
	const themeToggleEl = document.querySelector(".theme--toggle");

	themeToggleEl.addEventListener("click", function () {
		body.classList.toggle("dark");
	});
}

export { toggleTheme };
