import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import usePageHeader from "../../../../hooks/use-page-header"
import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import '../AddSuspectForm/AddSuspectForm.css'
import CommonInput from "../../../../components/common-input"
import WitnessSchoolMateForm from "./WitnessSchoolMateForm"
import WitnessExternalForm from "./WitnessExternalForm"
import OtherWitnessForm from "./OtherWitnessForm"
import WitnessOtherDetailsForm from "./WitnessOtherDetailsForm"
const AddWitnessForm = () => {
    const navigate = useNavigate()
    const [relationship, setrelationShip] = useState('schoolmate')
    const [suspectKnown, setsuspectKnown] = useState(true)

    const headerButtons = useMemo(() => ([
        {
            type: "wizard",
            progress: 30,
            prevDisabled: false,
            nextDisabled: false,
            prevText: "Previous",
            nextText: "Add Witness",
            onPrev: () => navigate("/cases/add-cases?step=2"),
            onNext: () => navigate("/cases/add-cases?step=3"),
        },
    ]), [navigate])

    usePageHeader({
        title: "Add Case",
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "Add Case", link: "/cases/add-cases" },
        ],
        buttons: headerButtons,
    })

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
