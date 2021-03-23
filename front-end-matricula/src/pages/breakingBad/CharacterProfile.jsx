import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseApi from '../../app/api/baseApi';

export default function CharacterProfile() {
	const [profile, setProfile] = useState(null);

	// Similar al OnLoad, ngOnInit
	useEffect(() => {
		// Obtener la información desde una API usando Fetch
		// const fetchData = async () => {
		// 	const response = await fetch(
		// 		'https://www.breakingbadapi.com/api/characters/1'
		// 	);
		// 	const jsonResponse = await response.json();
		// 	// console.log(jsonResponse[0]);
		// 	setProfile(jsonResponse[0]);
		// };

		// fetchData();
		// axios
		// 	.get('https://www.breakingbadapi.com/api/characters/1')
		// 	.then(({ data }) => {
		// 		setProfile(data[0]);
		// 	})
		// 	.catch((error) => console.error(error));
		baseApi
			.get('/characters/1')
			.then((response) => setProfile(response[0]))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			{/* if(profile){} */}
			{profile && (
				<>
					<p>
						<strong>Name: </strong>
						{profile.name}
					</p>
					<p>
						<strong>Nickname: </strong>
						{profile.nickname}
					</p>
					<p>
						<strong>Status: </strong>
						{profile.status}
					</p>
					<p>
						<strong>Birthday: </strong>
						{profile.birthday}
					</p>
					<img src={profile.img} alt={profile.name} />
					<ul>
						{profile.occupation.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
