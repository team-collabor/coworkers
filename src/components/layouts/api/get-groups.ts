/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { fakerKO as faker } from '@faker-js/faker';
import { TGroup, TGroups } from '../model/types';

export const getGroups = async (
  id: string | number,
  signal: AbortSignal
): Promise<TGroups> => {
  // const response = await axiosInstance.get<TGroups>(`/groups/${id}`, {
  //   headers: { 'Content-Length': 'application/json' },
  //   signal,
  // });
  // const { data } = response;
  return new Promise((resolve) => {
    const data = Array.from(
      { length: 5 },
      (_, index): TGroup => ({
        id: index + 1,
        name: faker.person.jobArea(),
        teamId: `${index + 101}`,
        image: faker.image.avatar(),
        members: [],
        taskLists: [],
        createdAt: faker.date.anytime().toISOString(),
        updatedAt: faker.date.anytime().toISOString(),
      })
    );
    setTimeout(() => resolve(data), 2000);
  });
};
