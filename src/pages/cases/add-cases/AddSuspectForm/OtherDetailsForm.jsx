import { useState } from 'react'
import PhysicalDetails from './PhysicalDetails.jsx'
import VehicleDetails from './VehicleDetails.jsx'
import OtherDetails from './OtherDetails.jsx'
const OtherDetailsForm = ({ data = {}, setField = () => {}, onUpload = () => {} }) => {
    const [openSection, setOpenSection] = useState('physical')

    return (
        <>
            <div className='other_form_main_wrapper'>
                <PhysicalDetails
                    isOpen={openSection === 'physical'}
                    onToggle={() =>
                        setOpenSection((prev) => (prev === 'physical' ? '' : 'physical'))
                    }
                    data={data}
                    setField={setField}
                    onUpload={onUpload}
                />
                <VehicleDetails
                    isOpen={openSection === 'vehicle'}
                    onToggle={() =>
                        setOpenSection((prev) => (prev === 'vehicle' ? '' : 'vehicle'))
                    }
                    data={data}
                    setField={setField}
                    onUpload={onUpload}
                />
                <OtherDetails
                    isOpen={openSection === 'other'}
                    onToggle={() =>
                        setOpenSection((prev) => (prev === 'other' ? '' : 'other'))
                    }
                    data={data}
                    setField={setField}
                />
            </div>
        </>
    )
}

export default OtherDetailsForm
