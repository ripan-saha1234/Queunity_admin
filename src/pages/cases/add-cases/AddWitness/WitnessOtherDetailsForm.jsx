
import { useState } from 'react'
import OtherWitnessComponent from './OtherWitnessComponent.jsx'
import WitnessPhysicalDetails from './WitnessPhysicalDetails.jsx'
import WitnessVechicleForm from './WitnessVechicleForm.jsx'
const WitnessOtherDetailsForm = ({ data = {}, setField = () => {}, onUpload = () => {} }) => {
    const [openSection, setOpenSection] = useState('physical')

    return (
        <>
            <div className='other_form_main_wrapper'>
                <WitnessPhysicalDetails
                    isOpen={openSection === 'physical'}
                    onToggle={() =>
                        setOpenSection((prev) => (prev === 'physical' ? '' : 'physical'))
                    }
                    data={data}
                    setField={setField}
                    onUpload={onUpload}
                />
                <WitnessVechicleForm
                    isOpen={openSection === 'vehicle'}
                    onToggle={() =>
                        setOpenSection((prev) => (prev === 'vehicle' ? '' : 'vehicle'))
                    }
                    data={data}
                    setField={setField}
                    onUpload={onUpload}
                />
                <OtherWitnessComponent
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

export default WitnessOtherDetailsForm
