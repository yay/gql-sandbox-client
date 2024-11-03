import React, { FC, useState } from 'react';
import { DogSelector } from './DogSelector';
import { DogPhoto } from './DogPhoto';
import { DogPhotoLazy } from './DogPhotoLazy';

// Sample query:
//
//   query GetDog {
//     dog(breed: "african") {
//       id
//       displayImage
//     }
//   }
//

export const GraphQLDemo: FC = () => {
	const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

	const onDogSelected: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
		setSelectedDog(target.value);
	};

	return (
		<div style={{ padding: '10px' }}>
			<DogSelector onDogSelected={onDogSelected} />
			{selectedDog && (
				<div>
					<p>
						<DogPhoto breed={selectedDog} />
					</p>
					<p>
						<DogPhotoLazy breed={selectedDog} />
					</p>
				</div>
			)}
		</div>
	);
};
