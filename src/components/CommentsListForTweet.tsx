import type { FC } from 'react'

import { useQuery } from 'react-query'

import { AxiosError } from 'axios'
import { Comment } from '../interfaces/Comment'
import { getAllCommentsOfTweet } from '../services/commentService'

import Spinner from './Spinner'
import { CommentItem } from './CommentItem'

interface CommentsListForTweetProps {
  tweetId: string
}

export const CommentsListForTweet: FC<CommentsListForTweetProps> = ({
  tweetId,
}) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], AxiosError>(['tweetComments', tweetId], () =>
    getAllCommentsOfTweet(tweetId)
  )

  if (isLoading)
    return (
      <div className='flex justify-center pt-10'>
        <Spinner />
      </div>
    )

  if (error)
    return <div className='text-center text-red-600 text-lg'>Hubo un error</div>

  if (comments?.length === 0)
    return (
      <div className='text-center text-white text-xl py-6'>
        There are no comments
      </div>
    )

  return (
    <div className='divide-y divide-outline-layout'>
      {comments?.map(comment => (
        <CommentItem key={comment.id} commentData={comment} />
      ))}
    </div>
  )
}
