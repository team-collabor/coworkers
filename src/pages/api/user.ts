import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    id: 868,
    nickname: '테스터',
    createdAt: '2024-10-10T15:10:45+09:00',
    updatedAt: '2024-10-10T15:10:45+09:00',
    image: null,
    teamId: '8-4',
    email: 'tester@test.com',
    memberships: [
      {
        userId: 868,
        groupId: 1250,
        userName: '테스터',
        userEmail: 'tester@test.com',
        userImage: null,
        role: 'ADMIN',
        group: {
          id: 1250,
          name: '프론트엔드',
          image: 'https://placehold.co/120?text=Hello+World&font=roboto',
          createdAt: '2024-10-14T13:23:16+09:00',
          updatedAt: '2024-10-14T13:23:16+09:00',
          teamId: '8-4',
        },
      },
      {
        userId: 868,
        groupId: 1251,
        userName: '테스터',
        userEmail: 'tester@test.com',
        userImage: null,
        role: 'ADMIN',
        group: {
          id: 1251,
          name: '백엔드',
          image: 'https://placehold.co/120?text=backend&font=roboto',
          createdAt: '2024-10-14T13:25:20+09:00',
          updatedAt: '2024-10-14T13:25:20+09:00',
          teamId: '8-4',
        },
      },
      {
        userId: 868,
        groupId: 1253,
        userName: '테스터',
        userEmail: 'tester@test.com',
        userImage: null,
        role: 'ADMIN',
        group: {
          id: 1253,
          name: '백엔드',
          image: 'https://placehold.co/120?text=backend&font=roboto',
          createdAt: '2024-10-14T14:32:19+09:00',
          updatedAt: '2024-10-14T14:32:19+09:00',
          teamId: '8-4',
        },
      },
    ],
  };
  res.status(200).json(data);
}
