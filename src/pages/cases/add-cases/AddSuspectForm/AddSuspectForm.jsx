import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import usePageHeader from "../../../../hooks/use-page-header"
import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import './AddSuspectForm.css'
import CommonInput from "../../../../components/common-input"
import SchoolMateForm from "./SchoolMateForm"
import ExternalStudentForm from "./ExternalStudentForm"
import OtherSuspectForm from "./OtherSuspectForm"
import OtherDetailsForm from "./OtherDetailsForm"
import icon from '../../../../Assets/Capa_1.svg'
const AddSuspectForm = () => {
    const navigate = useNavigate()
    const [relationship, setrelationShip] = useState('')
    const [suspectKnown, setsuspectKnown] = useState(null)

    const headerButtons = useMemo(() => ([
        {
            type: "wizard",
            progress: 20,
            prevDisabled: false,
            nextDisabled: false,
            prevText: "Back to Suspect List",
            nextText: "Add Suspect",
            onPrev: () => navigate("/cases/add-cases?step=1"),
            onNext: () => navigate("/cases/add-cases?step=2"),
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
                    iconBg="linear-gradient(135deg, #41CA13 0%, #1AA6C9 100%)"
                    icon={<img src={icon} alt="" />}
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
                                    checked={suspectKnown === true}
                                />
                                <ChoiceRadio
                                    name="suspectKnown"
                                    label="No"
                                    value="no"
                                    onChange={(() => setsuspectKnown(false))}
                                    checked={suspectKnown === false}
                                />
                            </div>
                        </div>

                        {suspectKnown === true && <div className="radio_main">
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

                        {suspectKnown === false && <OtherDetailsForm />}

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
