import { Outlet, Route, Routes } from 'react-router-dom'
import Authentication from './pages/authentication/authentication'
import CommonLayout from './pages/common-layout/common-layout'
import AddCases from './pages/cases/add-cases/add-cases'
import AllCases from './pages/cases/all-cases/all-cases'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path='/' element={<CommonLayout />}>
          <Route path='cases' element={<Outlet />}>
            <Route index element={<AllCases />} />
            <Route path='add-cases' element={<AddCases />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
