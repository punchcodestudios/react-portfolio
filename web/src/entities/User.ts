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
  id: string;
  hame: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
