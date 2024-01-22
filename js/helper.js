function generateCountryCardHTML(data) {
	return data
		.map(
			(country) => `
				<div class="card card--country">
					<div class="card__header">
						<img
							src=${country.flags.svg}
							alt=${country?.flags?.alt || `${country.name.common} flag`}
							class="card__img card__img--country-flag" />
					</div>
					<div class="card__body">
						<h1 class="card__country-name">${country.name.common}</h1>
						<p class="card__text card__country-population">
							Population:
							<span class="card__text__value card__country-population__value">
								${country.population.toLocaleString()}
							</span>
						</p>
						<p class="card__text card__country-region">
							Region:
							<span class="card__text__value card__country-region__value">
								${country.region}
							</span>
						</p>
						<p class="card__text card__country-capital">
							Capital:
							<span class="card__text__value card__country-capital__value">
								${country.capital?.[0]}
							</span>
						</p>
					</div>
				</div>
			`
		)
		.join("");
}

async function fetchCountriesData() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	const data = await response.json();
	return data;
}

async function getAllRegions(allCountries) {
	const regions = allCountries.map((country) => {
		return country.region;
	});
	return [...new Set(regions)];
}

// TODO: TRY TO IMPROVE THE SEARCH FUNCTIONALITY
async function searchCountry(allCountries, countryToSearch) {
	return allCountries.filter((country) => {
		const { common } = country.name;

		return common.toLowerCase().includes(countryToSearch.toLowerCase());
	});
}

async function filterByRegion(allCountries) {
	return allCountries.filter((country) => {
		return country.region.toLowerCase() === sortByRegion.toLowerCase();
	});
}

async function render(element, data) {
	element.innerHTML = "";
	element.insertAdjacentHTML("afterbegin", generateCountryCardHTML(data));
}

export {
	generateCountryCardHTML,
	fetchCountriesData,
	getAllRegions,
	searchCountry,
	filterByRegion,
	render,
};
