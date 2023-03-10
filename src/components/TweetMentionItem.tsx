import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Tweet } from '../interfaces/Tweet'

import { FilterTag } from './FilterTag'
import { GridImages } from './GridImages'

import { BsFillPatchCheckFill } from 'react-icons/bs'

import { formatTimezone } from '../utils/formatDate'

interface TweetMentionItemProps {
  tweet: Tweet
  isLink?: boolean
}

export const TweetMentionItem: FC<TweetMentionItemProps> = ({
  tweet,
  isLink,
}) => {
  const navigate = useNavigate()

  const tweetHashtags = tweet.hashtags?.split(',')

  const handleNavigateTweet = () => {
    if (isLink) navigate(`/tweets/${tweet.id}`)
  }

  return (
    <div
      className={`border border-outline-layout bg-black rounded-2xl w-full ${
        isLink && 'hover:bg-white/5 hover:transition-colors'
      }`}
    >
      <div
        className='px-3 pt-3 cursor-pointer'
        onClick={() => handleNavigateTweet()}
      >
        <div className='flex gap-1 items-center'>
          <img
            className='w-6 h-6 object-cover rounded-full'
            src={tweet.user.account.avatar}
          />
          <span className='font-bold'>{tweet.user.username}</span>
          {tweet.user.account.verify && (
            <BsFillPatchCheckFill className='text-blue-500' />
          )}
          <span className='text-gray-500'>-</span>
          <span className='text-gray-500'>
            {formatTimezone(tweet.createdAt)}
          </span>
        </div>

        <p className='py-1'>{tweet.content}</p>
      </div>

      {tweetHashtags && (
        <div className='flex flex-wrap px-3 pb-3'>
          {tweetHashtags.map(hashtag => (
            <FilterTag key={hashtag} tag={hashtag.trim()} />
          ))}
        </div>
      )}

      <div onClick={() => handleNavigateTweet()} className='cursor-pointer'>
        {tweet.images.length > 0 && (
          <GridImages images={tweet.images} isMention />
        )}
      </div>
    </div>
  )
}
