export interface User {
  id: string;
  email: string;
  regDate: number;
}

export const userUndefined: User = {
  id: 'unknown',
  email: 'unknown',
  regDate: 0
}
