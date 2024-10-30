export const usersQueryKeys = {
  user: () => ['user'],
  memberships: () => ['memberships'],
  history: () => [...usersQueryKeys.user(), 'history'],
};
