import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import './AddSuspectForm.css'
import CommonInput from "../../../../components/common-input"
import { useState } from "react"
import SchoolMateForm from "./SchoolMateForm"
import ExternalStudentForm from "./ExternalStudentForm"
import OtherSuspectForm from "./OtherSuspectForm"
import OtherDetailsForm from "./OtherDetailsForm"
const AddSuspectForm = () => {
    const [relationship, setrelationShip] = useState('schoolmate')
    const [suspectKnown, setsuspectKnown] = useState(true)
    return (
        <>
            <div className="common_pages_wrapper">
                <WizardSection
                    iconBg="#F0D9FF"
                    icon={<img src="/Container.svg" alt="" />}
                    title="Suspect Details"
                    subtitle="When & where it happened"
                >
                    <form className="suspect_form_fields_wrapper">
                        <div className="radio_main">
                            <label>Do you know the Suspect? <span>*</span></label>
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

                        {suspectKnown && <div className="radio_main">
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

                        {!suspectKnown && <OtherDetailsForm />}

                        {(relationship === 'schoolmate' && suspectKnown) && <SchoolMateForm />}
                        {(relationship === 'external_student' && suspectKnown) && <ExternalStudentForm />}
                        {(relationship === 'other' && suspectKnown) && <OtherSuspectForm />}
                    </form>
                </WizardSection>
            </div>
        </>
    )
}

export default AddSuspectForm
