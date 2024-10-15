import { TBaseDate } from './base.types';

export type TGroup = TBaseDate & {
  teamId: string;
  image: string;
  name: string;
  id: number;
};

export type TGroups = Array<TGroup>;
