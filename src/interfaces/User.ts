import { Account, AccountInTweet } from './Account'

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  password: string
  email: string
  account: Account
}

export interface UserInTweet {
  id: string
  username: string
  account: AccountInTweet
}

export interface UserAuth extends Omit<User, 'password' | 'account'> {
  account: {
    avatar: string
  }
}

export interface UserInProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  posts: Array<{ id: string }>
  followers: Array<{ id: string }>
}