import {React,useState,useEffect,useCallback} from "react";
import Menu from './Menu';
import Pokemon from './Pokemon';
import Container from './Container';


const User = () => {
	
	const [all_pokemon, setAllPokemon] = useState(() => []);

  const [filteredList, setFilteredList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [favoritePokemon, setFavoritePokemon] = useState(() => {
    const favorites = localStorage.getItem('Favorite');
    const getFavorites = JSON.parse(favorites);
    return getFavorites ? getFavorites : [];
  });



  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=493&offset=0')
      .then((response) => response.json())
      .then((data) => {
        let results = data.results;
        let promisesArray = results.map((result) => {
          return fetch(result.url).then((response) => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then((pokemonData) => {
        const colorPromisesArray = pokemonData.map((pokemon) => {
          return fetch(pokemon.species.url).then((response) => response.json());
        });
        return Promise.all(colorPromisesArray).then((colorData) => {
          return pokemonData.map((pokemon, index) => {
            const isFavorite = favoritePokemon.includes(pokemon.id);
			if (isFavorite) {
            	return { ...pokemon, color: colorData[index].color.name, favorite: isFavorite }
			}
			return null;
          });
        });
      })
      .then((data) => {


        setAllPokemon(data.filter((pokemon) => {
			return pokemon !== null;
		}));
        setFilteredList(data.filter((pokemon) => {
			return pokemon !== null;
		}));
        setIsLoading(false);
      });

  }, [favoritePokemon]);



  useEffect(() => {
    localStorage.setItem("Favorite", JSON.stringify(favoritePokemon));
  }, [favoritePokemon]);


  const isFavorite = useCallback(
    (id) => {



      const updatedFilteredList = filteredList.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, favorite: !pokemon.favorite } : pokemon
      );

      const updatedAllPokemon = all_pokemon.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, favorite: !pokemon.favorite } : pokemon
      );

      setFilteredList(updatedFilteredList);
      setAllPokemon(updatedAllPokemon);

      const favoritePokemons = updatedFilteredList.filter((pokemon) => pokemon.favorite);
      setFavoritePokemon(favoritePokemons.map((pokemon) => pokemon.id));
    },
    [all_pokemon, filteredList]
  );



const pokedex = filteredList.map((pokemon,index) => {


	if (pokemon) {
		return (


		<>
				<Pokemon 
				key={index} 
				id = {pokemon.id} 
				name = {pokemon.name} 
				color = {pokemon.color}
				image = {pokemon.sprites.other['official-artwork'].front_default ? pokemon.sprites.other['official-artwork'].front_default : pokemon.sprites.other.home.front_default } 
				type1={pokemon.types[0].type.name} 
				type2={pokemon.types[1] ? pokemon.types[1].type.name : null}
				favoritePokemon = {pokemon.favorite}
				isFavorite = {isFavorite}
				/>

		</>
		
		  );
	}

	else {
		return null;
	}

  
})

console.log(filteredList);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
    <Menu/>
	<h1 style={{color: '#3A2F66C7'}}>Favorites </h1> 

    <Container>


			{pokedex}
   
		</Container>
    </div>
  );


}


export default User;