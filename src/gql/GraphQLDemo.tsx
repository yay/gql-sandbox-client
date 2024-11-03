import React, { type FC, type ChangeEventHandler, useState, startTransition } from 'react';
import { DogSelector } from './DogSelector';
import { DogPhoto } from './DogPhoto';
import { DogPhotoSuspense } from './DogPhotoSuspense';
import { DogPhotoLazy } from './DogPhotoLazy';
import { DogsGeneratedHooksContainer } from './DogsGeneratedHooks';

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

	const onDogSelected: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
		// Error:
		// A component suspended while responding to synchronous input.
		// This will cause the UI to be replaced with a loading indicator.
		// To fix, updates that suspend should be wrapped with `startTransition`.
		startTransition(() => {
			setSelectedDog(target.value);
		});
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
						<DogPhotoSuspense breed={selectedDog} />
					</p>
					<p>
						<DogPhotoLazy breed={selectedDog} />
					</p>
				</div>
			)}
			<DogsGeneratedHooksContainer />
		</div>
	);
};
