import React from 'react';
import {Link} from "react-router-dom";



const Pokemon = ({id,name,image,type1,type2,color,isFavorite,favoritePokemon}) => {

	
	const handleClick = () => {

		isFavorite(id);

	}


	const heart = favoritePokemon ? <svg onClick={handleClick}  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="heart bi bi-heart-fill" viewBox="0 0 16 16">
	<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>  : <svg onClick={handleClick}  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="heart bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/> </svg>


	// add leading 0's to ID
	function pad(num, size) {
		let s = "0000" + num;
		return s.substr(s.length-size);
	}


	//Get color type
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
		backgroundColor: getColorWithTransparency(color, 0.45), 
	  };

	  const typeStyles = {
		backgroundColor: getTypeColor(type1.charAt(0).toUpperCase()+type1.slice(1)),
		color: 'white',
	  }

	  const type2Styles = type2 ? {
		backgroundColor: getTypeColor(type2.charAt(0).toUpperCase()+type2.slice(1)),
		color: 'white'
	  } : null


	  const pokemonLink = `/Focus/${id}`;

	return (
		<div className='card'>
			<div style={styles} className='pokemon'>
		<Link to={pokemonLink}>
				<img alt='pokemon' src={image} width = '200px' height = '200px' />
				</Link>
			</div>

			<div className='info'>
				<div className='name'>
					<h3 className='id'>n {pad(id,4)}</h3>
					<h3 className='name'>{name.charAt(0).toUpperCase()+name.slice(1)}</h3>
					{heart}

				</div>
				<div className='type'>
					<div style={typeStyles} className='type type1'>{type1.charAt(0).toUpperCase()+type1.slice(1)}</div>
					<div style={type2 ? type2Styles : null}  className='type type2'>{type2 ? type2.charAt(0).toUpperCase()+type2.slice(1) : null}</div>
				</div>
			</div>

		</div>
	);

}


export default Pokemon;