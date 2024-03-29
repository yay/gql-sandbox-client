/**
 * Manually creating the TypeScript types for the generic `useQuery` method.
 */
export type Dog = {
  id: string;
  breed: string;
};

export type DogsQueryData = {
  dogs?: Dog[];
};

export type DogPhotoQueryData = {
  dog?: {
    id: string;
    displayImage?: string;
  };
};
