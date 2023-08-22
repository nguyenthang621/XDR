import classNames from 'classnames'

interface Props {
  itemCurrent: any
  handle2ClickItem: any
  handleSelectPath: (currentFolder: string) => void
}

function FolderItems({ itemCurrent, handle2ClickItem, handleSelectPath }: Props) {
  return (
    <div className='grid grid-cols-4 gap-4 pt-2'>
      {itemCurrent &&
        itemCurrent.data &&
        itemCurrent.data.length > 0 &&
        itemCurrent.data.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={classNames('flex cursor-pointer items-center rounded  bg-gray-100 p-2 hover:shadow', {
                'border-2 border-blue-500': item?.selected,
                'border-2 border-transparent': !item?.selected
              })}
              onDoubleClick={() => handle2ClickItem(item)}
              onClick={() => handleSelectPath(item)}
            >
              <span className='pr-1'>
                {item.icon === 'FOLDER' && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                    />
                  </svg>
                )}
              </span>
              <p>{item.title_vi}</p>
              {/* <span className='absolute rounded-full bg-amber-300 px-1 text-sm text-white'>
                {item?.children?.data.length && item?.children?.data.length}
              </span> */}
            </div>
          )
        })}
    </div>
  )
}

export default FolderItems
