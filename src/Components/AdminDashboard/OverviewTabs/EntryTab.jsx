import React from 'react';
import AnimCard from '../../AnimCard';

function EntryTab({type, animals} ) {
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