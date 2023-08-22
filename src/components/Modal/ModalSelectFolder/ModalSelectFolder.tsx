import classNames from 'classnames'
import { useEffect, useState } from 'react'

import FolderModel from 'src/components/FolderModel'

interface Props {
  handleClose: () => void
  data: any
  handleSelect: (path: string) => void
}

function ModalSelectFolder({ handleClose, data, handleSelect }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    setIsActive(true)
  }, [])

  return (
    <div
      className={classNames('absolute left-0 top-16 z-30 flex items-center', {
        'opacity-100': isActive,
        'opacity-0': !isActive
      })}
    >
      {/* main */}
      <div className='relative transform rounded-lg bg-white shadow transition-transform dark:bg-gray-700'>
        <button
          type='button'
          className='absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
          data-modal-hide='crypto-modal'
          onClick={() => handleClose()}
        >
          <svg
            aria-hidden='true'
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Close modal</span>
        </button>
        {/* header */}
        <div className='min-w-[500px] rounded-t border-b px-6 py-4 dark:border-gray-600'>
          <h3 className='border-transparent'>Path Data Source Data Source to filter</h3>
        </div>
        {/* body */}
        <div className='px-6 py-2'>
          <FolderModel classNames='absolute top-0 z-10' items={data} handleSelect={handleSelect}></FolderModel>
          <div>
            <p className='inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-1 h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                />
              </svg>
              Lưu ý chọn đúng thư mục chứa data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSelectFolder
