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
    const [relationship, setrelationShip] = useState('')
    const [suspectKnown, setsuspectKnown] = useState(null)

    const headerButtons = useMemo(() => ([
        {
            type: "wizard",
            progress: 30,
            prevDisabled: false,
            nextDisabled: false,
            prevText: "Back to Witness List",
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
                    iconBg="linear-gradient(135deg, #8F80FF 0%, #4361E7 100%)"
                    icon={<img src="/wit_icon.svg" alt="" />}
                    title="Witness Details"
                    subtitle="Who saw what happened"
                >
                    <form className="suspect_form_fields_wrapper">
                        <div className="radio_main">
                            <label>Do you know the Witness? <span>*</span></label>
                            <div className="radio_buttons_wrapper">
                                <ChoiceRadio
                                    name="suspectKnown"
                                    label="Yes"
                                    value="yes"
                                    onChange={() => {
                                        setsuspectKnown(true)
                                        setrelationShip('')
                                    }}
                                    checked={suspectKnown === true}
                                />
                                <ChoiceRadio
                                    name="suspectKnown"
                                    label="No"
                                    value="no"
                                    onChange={() => {
                                        setsuspectKnown(false)
                                        setrelationShip('')
                                    }}
                                    checked={suspectKnown === false}
                                />
                            </div>
                        </div>

                        {suspectKnown === true && 
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

                        {suspectKnown === false && <WitnessOtherDetailsForm />}

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
