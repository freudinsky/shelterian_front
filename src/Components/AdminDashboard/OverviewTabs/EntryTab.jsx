import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Context/AuthProv';
import axios from 'axios';
import AnimCard from '../../AnimCard';

function EntryTab({type, animals} ) {
    // const [animals, setAnimals] = useState([]);
    // const { refresh } = useAuth()
		

    // useEffect(() => {
	// 	async function fetchAnimals() {
	// 		try {
	// 			const res = await axios.get(
	// 				`${import.meta.env.VITE_API_URL}admin/myentries`,
	// 				{ withCredentials: true }
	// 			);
	// 			if (res.status === 201 && res.data) {
	// 				if(type === "dog"){
    //                     setAnimals(res.data.dogs)
    //                 }else if(type === "cat"){
    //                     setAnimals(res.data.cats)
    //                 }
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchAnimals();
	// }, [refresh]);

  return (
		<div className="mt-0 mb-4 w-full max-w-screen-2xl mx-auto">
			<h2 className="text-2xl text-amber-950 font-bold ">Unsere Hunde</h2>
			<div className="flex py-4 justify-start flex-wrap gap-x-4 gap-y-0 items-center w-fit">
				{animals.map((animal) => (
					<AnimCard key={animal._id} animal={animal} type={type} />
				))}
			</div>
		</div>
	);
}

export default EntryTab