import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import '../AddSuspectForm/AddSuspectForm.css'
import CommonInput from "../../../../components/common-input"
import { useState } from "react"
import WitnessSchoolMateForm from "./WitnessSchoolMateForm"
import WitnessExternalForm from "./WitnessExternalForm"
import OtherWitnessForm from "./OtherWitnessForm"
import WitnessOtherDetailsForm from "./WitnessOtherDetailsForm"
const AddWitnessForm = () => {
    const [relationship, setrelationShip] = useState('schoolmate')
    const [suspectKnown, setsuspectKnown] = useState(true)
    return (
        <>
            <div className="common_pages_wrapper">
                <WizardSection
                    iconBg="#F0D9FF"
                    icon={<img src="/Container.svg" alt="" />}
                    title="Witness Details"
                    subtitle="When & where it happened"
                >
                    <form className="suspect_form_fields_wrapper">
                        <div className="radio_main">
                            <label>Do you know the Witness? <span>*</span></label>
                            <div className="radio_buttons_wrapper">
                                <ChoiceRadio
                                    name="suspectKnown"
                                    label="Yes"
                                    value="yes"
                                    onChange={(() => setsuspectKnown(true))}
                                    checked={suspectKnown}
                                />
                                <ChoiceRadio
                                    name="suspectKnown"
                                    label="No"
                                    value="no"
                                    onChange={(() => setsuspectKnown(false))}
                                    checked={!suspectKnown}
                                />
                            </div>
                        </div>

                        {suspectKnown && 
                        <div className="radio_main">
                            <label>Relationship <span>*</span></label>
                            <div className="radio_buttons_wrapper">
                                <ChoiceRadio
                                    name="relationship"
                                    label="Schoolmate"
                                    value="schoolmate"
                                    onChange={(() => setrelationShip('schoolmate'))}
                                    checked={relationship === 'schoolmate'}
                                />
                                <ChoiceRadio
                                    name="relationship"
                                    label="External Student"
                                    value="external_student"
                                    onChange={(() => setrelationShip('external_student'))}
                                    checked={relationship === 'external_student'}
                                />

                                <ChoiceRadio
                                    name="relationship"
                                    label="Other"
                                    value="other"
                                    onChange={(() => setrelationShip('other'))}
                                    checked={relationship === 'other'}
                                />
                            </div>
                        </div>}

                        {!suspectKnown && <WitnessOtherDetailsForm />}

                        {(relationship === 'schoolmate' && suspectKnown) && <WitnessSchoolMateForm />}
                        {(relationship === 'external_student' && suspectKnown) && <WitnessExternalForm />}
                        {(relationship === 'other' && suspectKnown) && <OtherWitnessForm />}
                    </form>
                </WizardSection>
            </div>
        </>
    )
}

export default AddWitnessForm
