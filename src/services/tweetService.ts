import axios from 'axios'
import { AccountInItem } from '../interfaces/Account'

import {
  ISearchTweetsParams,
  ITweetResponse,
  ITweetsResponse,
  TrendTweets,
  Tweet,
} from '../interfaces/Tweet'

const API_TWITTER_TWEETS_BASE = 'http://localhost:4000/api/posts'

const tweetsApi = axios.create({
  baseURL: API_TWITTER_TWEETS_BASE,
})

export const getAllTweets = async (): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>('')
  return result.data.posts
}

export const getTweetById = async (tweetId: string): Promise<Tweet> => {
  const result = await tweetsApi.get<ITweetResponse>(`/${tweetId}`)
  return result.data.post
}

export const createTweet = async ({
  tweetData,
  accessToken,
}: {
  tweetData: FormData
  accessToken: string
}): Promise<{ message: string }> => {
  const result = await tweetsApi.post('', tweetData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data
}

export const likeTweet = async ({
  tweetId,
  accessToken,
}: {
  tweetId: string
  accessToken: string
}): Promise<ITweetResponse> => {
  const result = await tweetsApi.post<ITweetResponse>(
    '/like',
    { postId: tweetId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return result.data
}

export const getUserTweets = async (username: string): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>(`/user/${username}`)
  return result.data.posts
}

export const getLikedTweets = async (username: string): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>(`/user/${username}/liked`)
  return result.data.posts
}

export const getMediaTweets = async (username: string): Promise<Tweet[]> => {
  const result = await tweetsApi.get<ITweetsResponse>(`/user/${username}/media`)
  return result.data.posts
}

export const getTrendTweetsList = async (): Promise<TrendTweets> => {
  const result = await tweetsApi.get<{ trends: TrendTweets }>('/trends')
  return result.data.trends
}

export const getTrendTweetsLargeList = async (): Promise<TrendTweets> => {
  const result = await tweetsApi.get<{ trends: TrendTweets }>('/trends', {
    params: {
      limit: 20,
    },
  })
  return result.data.trends
}

export const searchTweetsOrAccounts = async ({
  query,
  find,
}: ISearchTweetsParams): Promise<Tweet[] | AccountInItem[]> => {
  const result = await tweetsApi.get<{ data: Tweet[] | AccountInItem[] }>(
    '/search',
    {
      params: {
        find,
        query,
      },
    }
  )

  return result.data.data
}

export const deleteTweet = async ({
  tweetId,
  accessToken,
}: {
  tweetId: string
  accessToken: string
}): Promise<{ message: string }> => {
  const result = await tweetsApi.delete<{ message: string }>(`/${tweetId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data
}
