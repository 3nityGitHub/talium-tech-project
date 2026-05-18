export type Role = 'carer' | 'manager';

export interface UserPublic {
  email: string;
  role: Role;
  full_name: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: UserPublic;
  redirect_to: string;
}

export interface ApiError {
  detail: string;
}
