export type AuthUser = {
  id: number;
  username: string;
  admin: boolean;
};

export type ConnectedUser = {
  userId: number;
  username: string;
};

export type AuthInfos = {
  access_token: string;
  user: AuthUser;
};
