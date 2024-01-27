function generateCountryCardHTML(data) {
	return data
		.map(
			(country) => `
				<div class="card card--country" data-countryName="${country.name.common}">
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

function generateCountryDetailHTML(data) {
	return data.map(
		(country) => `
    <div class="detail detail--country">
      <div class="detail__img-container">
        <img
          src="${country.flags?.svg}"
          alt="${country.flags?.alt || `${country.name?.common} flag`}"
          class="detail__img detail__img--flag" />
      </div>

      <div class="detail__body">
        <h1 class="detail__country-name">${country.name.common}</h1>

        <div class="row">
          <div class="col-1">
            <p class="detail__native-name">
              <strong>Native Name:</strong>
              ${
								country.name?.nativeName?.cat?.common ||
								"Native name not provided"
							}
            </p>

            <p class="detail__population">
              <strong>Population:</strong>
              ${
								country.population
									? country.population.toLocaleString()
									: "Population not available"
							}
            </p>

            <p class="detail__region">
              <strong>Region:</strong>
              ${country.region || "Region not defined"}
            </p>

            <p class="detail__sub-region">
              <strong>Sub Region:</strong>
              ${country.subregion || "Sub region not defined"}
            </p>

            <p class="detail__capital">
              <strong>Capital:</strong>
              ${country.capital?.[0] || "Capital not defined"}
            </p>
          </div>

          <div class="col-1">
            <p class="detail__domain">
              <strong>Top Level Domain:</strong>
              ${country.tld?.[0] || "Domain not defined"}
            </p>

            <p class="detail__currency">
              <strong>Currency:</strong>
              ${
								country.currencies
									? country.currencies[Object.keys(country.currencies)[0]].name
									: "Currency not defined"
							}
            </p>

            <p class="detail__language">
              <strong>Language:</strong>
              ${
								country.languages
									? Object.values(country.languages).join(", ")
									: "Language not defined"
							}
            </p>
          </div>
        </div>

        <div class="detail__border-country-list">
          <h3 class="detail__border-country__heading">Border Countries:</h3>

          <div class="border border--country-list">
            ${
							country.borders?.length && country.borders.length > 0
								? country.borders
										.map(
											(border) =>
												`<button class="btn btn--md btn--border">${border}</button>`
										)
										.join("")
								: "<p>No bordering countries found.</p>"
						}
          </div>
        </div>
      </div>
    </div>
  `
	);
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

async function filterByRegion(allCountries, region) {
	return allCountries.filter((country) => {
		return country.region.toLowerCase() === region.toLowerCase();
	});
}

async function render(element, data, callback) {
	element.innerHTML = "";
	element.insertAdjacentHTML("afterbegin", callback(data));
}

export {
	generateCountryCardHTML,
	generateCountryDetailHTML,
	fetchCountriesData,
	getAllRegions,
	searchCountry,
	filterByRegion,
	render,
};
