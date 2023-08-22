import { Outlet, useLocation } from 'react-router-dom'
import NavbarAdmin from 'src/components/Navbar/NavbarAdmin'
import Sidebar from 'src/components/Sidebar/Sidebar'

function Admin() {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <div className='relative h-screen'>
      <Sidebar currentPath={currentPath} />
      <div className='relative bg-blueGray-100 md:ml-64'>
        <NavbarAdmin />

        {/* <div className='relative pb-24 pt-12 md:pt-28'></div> */}
        <div className='mx-auto h-screen w-full px-4 pb-24 pt-12 md:pt-28'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
