// import { type ApiErrorResponse } from "../entities/api";
// import { UserRole, UserStatus } from "../utils/enums";

// export interface LogoutRequest {
//   id: string;
// }

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export interface RegisterRequest {
//   name: string;
//   username: string;
//   email: string;
//   password: string;
// }

// export interface User {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
//   status: UserStatus;
//   roles: UserRole[];
// }

// export interface UserAuth {
//   success: boolean;
//   total: number;
//   expiresAt: string;
//   timeToLive: number;
//   token: string;
// }

// export interface UserResponse {
//   target: User[];
//   meta: UserAuth;
//   error: ApiErrorResponse;
// }

// export interface ConfirmationRequest {
//   confirmationCode: string;
//   username: string;
// }
