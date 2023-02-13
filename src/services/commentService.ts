import axios from 'axios'

import { Comment } from '../interfaces/Comment'

const API_TWITTER_COMMENTS_BASE = 'http://localhost:4000/api/comments'

const commentApi = axios.create({
  baseURL: API_TWITTER_COMMENTS_BASE,
})

export const getAllCommentOfTweet = async (
  tweetId: string
): Promise<Comment[]> => {
  const response = await commentApi.get<{ comments: Comment[] }>(
    `/post/${tweetId}`
  )
  return response.data.comments
}

export const getCommentById = async (commentId: string) => {
  const response = await commentApi.get<{ comment: Comment }>(`/${commentId}`)
  return response.data.comment
}

export const createComment = async ({
  commentData,
  accessToken,
}: {
  commentData: FormData
  accessToken: string
}) => {
  const response = await commentApi.post<{ comment: Comment }>(
    '',
    commentData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return response.data.comment
}