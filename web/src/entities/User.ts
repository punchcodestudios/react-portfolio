export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
}

export interface UserAuth {
  expiresAt: string;
  timeToLive: number;
  token: string;
}

export interface UserContent {
  isAuthenticated: boolean;
  user: User;
  userAuth: UserAuth;
}
