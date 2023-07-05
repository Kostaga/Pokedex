import React from 'react';
import Pokemon_Icon from '../imgs/podekex 1.png';
import Pokemon_Profile from '../imgs/profile 1.png';
import {Link} from "react-router-dom";
// <Link to="/Dashboard"> Dashboard </Link>

const Menu = () => {

	const handleScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<nav className='navbar'>
			<div style={{cursor: 'pointer'}} onClick={handleScroll}>
				<Link to='/'>
					<img alt='pokemon_icon' src={Pokemon_Icon}/>
				</Link>
			</div>
			
			<Link to ='/User'>
				<img alt='pokemon_profile' src={Pokemon_Profile}/>
			</Link>

		</nav>
	);

}


export default Menu;