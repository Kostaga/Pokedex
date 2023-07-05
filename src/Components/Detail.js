import React, { useEffect, useState } from 'react';
import '../Focus.css';


const Detail = ({ selected, handleClick, id }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);


  useEffect(() => {
	let isMounted = true;
  
	const fetchPokemonData = async () => {
	  try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const pokemonData = await response.json();
  

  
		const speciesUrl = pokemonData.species.url;
		const speciesResponse = await fetch(speciesUrl);
		const speciesData = await speciesResponse.json();
  
  
		const evolutionChainUrl = speciesData.evolution_chain.url;
		const evolutionChainResponse = await fetch(evolutionChainUrl);
		const evolutionChainData = await evolutionChainResponse.json();
  

  
		const current = evolutionChainData.chain.species.name;
		setCurrentPokemon({
		  name: current,
		  sprite: null,
		});
  

  
		const evolvesTo = evolutionChainData.chain.evolves_to;
  

  
		if (evolvesTo.length > 0) {
		  const previous = evolvesTo[0].species.name;
		  setPreviousPokemon({
			name: previous,
			sprite: null,
		  });
  
		  const fetchSprite = async (pokemon) => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
			const data = await response.json();
			const sprite = data.sprites?.other['official-artwork'].front_default;
			return sprite || null;
		  };
  
		  const currentSprite = await fetchSprite(current);

		  if (isMounted) {
			setCurrentPokemon((prevState) => ({
			  ...prevState,
			  sprite: currentSprite,
			}));
		  }
  
		  const previousSprite = await fetchSprite(previous);

		  if (isMounted) {
			setPreviousPokemon((prevState) => ({
			  ...prevState,
			  sprite: previousSprite,
			}));
		  }
  
		  const next = evolvesTo[0].evolves_to.map((evolution) => ({
			name: evolution.species.name,
			sprite: null,
		  }));
		  setNextPokemon(next);
  
		  const nextSprites = await Promise.all(
			next.map(async (pokemon) => {
			  const sprite = await fetchSprite(pokemon.name);
			  return { ...pokemon, sprite };
			})
		  );
  
		  if (isMounted) {
			setNextPokemon(nextSprites.length > 0 ? nextSprites : [{ name: 'No evolution', sprite: null }]);
		  }
		} else {
		  setPreviousPokemon({ name: 'No evolution', sprite: null });
		  setNextPokemon([{ name: 'No evolution', sprite: null }]);
		}
	  } catch (error) {
		console.log('Error:', error);
	  }
	};
  
	fetchPokemonData();
  
	return () => {
	  isMounted = false;
	};
  }, [id]);
  
  


  const li_styles = {
    color: '#605A7666',
  };
  


  return (
    <div className="warper">
      <ul className="details">
        <li className="li_item" style={selected !== 'Forms' ? li_styles : null} onClick={handleClick}>
          Forms
        </li>
        <li className="li_item" style={selected !== 'Detail' ? li_styles : null} onClick={handleClick}>
          Detail
        </li>
        <li className="li_item" style={selected !== 'Stats' ? li_styles : null} onClick={handleClick}>
          Stats
        </li>
      </ul>

      <div className="evolution_wraper">

	  <div className="evolution">
          <div className="pokemon_evo">
            <img alt="evolution" src={currentPokemon ? currentPokemon.sprite : null} width='150px' />
          </div>
          <h2>{currentPokemon ? `${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}` : 'No Current Evolution'}</h2>
        </div>


        <div className="evolution">
          <div className="pokemon_evo">
            <img alt="evolution" src={previousPokemon ? previousPokemon.sprite : null} width='150px' />
          </div>
          <h2>{previousPokemon ? `${previousPokemon.name.charAt(0).toUpperCase() + previousPokemon.name.slice(1)}` : 'No Previous Evolution'}</h2>
        </div>

        
        <div className="evolution">
          <div className="pokemon_evo">
            <img alt="evolution" src={nextPokemon ? nextPokemon[0].sprite : null} width='150px' />
          </div>
          <h2>{nextPokemon ? `${nextPokemon[0].name.charAt(0).toUpperCase() + nextPokemon[0].name.slice(1)}` : 'No Next Evolution'}</h2>
        </div>
      </div>
    </div>
  );
};

export default Detail;
