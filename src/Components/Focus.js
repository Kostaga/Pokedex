import React from 'react';
import Menu from './Menu';
import '../App.css';
import '../Focus.css';
import { Link } from 'react-router-dom';
import Bulb from "../imgs/bulb_test.png";



const Focus = () => {
	return (
		
		<div className="App Focus">

			<Menu />
			

			<div className='container_focus'>
		

			<div className='main-container'>

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

					<div className='warper'>

					<ul className='details'>
						<li>Forms</li>
						<li>Detail</li>
						<li>Stats</li>
					</ul>

					<div className='forms'>
						<img alt='pokemon' src={Bulb} width={'100px'} height={'100px'}/>
						<img alt='pokemon' src={Bulb} width={'100px'} height={'100px'}/>
						<img alt='pokemon' src={Bulb} width={'100px'} height={'100px'}/>
						<img alt='pokemon' src={Bulb} width={'100px'} height={'100px'}/>
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