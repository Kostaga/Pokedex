import React from 'react';


const Search = ({onSearch}) => {

	const [SearchBox,setSearchBox] = React.useState("");


	const handleChange = (event) => {
		const {value} = event.target;
		setSearchBox(value);
		onSearch(value);
	
	}

	console.log(SearchBox);

	return (
		<div className='search'>
			<h2>Pokedex</h2>
			<h3>Search for a Pokemon by name or using its National Pokedex Number</h3>
			<input 
			type='text' 
			placeholder='🔍  Name or number'
			id='name'
			name="pokemon"
			value = {SearchBox}
			onChange={handleChange}>

			</input>
		</div>
	);
}


export default Search;