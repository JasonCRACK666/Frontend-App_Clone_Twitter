import axios from 'axios'

import {
  ISignInResponse,
  ISignUpResponse,
  IVerifyLoggedResponse,
  LoginData,
  SignUpData,
} from '../interfaces/Auth'

const authApi = axios.create({
  // baseURL: `${import.meta.env.API_URL}/auth`,
  baseURL: 'http://localhost:4000/api/auth',
})

export const verifyLogged = async (
  accessToken: string
): Promise<IVerifyLoggedResponse> => {
  const response = await authApi.get<IVerifyLoggedResponse>('/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

export const signIn = async (
  signInData: LoginData
): Promise<ISignInResponse> => {
  const response = await authApi.post<ISignInResponse>('/login', signInData)
  return response.data
}

export const signUp = async (
  signUpData: SignUpData
): Promise<ISignUpResponse> => {
  const response = await authApi.post<ISignUpResponse>('/signup', signUpData)
  return response.data
}
