import React from 'react';
import Menu from './Menu';
import Container from './Container';
import '../App.css';
import '../Focus.css';
import { Link } from 'react-router-dom';
import Bulb from "../imgs/bulb_test.png";



const Focus = () => {
	return (
		
		<div className="App Focus">

			<Menu />
			<Link to={'/'}>
			<button className='goBack' type='text'>Go back</button>
			</Link>
			<Container>


			<div className='warper'>
			
				<div className='info_focus'>
						<div className='name'>
							<h3 className='id'>n 001</h3>
							<h3 className='name'>Bulbasaur</h3>
						</div>
						<div className='type_focus'>
							<div className='type_focus type1_focus'>Grass</div>
							<div className='type_focus type2_focus'>Poison</div>
						</div>
				</div>
					
				<div  className='pokemon_focus'>
				<img alt='pokemon' src={Bulb} width={'300px'} height={'300px'}/>
			</div>

			</div>




			</Container>
		</div>
	);
}


export default Focus;