export interface IUserResponse {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  avatar: string
  points: number
  createdAt: number
  updatedAt: number
}

export interface ILoginResponse {
  accessToken: string
  user: IUserResponse
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface IRefreshResponse {
  accessToken: string
}

export interface IAuthState {
  accessToken: string | null
  user: IUserResponse | null
  setAuthData: (data: ILoginResponse) => void
  logout: () => void
}
