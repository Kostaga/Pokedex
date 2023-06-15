import React, { useEffect } from 'react';
import Menu from './Menu';
import '../App.css';
import '../Focus.css';
import { Link, useParams } from 'react-router-dom';




const Focus = () => {

	const {id} = useParams();

	const [currentPokemon, setCurrentPokemon] = React.useState(null);
	const [selected, setSelected] = React.useState('Forms');
	const [isLoading, setIsLoading] = React.useState(true);
	
	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		  .then((response) => response.json())
		  .then((pokemonData) => {
			return fetch(pokemonData.species.url).then((response) => response.json())
			  .then((speciesData) => {
				return fetch(speciesData.color.url).then((response) => response.json())
				  .then((colorData) => {
					return { ...pokemonData, color: colorData.name };
				  });
			  });
		  })
		  .then((data) => {
			setCurrentPokemon(data);
			setIsLoading(false);
		  });
	  }, [id]);
	
	
	  if (isLoading) {
		return <h1>Loading...</h1>;
	  }
	
	  if (!currentPokemon) {
		return <h1>No data available.</h1>;
	  }

	const handleClick = (event) => {
		const value = event.target.innerText;
		
		setSelected(value);
	}



	const li_styles = {
		color: '#605A7666'
	}


	// add leading 0's to ID
	function pad(num, size) {
		let s = '0000' + num;
		return s.substr(s.length-size);
	}



	const getTypeColor = (type) => {
		const typesToColors = {
			Normal: "#A8A878",
		  	Fire: "#F08030",
		  	Water: "#6890F0",
		  	Electric: "#F8D030",
		  	Grass: "rgba(0, 225,25, 1)",
		  	Ice: "#98D8D8",
		  	Fighting: "#C03028",
		  	Poison: "#c56dc5",
		  	Ground: "#E0C068",
		  	Flying: "#A890F0",
		  	Psychic: "#F85888",
		  	Bug: "#A8B820",
		  	Rock: "#B8A038",
		  	Ghost: "#705898",
		  	Dragon: "#7038F8",
		  	Dark: "#705848",
		  	Steel: "#B8B8D0",
		  	Fairy: "#EE99AC"
		}

		if (typesToColors.hasOwnProperty(type)) {
			return typesToColors[type];
		}
	}

	//Generate color with transparency
	const getColorWithTransparency = (colorName, transparency) => {
		const colorValues = {
		  red: '255, 0, 0',
		  green: '0, 255, 0',
		  blue: '0, 0, 255',
		};
	
		if (colorName in colorValues) {
		  return `rgba(${colorValues[colorName]}, ${transparency})`;
		}
	
		return colorName; 	  };


	// Get specific styles for image background color
	// and types to show according to species 
	  const styles = {
		backgroundColor: getColorWithTransparency(currentPokemon.color, 0.45), 
	  };

	  const typeStyles = {
		backgroundColor: getTypeColor(currentPokemon?.types[0]?.type.name.charAt(0).toUpperCase() + currentPokemon?.types[0]?.type.name.slice(1)),
		color: 'white',
	  };
	
	  const type2Styles = currentPokemon?.types[1]?.type.name ? {
		backgroundColor: getTypeColor(currentPokemon?.types[1]?.type.name.charAt(0).toUpperCase() + currentPokemon?.types[1]?.type.name.slice(1)),
		color: 'white'
	  } : null;





	return (
		
		<div className="App Focus">

			<Menu />
			

			<div className='container_focus'>
		

			<div className='main-container'>

				<div className='warper'>
				
					<div className='info_focus'>
							<div className='name'>
								<h3 className='id'>n {pad(currentPokemon.id,4)}</h3>
								<h3 className='name'>{currentPokemon.name.charAt(0).toUpperCase()+currentPokemon.name.slice(1)}</h3>
							</div>
							<div className='type_focus'>
								<div style={typeStyles} 
								className='type_focus type1_focus'>
									{currentPokemon.types[0].type.name.charAt(0).toUpperCase()+currentPokemon.types[0].type.name.slice(1)}
								</div>

								<div style={currentPokemon?.types[1]?.type.name ? type2Styles : null} className='type_focus type2_focus'>
									{currentPokemon?.types[1]?.type.name ? currentPokemon.types[1].type.name.charAt(0).toUpperCase()+currentPokemon.types[1].type.name.slice(1) : null}
								</div>
							</div>
					</div>
						
					<div style={styles}  className='pokemon_focus'>
						<img alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'300px'} height={'300px'}/>
					</div>
	
					</div>

					<div className='warper'>

					<ul className='details'>
						<li className='li_item' style={selected !== 'Forms' ? li_styles : null} onClick={handleClick}>Forms</li>
						<li className='li_item' style={selected !== 'Detail' ? li_styles : null} onClick={handleClick}>Detail</li>
						<li className='li_item' style={selected !== 'Stats' ? li_styles : null} onClick={handleClick}>Stats</li>
					</ul>

					<div className='forms'>
						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>
						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>
						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>
						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>
					</div>

					<h2 className='form_name'>Mega Charizard</h2>

					<h3 className='form_description'>The overwhelming power that fills its entire body causes it to turn black and creates intense blue flames.</h3>

					</div>

					<Link to={'/'}>
					<button className='goBack' type='text'>Go back</button>
					</Link>
				
			</div>



			</div>
		</div>
	);
}


export default Focus;