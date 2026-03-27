
import OtherWitnessComponent from './OtherWitnessComponent.jsx'
import WitnessPhysicalDetails from './WitnessPhysicalDetails.jsx'
import WitnessVechicleForm from './WitnessVechicleForm.jsx'
const WitnessOtherDetailsForm = () => {
    return (
        <>
            <div className='other_form_main_wrapper'>
                <WitnessPhysicalDetails />
                <WitnessVechicleForm />
                <OtherWitnessComponent />
            </div>
        </>
    )
}

export default WitnessOtherDetailsForm
