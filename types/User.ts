export interface User {
  username?: string;
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}


