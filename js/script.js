// https://restcountries.com/v3.1/all

import {
	fetchCountriesData,
	filterByRegion,
	render,
	searchCountry,
} from "./helper.js";

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
			console.log(data);
			render(countryListContainerEl, data);
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

function init() {
	setupCountrySearchForm();
	setupRegionSelector();
	toggleTheme();
}

init();
