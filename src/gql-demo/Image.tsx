import React, { FC } from 'react';

type ImageProps = {
  src: string;
};

export const Image: FC<ImageProps> = ({ src }) => {
  return <img src={src} style={{ height: 100, width: 100, margin: '4px' }} alt="" />;
};
