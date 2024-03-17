import { ApolloError, NetworkStatus } from '@apollo/client';
import { GetDogPhotoQuery } from '../generated/graphql';
import React, { FC, MouseEventHandler } from 'react';
import { Image } from './Image';

type DogPhotoTemplateProps = {
  result: {
    loading: boolean;
    error?: ApolloError;
    data?: GetDogPhotoQuery;
    networkStatus: NetworkStatus;
  };
  button: {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
};

export const DogPhotoTemplate: FC<DogPhotoTemplateProps> = ({
  result: { loading, error, data, networkStatus },
  button,
}) => {
  if (loading) {
    if (networkStatus === NetworkStatus.refetch) {
      return <div>Refetching...</div>;
    }
    return <div>Loading...</div>;
  }
  if (error) return <div>{`Error! ${error}`}</div>;

  return (
    <div>
      {data?.dog?.displayImage ? <Image src={data.dog.displayImage} /> : 'No dog image'}
      <div>
        <button onClick={button.onClick}>{button.text}</button>
      </div>
    </div>
  );
};
