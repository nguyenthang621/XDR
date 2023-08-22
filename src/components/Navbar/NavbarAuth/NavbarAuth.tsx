import { Link } from 'react-router-dom'

function NavbarAuth() {
  return (
    <>
      <nav className='navbar-expand-lg absolute top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3'>
        <div className='container mx-auto flex flex-wrap items-center justify-between px-4'>
          <div className='relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start'>
            <Link
              className='mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-black'
              to='/auth'
            >
              VCS XDR FILTER
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarAuth
