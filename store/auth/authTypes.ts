export interface IUserResponse {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  avatar: string // potom mb null
  points: number

  createdAt: number
  updatedAt: number
}

export interface IUserSimple {
  id: number
  username: string
  lastName: string
  firstName: string
  avatar: string
}

export interface IUserMinimal {
  id: number
  username: string
  avatar: string
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
  isAuthLoaded: boolean

  setAuthData: (data: ILoginResponse) => void
  logout: () => void
  setAuthLoaded: (loaded: boolean) => void
}
