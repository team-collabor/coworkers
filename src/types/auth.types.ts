import { OptionalPick } from '@/utils/utilityTypes/OptionalPick';
import { CommonTypes } from './common.types';

export type User = OptionalPick<
  CommonTypes,
  'nickname' | 'createdAt' | 'updatedAt' | 'email' | 'image',
  'id'
> | null;
