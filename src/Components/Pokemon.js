import React from 'react';


const Pokemon = ({id,name,image,type1,type2,color}) => {

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



	return (
		<div className='card'>
			<div style={styles} className='pokemon'>
				<img alt='pokemon' src={image} width = '200px' height = '200px' />
			</div>

			<div className='info'>
				<div className='name'>
					<h3 className='id'>n {pad(id,4)}</h3>
					<h3 className='name'>{name.charAt(0).toUpperCase()+name.slice(1)}</h3>
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