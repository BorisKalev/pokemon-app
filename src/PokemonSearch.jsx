import React, { useState, useEffect } from "react";

function PokemonSearch() {
  const listOfPokemons = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
  const [pokemonData, setPokemonData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [pokemonId, setPokemonId] = useState(1);

  const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  const fetchDefaultPokemon = async () => {
    try {
      const res = await fetch(`${listOfPokemons}/1`); // Fetching Bulbasaur by default (ID: 1)
      const data2 = await res.json();
      setPokemonData(data2);
    } catch (err) {
      alert("Failed to fetch the default Pokémon");
    }
  };

  useEffect(() => {
    fetchDefaultPokemon(); // Fetch default Pokémon on component mount
  }, []);

  const findPokemon = (data, data2) => {
    let find = false;
    data.results.forEach((pokemon) => {
      const inputId = parseInt(searchInput);
      const inputName = searchInput.toLowerCase();
      const { id, name, url } = pokemon;
      if (id === inputId || name.toLowerCase() === inputName) {
        console.log(`Pokemon ID: ${id}, Name: ${name}, URL: ${url}`);
        find = true;
        setPokemonId(id);
        setPokemonData(data2);
      }
    });

    if (!find) {
      alert("Pokemon not founddddd");
    }
  };

  /*
  fetching for when the arrows are clicked
  */

  const fetchPokemonById = async (id) => {
    try {
      setSearchInput("");
      const specificPokemonUrl = `${listOfPokemons}/${id}`;
      const res = await fetch(specificPokemonUrl);
      const data2 = await res.json();
      setPokemonData(data2);
      setPokemonId(id);
    } catch (err) {
      alert("Pokemon not found");
    }
  };

  const handleNextPokemon = () => {
    if (pokemonId !== null) {
      const nextId = pokemonId + 1;
      fetchPokemonById(nextId);
    }
  };

  const handlePreviousPokemon = () => {
    if (pokemonId > 1) {
      const prevId = pokemonId - 1;
      fetchPokemonById(prevId);
    }
  };

  const fetchData = async () => {
    try {
      const specificPokemonUrl = updateUrl(listOfPokemons);
      const res = await fetch(listOfPokemons);
      const data = await res.json();
      const res2 = await fetch(specificPokemonUrl);
      const data2 = await res2.json();
      findPokemon(data, data2);
    } catch (err) {
      alert("Pokemon not found");
    }
  };
  const updateUrl = (url) => {
    return `${url}/${searchInput.toLowerCase()}`;
  };

  const switchBetweenShinyAndNormal = () => {
    setIsShiny(!isShiny);
  };

  return (
    <>
      <h1>Pokémon Search App</h1>
      <div id="app">
        <p id="app-firstp">Search for Pokémon Name or ID:</p>
        <div id="input-button">
          <input
            id="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          ></input>
          <button id="search-button" onClick={fetchData}>
            Search
          </button>
        </div>
        {pokemonData && (
          <div id="information-pok">
            <div id="name-and-id">
              <p id="pokemon-name">{pokemonData.name.toUpperCase()}</p>
              <p id="pokemon-id">ID: {pokemonData.id}</p>
            </div>
            <div id="weight-and-height">
              <p id="weight">Weight: {pokemonData.weight}</p>
              <p id="height">Height: {pokemonData.height}</p>
            </div>

            <div id="img-arrows">
              <button id="arrows" onClick={handlePreviousPokemon}>
                <i class="bi bi-caret-left-fill"></i>
              </button>
              <img
                id="sprite"
                src={
                  isShiny
                    ? pokemonData.sprites.front_shiny
                    : pokemonData.sprites.front_default
                }
                alt={pokemonData.name}
              />
              <button id="arrows" onClick={handleNextPokemon}>
                <i class="bi bi-caret-right-fill"></i>
              </button>
            </div>

            <div id="types">
              {pokemonData.types.map((typeInfo, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: colours[typeInfo.type.name] }}
                >
                  {typeInfo.type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
        {pokemonData && (
          <div id="stats">
            <table>
              <thead>
                <tr>
                  <th>Base</th>
                  <th>Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HP:</td>
                  <td id="hp">{pokemonData.stats[0].base_stat}</td>
                </tr>
                <tr>
                  <td>Attack:</td>
                  <td id="attack">{pokemonData.stats[1].base_stat}</td>
                </tr>
                <tr>
                  <td>Defense:</td>
                  <td id="defense">{pokemonData.stats[2].base_stat}</td>
                </tr>
                <tr>
                  <td>Sp. Attack:</td>
                  <td id="special-attack">{pokemonData.stats[3].base_stat}</td>
                </tr>
                <tr>
                  <td>Sp. Defense:</td>
                  <td id="special-defense">{pokemonData.stats[4].base_stat}</td>
                </tr>
                <tr>
                  <td>Speed:</td>
                  <td id="speed">{pokemonData.stats[5].base_stat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        id="shiny-btn"
        onClick={switchBetweenShinyAndNormal}
        style={{
          backgroundColor: isShiny ? "#E4DFE8" : "#f1ba33",
        }}
      >
        {isShiny ? "normal" : "shiny"}
      </button>
    </>
  );
}

export default PokemonSearch;
