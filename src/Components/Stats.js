import React from "react";
import '../Focus.css'


const Stats = ({selected,handleClick, currentPokemon}) => {


	console.log(currentPokemon);

	const li_styles = {
		color: '#605A7666',
	  };

	return (
	<div className="warper">
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
	  </div>

	  <div className="stats">

		<div>
			<h2>Height</h2>
			<h3>{currentPokemon.height*10} cm</h3>
		</div>

		<div>
			<h2>Weight</h2>
			<h3>{currentPokemon.weight} kg</h3>
		</div>

		<div>
			<h2>Pokemon id</h2>
			<h3>{currentPokemon.id}</h3>
		</div>

		<div>
			<h2>Color</h2>
			<h3>{currentPokemon.color.charAt(0).toUpperCase() + currentPokemon.color.slice(1)}</h3>
		</div>
		

	  </div>
	</div>
	);

}


export default Stats;