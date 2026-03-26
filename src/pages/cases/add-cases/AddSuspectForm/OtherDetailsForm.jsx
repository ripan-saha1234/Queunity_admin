import PhysicalDetails from './PhysicalDetails.jsx'
import VehicleDetails from './VehicleDetails.jsx'
import OtherDetails from './OtherDetails.jsx'
const OtherDetailsForm = () => {
    return (
        <>
            <div className='other_form_main_wrapper'>
                <PhysicalDetails />
                <VehicleDetails />
                <OtherDetails/>
            </div>
        </>
    )
}

export default OtherDetailsForm
