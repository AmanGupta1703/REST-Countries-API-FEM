// https://restcountries.com/v3.1/all

import {
	generateCountryCardHTML,
	generateCountryDetailHTML,
	fetchCountriesData,
	filterByRegion,
	render,
	searchCountry,
} from "./helper.js";

const data = await fetchCountriesData();

// TODO: CHECK HOW TO GET CURRENCY VALUE
// TODO: CHECK HOW TO GET LANGUAGES VALUE

const countryListContainerEl = document.querySelector(
	".main__country-list-container"
);

function setupCountrySearchForm() {
	const formSearchCountryEl = document.querySelector(".form--search-country");

	formSearchCountryEl.addEventListener("submit", function (e) {
		e.preventDefault();

		const countryToSearch = formSearchCountryEl.countryName.value;

		if (!countryToSearch) {
			return;
		}

		searchCountry(data, countryToSearch).then((data) => {
			render(countryListContainerEl, data, generateCountryCardHTML);
			handleCardClick();
		});

		formSearchCountryEl.reset();
	});
}

function setupRegionSelector() {
	const selectorHeaderEl = document.querySelector(".selector__header");
	const selectorTriggerEl = document.querySelector(".selector__trigger");
	const selectorIconEl = document.querySelector(".selector__icon");
	const selectorOptionsEl = document.querySelector(".selector__options");

	selectorHeaderEl.addEventListener("click", function () {
		selectorOptionsEl.classList.toggle("selector__options--hide");
		selectorOptionsEl.classList.toggle("selector__options--show");

		selectorIconEl.classList.toggle("selector__icon--active");
	});

	selectorOptionsEl.addEventListener("click", function (e) {
		const { region } = e.target.dataset;

		selectorTriggerEl.textContent = region;

		filterByRegion(data, region).then((data) => {
			if (!data.length) {
				console.log(0);

				countryListContainerEl.textContent =
					"<p>No countries found for this region</p>";
			}
			render(countryListContainerEl, data, generateCountryCardHTML);
			handleCardClick();
		});
	});
}

function handleCardClick() {
	const cardCountryEl = Array.from(document.querySelectorAll(".card--country"));

	const mainCountryDetailEl = document.querySelector(".main__country-detail"); // toggle hide class

	const mainContainerEl = document.querySelector(".main__container"); // toggle hide class
	const mainCountrySectionEl = document.querySelector(".main__country-section"); // toggle hide class

	// render details of a country
	const mainCountryDetailContainerEl = document.querySelector(
		".main__country-detail__container"
	);

	cardCountryEl.forEach((cardCountry) => {
		cardCountry.addEventListener("click", function (e) {
			const { countryname } = e.target.closest(".card")?.dataset;

			searchCountry(data, countryname).then((data) => {
				mainCountryDetailEl.classList.toggle("hide");
				mainContainerEl.classList.toggle("hide");
				mainCountrySectionEl.classList.toggle("hide");
				render(mainCountryDetailContainerEl, data, generateCountryDetailHTML);
			});
		});
	});
}

function toggleTheme() {
	const body = document.querySelector("body");
	const themeToggleEl = document.querySelector(".theme--toggle");

	themeToggleEl.addEventListener("click", function () {
		body.classList.toggle("dark");
	});
}

const btnBackEl = document.querySelector(".btn--back");

btnBackEl.addEventListener("click", function () {
	const mainCountryDetailEl = document.querySelector(".main__country-detail"); // toggle hide class

	const mainContainerEl = document.querySelector(".main__container"); // toggle hide class
	const mainCountrySectionEl = document.querySelector(".main__country-section"); // toggle hide class

	mainCountryDetailEl.classList.toggle("hide");
	mainContainerEl.classList.toggle("hide");
	mainCountrySectionEl.classList.toggle("hide");
});

function init() {
	setupCountrySearchForm();
	setupRegionSelector();
	toggleTheme();
	handleCardClick();
}

init();
