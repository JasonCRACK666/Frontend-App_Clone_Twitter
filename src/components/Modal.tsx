import { FC, ReactNode, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  center?: boolean
  closeModal: () => void
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  closeModal,
  center,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' onClose={closeModal} className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-800 bg-opacity-60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div
            className={`flex min-h-full justify-center ${
              center ? 'items-center' : 'items-start mt-8'
            }`}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
