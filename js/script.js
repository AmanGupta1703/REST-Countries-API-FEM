// https://restcountries.com/v3.1/all

import {
	fetchCountriesData,
	filterByRegion,
	render,
	searchCountry,
} from "./helper.js";

import { toggleTheme } from "./utility.js";

const data = await fetchCountriesData();

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
			render(countryListContainerEl, data);
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
			render(countryListContainerEl, data);
			handleCardClick();
		});
	});
}

function handleCardClick() {
	const cardCountryEl = Array.from(document.querySelectorAll(".card--country"));
	cardCountryEl.forEach((cardCountry) => {
		cardCountry.addEventListener("click", function (e) {
			const { countryname } = e.target.closest(".card")?.dataset;

			const encodedCountryName = encodeURIComponent(countryname);

			const newUrl = `country-details.html?countryName=${encodedCountryName}`;

			console.log(newUrl);

			window.location.href = newUrl;
		});
	});
}

function init() {
	setupCountrySearchForm();
	setupRegionSelector();
	toggleTheme();
	handleCardClick();
}

init();
