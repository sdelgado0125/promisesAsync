const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEAPI_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

$("#generate-pokemon").on("click", function () {
    fetch(`${POKEAPI_BASE_URL}?limit=1000`)
        .then(response => response.json())
        .then(data => {
            let allPokemon = data.results;
            let randomPokemon = getRandomPokemon(allPokemon, 3);

            return Promise.all(randomPokemon.map(pokemon => fetch(pokemon.url).then(res => res.json())));
        })
        .then(pokemonData => {
            return Promise.all(
                pokemonData.map(pokemon => {
                    return fetch(`${POKEAPI_SPECIES_URL}/${pokemon.id}`)
                        .then(res => res.json())
                        .then(speciesData => {
                            let descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
                            return {
                                name: pokemon.name,
                                image: pokemon.sprites.front_default,
                                description: descriptionEntry ? descriptionEntry.flavor_text : "No description available."
                            };
                        });
                })
            );
        })
        .then(pokemonWithDescriptions => {
            displayPokemon(pokemonWithDescriptions);
        })
        .catch(error => console.error("Error fetching Pokémon:", error));
});

function getRandomPokemon(allPokemon, count) {
    let randomPokemon = [];
    let usedIndices = new Set();

    while (randomPokemon.length < count) {
        let randomIndex = Math.floor(Math.random() * allPokemon.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            randomPokemon.push(allPokemon[randomIndex]);
        }
    }

    return randomPokemon;
}

function displayPokemon(pokemonList) {
    $("#pokemon-container").empty();
    
    pokemonList.forEach(pokemon => {
        let card = $(`
            <div class="pokemon-card">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <p>${pokemon.description}</p>
            </div>
        `);
        $("#pokemon-container").append(card);
    });
}
