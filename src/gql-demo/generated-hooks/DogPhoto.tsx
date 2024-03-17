import React, { FC } from 'react';
import { DogPhotoProps } from '../types';
import { useGetDogPhotoQuery } from '../../generated/graphql';
import { DogPhotoTemplate } from '../DogPhotoTemplate';

export const DogPhoto: FC<DogPhotoProps> = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useGetDogPhotoQuery({
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
