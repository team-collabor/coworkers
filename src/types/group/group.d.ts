import { TBaseDate } from '../base';

export type TGroup = TBaseDate & {
  teamId: string;
  image: string;
  name: string;
  id: number;
};
