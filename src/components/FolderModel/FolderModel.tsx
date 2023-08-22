import 'tippy.js/dist/tippy.css'
import Header from './Header'
import { useEffect, useState } from 'react'
import FolderItems from './FolderItems'
import _ from 'lodash'

function FolderModel({ children, items, handleSelect, ...rest }: any) {
  const [history, setHistory] = useState<any>([{ data: items }])
  const [currentPathSelect, setCurrentPathSelect] = useState<string>('')
  //   let current = history[history.length - 1]
  const [current, setCurrent] = useState(history[history.length - 1])

  const handle2ClickItem = (item: any) => {
    let isParent = !_.isEmpty(item)

    if (isParent && item.children) {
      setHistory((prev: any) => [...prev, item.children])
    }
  }
  useEffect(() => {
    setCurrent(history[history.length - 1])
  }, [history])

  const handleClickBack = () => {
    setHistory(history.slice(0, history.length - 1))
  }

  const handleSelectPath = (currentFolder: any) => {
    let currentCopy = current.data.map((item: any) => {
      if (item.title_vi === currentFolder.title_vi) {
        return {
          ...item,
          selected: true
        }
      }
      return {
        ...item,
        selected: false
      }
    })

    setCurrent({ ...current, data: currentCopy })
    if (current?.title_vi) {
      setCurrentPathSelect('/' + current?.title_vi + '/' + currentFolder.title_vi)
      console.log('>>', +'/' + current?.title_vi + '/' + currentFolder.title_vi)
    } else {
      setCurrentPathSelect('/' + currentFolder.title_vi)
      console.log('>>', +'/' + currentFolder.title_vi)
    }
  }

  const handleClickSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleSelect(currentPathSelect)
  }

  return (
    <div className='h-auto w-max min-w-[450px] rounded-md bg-white'>
      <div className='py-4 pb-4'>
        {history.length > 1 && (
          <Header
            title={current.title_vi}
            onBack={handleClickBack}
            iconBack={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            }
          />
        )}
        <FolderItems itemCurrent={current} handle2ClickItem={handle2ClickItem} handleSelectPath={handleSelectPath} />
      </div>
      <div className='flex justify-end'>
        <button className='bg-xanh m-4 rounded px-4 py-2 text-white hover:shadow' onClick={(e) => handleClickSelect(e)}>
          Select
        </button>
      </div>
    </div>
  )
}

export default FolderModel
