import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { BarAuthOptions } from '../BarAuthOptions'

import VerticalNavbar from '../VerticalNavbar'
import VerticalSearchTweets from '../VerticalSearchTweets'

export const MainLayout: FC = () => {
  const isAuth = useAuthStore(state => state.isAuth)

  return (
    <div className='bg-black'>
      <div className='container mx-auto sm:px-0 md:px-0 lg:px-4 xl:px-30 2xl:px-40 w-full'>
        <main className='grid max-sm:grid-cols-sm sm:grid-cols-sm md:grid-cols-md lg:grid-cols-md xl:grid-cols-xl 2xl:grid-cols-lg divide-x divide-outline-layout max-md:border-r max-md:border-outline-layout w-full'>
          <VerticalNavbar />
          <div className='flex flex-col text-white'>
            <Outlet />
          </div>
          <VerticalSearchTweets />
        </main>
      </div>
      {!isAuth && <BarAuthOptions />}
    </div>
  )
}
