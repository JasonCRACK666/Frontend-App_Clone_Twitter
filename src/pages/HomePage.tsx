import { FC, useEffect } from 'react'

import { useAuthStore } from '../store/authStore'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { TweetInitialValue } from '../interfaces/Tweet'
import { createTweet, getAllTweets } from '../services/tweetService'

import { Bar } from '../components/Bar'
import { TweetForm } from '../components/TweetForm'
import TweetItem from '../components/TweetItem'
import Spinner from '../components/Spinner'

import { FormikHelpers } from 'formik'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const HomePage: FC = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { user, isLoadingAuth, token, isAuth } = useAuthStore(state => ({
    user: state.user,
    isLoadingAuth: state.loading,
    token: state.token,
    isAuth: state.isAuth,
  }))

  useEffect(() => {
    if (!isAuth || !token) {
      navigate('/explore')
    }
  }, [])

  const { data: tweets, isLoading, error } = useQuery('tweets', getAllTweets)

  const { mutate: createTweetMutation } = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
    },
    onError: () => {
      toast.error('There was an error trying to create the tweet')
    },
  })

  const sendTweet = (
    value: TweetInitialValue,
    actions: FormikHelpers<TweetInitialValue>
  ) => {
    const formTweet = new FormData()

    formTweet.append('content', value.content)

    if (value.hashtags) {
      formTweet.append('hashtags', value.hashtags)
    }

    for (const image of value.images) {
      formTweet.append('images', image)
    }

    createTweetMutation({ tweetData: formTweet, accessToken: token! })

    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <>
      <Bar styles='text-xl py-3 px-4 font-bold'>Home</Bar>

      {isLoadingAuth ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : user ? (
        <TweetForm
          handleSubmit={sendTweet}
          placeholder="What's happening?"
          isHomeForm
        />
      ) : null}

      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : tweets ? (
        <div className='divide-y divide-outline-layout border-t border-outline-layout'>
          {tweets.map(tweet => (
            <TweetItem key={tweet.id} {...tweet} />
          ))}
        </div>
      ) : null}
    </>
  )
}
