import React, { FC } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Query, QueryDogArgs } from '../../generated/graphql';
import { GET_DOG_PHOTO } from '../manual/queries';
import { DogPhotoProps } from '../types';
import { DogPhotoTemplate } from '../DogPhotoTemplate';

export const DogPhotoLazy: FC<DogPhotoProps> = ({ breed }) => {
  const [getDogPhoto, result] = useLazyQuery<Query, QueryDogArgs>(GET_DOG_PHOTO);

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
