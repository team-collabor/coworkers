import { TGroup } from '../group';
import { TMembership } from './user.membership';

export type TMemberships = Array<
  TMembership & {
    group: TGroup;
  }
>;
