        // Pobierz dane z API
        const apiUrl = 'https://restcountries.com/v3.1/all';

        // Funkcja do pobierania danych z API
        function fetchCountries() {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.name.common,
                        flag: country.flags.png,
                        population: country.population,
                        capital: country.capital ? country.capital[0] : "Brak danych",
                        region: country.region,
                    }));

                    // Wywołaj funkcję do wyświetlania danych kraju
                    function displayCountryData() {
                        const selectedContinents = Array.from(document.querySelectorAll('.continent-checkbox:checked')).map(checkbox => checkbox.value);
                        const filteredCountries = countries.filter(country => {
                            if (selectedContinents.length === 0) {
                                return true; // Wyświetl wszystkie kraje, gdy nie ma zaznaczonych checkboxów
                            } else {
                                return selectedContinents.includes(country.region);
                            }
                        });

                        const countryDataDiv = document.getElementById('country-data');
                        countryDataDiv.innerHTML = ''; // Wyczyść zawartość div

                        filteredCountries.forEach((country) => {
                            const countryDiv = document.createElement("div");
                            countryDiv.classList.add("country");

                            const flagImage = document.createElement("img");
                            flagImage.src = country.flag;
                            flagImage.alt = country.name;
                            flagImage.width = 100;
                            flagImage.height = 100;
                            flagImage.classList.add("flag");

                            const countryInfo = document.createElement("div");
                            countryInfo.classList.add("info");

                            const countryName = document.createElement("p");
                            countryName.textContent = `Kraj: ${country.name}`;

                            const countryPopulation = document.createElement("p");
                            countryPopulation.textContent = `Populacja: ${country.population}`;

                            const countryCapital = document.createElement("p");
                            countryCapital.textContent = `Stolica: ${country.capital}`;

                            countryInfo.appendChild(countryName);
                            countryInfo.appendChild(countryPopulation);
                            countryInfo.appendChild(countryCapital);

                            countryDiv.appendChild(flagImage);
                            countryDiv.appendChild(countryInfo);
                            countryDataDiv.appendChild(countryDiv);
                        });
                    }

                    // Nasłuchuj zmiany w checkboxach
                    const checkboxes = document.querySelectorAll('.continent-checkbox');
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', () => {
                            displayCountryData();
                        });
                    });

                    // Wywołaj funkcję do wyświetlania danych kraju po załadowaniu strony
                    displayCountryData();
                })
                .catch((error) => {
                    console.error("Błąd pobierania danych z API:", error);
                });
        }

        // Wywołaj funkcję pobierającą dane z API po załadowaniu strony
        document.addEventListener("DOMContentLoaded", fetchCountries);