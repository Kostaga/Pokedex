import './App.css';
import Menu from './Components/Menu';
import Search from './Components/Search';
import Pokemon from './Components/Pokemon';
import Container from './Components/Container';
import {React,useEffect,useState,useCallback} from 'react';

function App() {

  const [all_pokemon, setAllPokemon] = useState(() => []);

  const [filteredList, setFilteredList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [favoritePokemon, setFavoritePokemon] = useState(() => {
    const favorites = localStorage.getItem('Favorite');
    const getFavorites = JSON.parse(favorites);
    return getFavorites ? getFavorites : [];
  });




  const filterResults = (query) => {
    const filtered = all_pokemon.filter(pokemon => {
      const name = pokemon.name.toLowerCase();
      const id = pokemon.id.toString();
      return (name.includes(query.toLowerCase()) || id.includes(query.toLowerCase()));
    });


    setFilteredList(filtered);
  };

 


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
            return { ...pokemon, color: colorData[index].color.name, favorite: isFavorite };
          });
        });
      })
      .then((data) => {
        setAllPokemon(data);
        setFilteredList(data);
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

  return (
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

  );
})


  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
    <Menu/>
    <Search onSearch = {filterResults}/>
    <Container>

			{pokedex}
   
		</Container>
    </div>
  );
}

export default App;
