// https://restcountries.com/v3.1/all

import { fetchCountriesData, render, searchCountry } from "./helper.js";

const data = await fetchCountriesData();

const formSearchCountryEl = document.querySelector(".form--search-country");
const countryListContainerEl = document.querySelector(
	".main__country-list-container"
);

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
