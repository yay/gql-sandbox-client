import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Query, QueryDogArgs } from '../../generated/graphql';
import { GET_DOG_PHOTO } from '../manual/queries';
import { DogPhotoProps } from '../types';
import { DogPhotoTemplate } from '../DogPhotoTemplate';

export const DogPhoto: FC<DogPhotoProps> = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery<Query, QueryDogArgs>(GET_DOG_PHOTO, {
    variables: { breed: breed || '' },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <DogPhotoTemplate
      result={{ loading, error, data, networkStatus }}
      button={{
        text: 'Refetch new breed',
        onClick: () => {
          void refetch({ breed: 'african' });
        },
      }}
    />
  );
};
