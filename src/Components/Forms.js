import React from 'react';
import '../App.css';
import '../Focus.css';

const Forms = ({currentPokemon,styles,typeStyles,type2Styles,pad,li_styles,handleClick,selected}) => {
	return (
		<>		
		

					<div className='warper'>

					<ul className='details'>
						<li className='li_item' style={selected !== 'Forms' ? li_styles : null} onClick={handleClick}>Forms</li>
						<li className='li_item' style={selected !== 'Detail' ? li_styles : null} onClick={handleClick}>Detail</li>
						<li className='li_item' style={selected !== 'Stats' ? li_styles : null} onClick={handleClick}>Stats</li>
					</ul>

					<div className='forms'>

						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other['official-artwork'].front_shiny ? currentPokemon.sprites.other['official-artwork'].front_shiny : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>
						
						<img style={styles} alt='pokemon' src={currentPokemon.sprites.other.dream_world.front_default ? currentPokemon.sprites.other.dream_world.front_default : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>

						<img style={styles} alt='pokemon' src={currentPokemon.sprites.front_default ? currentPokemon.sprites.front_default  : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>

						<img style={styles} alt='pokemon' src={currentPokemon.sprites.front_shiny ? currentPokemon.sprites.front_shiny : currentPokemon.sprites.other.home_front_default} width={'100px'} height={'100px'}/>

					</div>

					<h2 className='form_name'>{currentPokemon.name.charAt(0).toUpperCase()+currentPokemon.name.slice(1)}</h2>

					<h3 className='form_description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>

					</div>
				</>

	);
}


export default Forms;