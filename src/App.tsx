import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './layouts/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './layouts/Admin'
import { withProtectedRoute, withRejectedRoute } from './hoc/useRoute'
import NotFound from './pages/NotFound'

import { path } from './constants/paths'
import CardFilter from './components/Cards/CardFilter'
import ManageHistory from './pages/ManageHistory'

const ProtectedCardFilter = withProtectedRoute(CardFilter)
const ProtectedManageCameras = withProtectedRoute(ManageHistory)

const RejectedLogin = withRejectedRoute(Login)
const RejectedRegister = withRejectedRoute(Register)

function App() {
  return (
    <>
      <Routes>
        {/* add routes with layouts */}
        <Route path={path.home} element={<Navigate to={path.admin} replace />} />
        <Route path={path.auth} element={<Auth />}>
          <Route path={path.login} element={<RejectedLogin />} />
          <Route path={path.register} element={<RejectedRegister />} />
          <Route path={path.auth} element={<Navigate to={path.login} replace />} />
        </Route>

        <Route path={path.admin} element={<Admin />}>
          <Route path={path.history} element={<ProtectedManageCameras />} />
          <Route path={path.filter} element={<ProtectedCardFilter />} />
          <Route path={path.admin} element={<Navigate to={path.filter} replace />} />
        </Route>
        {/* add routes without layouts */}

        <Route path='*' element={<NotFound />} />
        {/* add redirect for first page */}
      </Routes>
    </>
  )
}

export default App
