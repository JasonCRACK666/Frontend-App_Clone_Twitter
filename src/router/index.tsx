import { createBrowserRouter, redirect } from 'react-router-dom'

import { MainLayout } from '../components/layouts/MainLayout'
import { AuthLayout } from '../components/layouts/AuthLayout'

import { ErrorPage } from '../pages/ErrorPage'

import { useIsAuth } from '../hooks/useIsAuth'
import { useProtectRoute } from '../hooks/useProtectRoute'

import { SignInPage } from '../pages/SignIn'
import { SignUpPage } from '../pages/SignUp'

import { HomePage } from '../pages/HomePage'
import { ExplorePage } from '../pages/ExplorePage'
import { ProfilePage } from '../pages/ProfilePage'
import { TrendsPage } from '../pages/TrendsPage'

import { UserTweets } from '../components/UserTweets'
import { TweetsUserLiked } from '../components/TweetsUserLiked'
import { MediaTweets } from '../components/MediaTweets'
import { DetailTweetPage } from '../pages/DetailTweetPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: useIsAuth,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect('/explore')
        },
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'trends',
        element: <TrendsPage />,
      },
      {
        path: 'tweets/:tweetId',
        element: <DetailTweetPage />,
      },
      {
        path: ':username',
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <UserTweets />,
          },
          {
            path: 'likes',
            element: <TweetsUserLiked />,
          },
          {
            path: 'media',
            element: <MediaTweets />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signIn',
        element: <SignInPage />,
      },
      {
        path: 'signUp',
        element: <SignUpPage />,
      },
    ],
  },
])
