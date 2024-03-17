import React, { FC, useState } from 'react';
import './index.css';
import { DogSelector } from './DogSelector';
import { DogPhoto } from './manual/DogPhoto';
import { DogPhotoLazy } from './manual/DogPhotoLazy';
import { DogPhoto as DogPhotoGenTypes } from './generated-types/DogPhoto';
import { DogPhotoLazy as DogPhotoLazyGenTypes } from './generated-types/DogPhotoLazy';
import { DogPhoto as DogPhotoGenHooks } from './generated-hooks/DogPhoto';
import { DogPhotoLazy as DogPhotoLazyGenHooks } from './generated-hooks/DogPhotoLazy';

type TemplateProps = {
  title: string;
  Component: FC<{
    breed?: string;
  }>;
  LazyComponent: FC<{
    breed?: string;
  }>;
};

export const Template: FC<TemplateProps> = ({ title, Component, LazyComponent }) => {
  const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

  return (
    <div>
      <div>{title}</div>
      <DogSelector onDogSelected={(dog) => setSelectedDog(dog)} />
      {selectedDog && (
        <>
          <Component breed={selectedDog} />
          <LazyComponent breed={selectedDog} />
        </>
      )}
    </div>
  );
};

export default function Demo() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Template title="Manual" Component={DogPhoto} LazyComponent={DogPhotoLazy} />
        <Template title="Generated Types" Component={DogPhotoGenTypes} LazyComponent={DogPhotoLazyGenTypes} />
        <Template title="Generated Hooks & Types" Component={DogPhotoGenHooks} LazyComponent={DogPhotoLazyGenHooks} />
      </div>
    </div>
  );
}
