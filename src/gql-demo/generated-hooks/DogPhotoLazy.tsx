import React, { FC } from 'react';
import { useGetDogPhotoLazyQuery } from '../../generated/graphql';
import { DogPhotoProps } from '../types';
import { DogPhotoTemplate } from '../DogPhotoTemplate';

export const DogPhotoLazy: FC<DogPhotoProps> = ({ breed }) => {
  const [getDogPhoto, result] = useGetDogPhotoLazyQuery();

  return (
    <DogPhotoTemplate
      result={result}
      button={{
        text: 'Get dog lazily',
        onClick: () => getDogPhoto({ variables: { breed: breed || '' } }),
      }}
    />
  );
};
