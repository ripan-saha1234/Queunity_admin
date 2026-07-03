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
import AllSchools from './pages/schools/all-schools/all-schools'
import AddSchools from './pages/schools/add-schools/add-schools'
import SchoolsDetails from './pages/schools/schools-details/schools-details'
import ViewCasesSchool from './pages/schools/view-cases-schools/view-cases-school'
import AllCharity from './pages/charity-section/all-charity/all-charity'
import AddCharity from './pages/charity-section/add-charity/add-charity'
import EditCharity from './pages/charity-section/edit-charity/edit-charity'
import CharityDetails from './pages/charity-section/chairty-details/charity-details'
import ViewCasesChairty from './pages/charity-section/view-cases-charity/view-cases-chairty'
import { useEffect } from 'react'
import EditSchools from './pages/schools/edit-schools/edit-schools'
import AllStaffs from './pages/staffs/all-staffs/all-staffs'
import RolesPage from './pages/staffs/roles/roles'
import { CaseFormProvider } from './context/CaseFormContext'

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
          <Route path='cases' element={<CaseFormProvider><Outlet /></CaseFormProvider>}>
            <Route index element={<AllCases />} />
            <Route path='add-cases' element={<AddCases />} />
            <Route path='edit-cases/:caseId' element={<AddCases />} />
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
          <Route path='schools' element={<Outlet />}>
            <Route index element={<AllSchools />} />
            <Route path='add-schools' element={<AddSchools />} />
            <Route path='edit-schools/:schoolId' element={<EditSchools />} />
            <Route path='details/:id' element={<SchoolsDetails />} />
            <Route path='details/:id/view-cases' element={<ViewCasesSchool />} />
          </Route>
          <Route path='charity' element={<Outlet />}>
            <Route index element={<AllCharity />} />
            <Route path='add-charity' element={<AddCharity />} />
            <Route path='edit-charity/:charityId' element={<EditCharity />} />
            <Route path='details/view-cases-charity' element={<ViewCasesChairty />} />
            <Route path='details/:id' element={<CharityDetails />} />
          </Route>
          <Route path='staffs' element={<AllStaffs />} />
          <Route path='roles' element={<RolesPage />} />
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
