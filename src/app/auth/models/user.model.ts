export interface User {
  id: string;
  email: string;
  regDate: number;
  avatarUrl: string;
}

export const userUndefined: User = {
  id: 'unknown',
  email: 'unknown',
  regDate: 0,
  avatarUrl: 'assets/user-info/default-avatar.jpg'
}
