import React from 'react'
import AnimCard from '../AnimCard';
import { useAuth } from '../../Context/AuthProv';

function ShowcaseRow({animals, type}) {
    const animArr = animals.slice(0,5)
    const {shelterData, loggedIn} = useAuth()

  return (
		<div className="w-full max-w-screen-2xl mx-auto">

			<div className="flex justify-start py-4 flex-wrap gap-x-3 gap-y-0 items-center w-fit">
				{animArr.map((elem) => (
					<AnimCard
						key={elem._id}
						animal={elem}
						type={type}
						shelterData={shelterData}
						loggedIn={loggedIn}
					/>
				))}
			</div>
		</div>
	);
}

export default ShowcaseRow