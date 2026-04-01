import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Authentication from './pages/authentication/authentication'
import CommonLayout from './pages/common-layout/common-layout'
import AddCases from './pages/cases/add-cases/add-cases'
import AllCases from './pages/cases/all-cases/all-cases'
import './App.css'
import AddSuspectForm from './pages/cases/add-cases/AddSuspectForm/AddSuspectForm'
import ViewSuspect from './pages/cases/add-cases/ViewSuspect/ViewSuspect'
import ViewWitness from './pages/cases/add-cases/ViewWitness/ViewWitness'
import AddWitnessForm from './pages/cases/add-cases/AddWitness/AddWitnessForm'
import SubmitedCase from './pages/cases/add-cases/SubmitedCase/SubmitedCase'
import EvidenceForm from './pages/cases/add-cases/Evidence/EvidenceForm'
import Offense from './pages/cases/Offense/Offense'
import SingleOffense from './pages/cases/Offense/SingleOffense/SingleOffense'
import ViewQuestion from './pages/cases/Offense/SingleOffense/ViewQuestion'
import CreateQuestionSet from './pages/cases/Offense/SingleOffense/CreateQuestionSet'
import SubmittedSuspect from './pages/cases/add-cases/SubmitedCase/SubmittedSuspect'
import SubmittedWitness from './pages/cases/add-cases/SubmitedCase/SubmittedWitness'
import AllEvidence from './pages/cases/add-cases/Evidence/AllEvidence'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
   useEffect(()=>{
    window.scrollTo({
      top:'0',
      behavior:'instant'
    })
   }, [location.pathname])
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
            <Route path='case-submitted/:id' element={<SubmitedCase/>}/>
            <Route path='submitted-suspect/:id' element={<SubmittedSuspect/>}/>
            <Route path='submitted-witness/:id' element={<SubmittedWitness />} />
            <Route path='submitted-evidence/:id' element={<AllEvidence/>}/>
            <Route path='add-evidence' element={<EvidenceForm/>}/>
          </Route>
          <Route path='/offense' element={<Offense/>}>
          </Route>
          <Route path='/single-offense/:id' element={<SingleOffense />} />
          <Route path='/view-question/:id' element={<ViewQuestion/>}/>
          <Route path='/create-question/:id' element={<CreateQuestionSet/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
