import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/Context/app.context'
import auth from 'src/apis/auth.api'
import { path } from 'src/constants/paths'

interface Props {
  currentPath: string
}

export default function Sidebar({ currentPath }: Props) {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const { setIsAuthenticated } = useContext(AppContext)
  const logoutMutate = useMutation({
    mutationFn: auth.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })
  const handleLogout = () => {
    // logoutMutate.mutate()
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <>
      <nav className='relative z-10 flex flex-wrap items-center justify-between bg-[#1d1d1f] px-6 py-4 text-white shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto'>
        <div className='mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch'>
          {/* Toggler icon */}
          <button
            className='cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden'
            type='button'
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
          </button>
          <Link
            className='mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase  md:block md:pb-2'
            to='/admin/filter'
          >
            XDR Filter
          </Link>
          <div
            className={
              'absolute left-0 right-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
              collapseShow
            }
          >
            {/* Divider */}
            <hr className='my-4 md:min-w-full' />

            <ul className='flex list-none flex-col md:min-w-full md:flex-col'>
              <li className='items-center'>
                <Link
                  className={
                    'block py-3 text-xs font-bold uppercase ' +
                    (currentPath.indexOf(path.filter) !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-white hover:text-blueGray-500')
                  }
                  to={path.filter}
                >
                  <i
                    className={
                      'fas fa-tools mr-2 text-sm ' +
                      (currentPath.indexOf(path.filter) !== -1 ? 'opacity-75' : 'text-white')
                    }
                  ></i>{' '}
                  Lọc dữ liệu
                </Link>
              </li>
              <li className='items-center'>
                <Link
                  className={
                    'block py-3 text-xs font-bold uppercase ' +
                    (currentPath.indexOf(path.history) !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-white hover:text-blueGray-500')
                  }
                  to={path.history}
                >
                  <i
                    className={
                      'fas fa-tools mr-2 text-sm ' +
                      (currentPath.indexOf(path.history) !== -1 ? 'opacity-75' : 'text-white')
                    }
                  ></i>{' '}
                  Lịch sử
                </Link>
              </li>
              <li className='items-center'>
                <div
                  className='block cursor-pointer py-3 text-xs font-bold uppercase text-white hover:text-blueGray-500'
                  onClick={handleLogout}
                >
                  <i className='fas fa-clipboard-list mr-2 text-sm text-blueGray-300'></i> Đăng xuất
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
