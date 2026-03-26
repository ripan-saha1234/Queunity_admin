import { Outlet, Route, Routes } from 'react-router-dom'
import Authentication from './pages/authentication/authentication'
import CommonLayout from './pages/common-layout/common-layout'
import AddCases from './pages/cases/add-cases/add-cases'
import AllCases from './pages/cases/all-cases/all-cases'
import './App.css'
import AddSuspectForm from './pages/cases/add-cases/AddSuspectForm/AddSuspectForm'
import ViewSuspect from './pages/cases/add-cases/ViewSuspect/ViewSuspect'
import ViewWitness from './pages/cases/add-cases/ViewWitness/ViewWitness'
import AddWitnessForm from './pages/cases/add-cases/AddWitness/AddWitnessForm'

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path='/' element={<CommonLayout />}>
          <Route path='cases' element={<Outlet />}>
            <Route index element={<AllCases />} />
            <Route path='add-cases' element={<AddCases />} />
            <Route path='add-suspect' element={<AddSuspectForm />} />
            <Route path='view-suspect/:id' element={<ViewSuspect />} />
            <Route path='add-witness' element={<AddWitnessForm />} />
            <Route path='view-witness/:id' element={<ViewWitness />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
