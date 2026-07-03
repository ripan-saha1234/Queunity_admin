import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import usePageHeader from "../../../../hooks/use-page-header"
import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import './AddSuspectForm.css'
import SchoolMateForm from "./SchoolMateForm"
import ExternalStudentForm from "./ExternalStudentForm"
import OtherSuspectForm from "./OtherSuspectForm"
import OtherDetailsForm from "./OtherDetailsForm"
import icon from '../../../../Assets/Capa_1.svg'
import { useCaseForm } from "../../../../context/CaseFormContext"
import { useToast } from "../../../../components/toast/ToastProvider"
import { getCaseWizardPath } from "../../../../utils/caseRoutes"

const AddSuspectForm = () => {
    const navigate = useNavigate()
    const { addSuspect, uploadFile, isEditing, editMeta } = useCaseForm()
    const editCaseId = isEditing ? editMeta?.case_id : null
    const suspectListPath = getCaseWizardPath(1, editCaseId)
    const { showToast } = useToast()
    const [relationship, setrelationShip] = useState('')
    const [suspectKnown, setsuspectKnown] = useState(null)
    const [data, setData] = useState({ was_suspect_on_school_ground: true })
    const [uploading, setUploading] = useState(false)

    const setField = (name, value) =>
        setData((prev) => ({ ...prev, [name]: value }))

    const handleUpload = async (key, fileList) => {
        const files = Array.from(fileList || [])
        if (!files.length) return
        setUploading(true)
        try {
            const urls = await Promise.all(files.map((f) => uploadFile(f)))
            setData((prev) => ({ ...prev, [key]: [...(prev[key] || []), ...urls] }))
            showToast('File uploaded', 'success')
        } catch (err) {
            showToast(err?.message || 'File upload failed', 'error')
        } finally {
            setUploading(false)
        }
    }

    const buildSuspect = () => {
        const known = suspectKnown === true
        const suspect = {
            do_you_know_the_suspect: suspectKnown === true,
            suspect_relationship_type: known ? relationship : null,
            schoolmate: null,
            external_student: null,
            other: null,
            physical_details: null,
            vehicle_details: null,
            other_details: null,
        }

        if (known && relationship === 'schoolmate') {
            suspect.schoolmate = {
                student_name: data.student_name || '',
                student_details: data.student_details || '',
            }
        } else if (known && relationship === 'external_student') {
            suspect.external_student = {
                school_name: data.school_name || '',
                city: data.city || '',
                state: data.state || '',
                student_name: data.student_name || '',
                grade: data.grade || '',
                gender: data.gender || '',
                student_details: data.student_details || '',
                how_suspect_identified: data.suspect_identified || '',
            }
        } else if (known && relationship === 'other') {
            suspect.other = {
                organization: data.organization || '',
                suspect_type: data.suspect_type || '',
                suspect_name: data.suspect_name || '',
                age: data.age ? Number(data.age) : null,
                gender: data.gender || '',
                relationship_to_student: data.student_relationship || '',
                contact_country_code: data.contact_country_code || '+1',
                contact_phone: data.contact_phone || '',
                how_you_know_suspect: data.know_suspect || '',
                was_suspect_on_school_ground: data.was_suspect_on_school_ground !== false,
                where_on_campus_were_they_seen: data.were_seen || '',
            }
        } else if (suspectKnown === false) {
            suspect.physical_details = {
                height_cm: data.height ? Number(data.height) : null,
                build: data.build || '',
                skin_tone: data.skin_tone || '',
                clothing_type: data.clothing_type || '',
                hair: data.hair || '',
                eyes: data.eyes || '',
                mouth: data.mouth || '',
                shoulders: data.shoulders || '',
                hands_and_arms: data.hands || '',
                torso: data.torso || '',
                legs: data.legs || '',
                feet: data.feet || '',
                accessories: data.accessories || '',
                additional_info: data.additional_info || '',
                photo_urls: data.photo_urls || [],
            }
            suspect.vehicle_details = {
                vehicle_type: data.vehicle_type || '',
                color: data.color || '',
                brand: data.brand || '',
                model: data.model || '',
                marking: data.marking || '',
                damage: data.damage || '',
                registration_no: data.registration_no || '',
                additional_info: data.vehicle_additional_info || '',
                direction_of_travel: data.direction || '',
                last_seen_location: data.last_location || '',
                image_urls: data.image_urls || [],
            }
            suspect.other_details = {
                description: data.other_description || '',
            }
        }

        return suspect
    }

    const handleAddSuspect = () => {
        if (uploading) {
            showToast('Please wait for the file upload to finish', 'info')
            return
        }
        if (suspectKnown === null) {
            showToast('Please indicate if you know the suspect', 'error')
            return
        }
        addSuspect(buildSuspect())
        showToast('Suspect added', 'success')
        navigate(suspectListPath)
    }

    const headerButtons = useMemo(() => ([
        {
            type: "wizard",
            progress: 20,
            prevDisabled: false,
            nextDisabled: false,
            prevText: "Back to Suspect List",
            nextText: "Add Suspect",
            onPrev: () => navigate(suspectListPath),
            onNext: handleAddSuspect,
        },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ]), [navigate, suspectKnown, relationship, data, uploading])

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
                    subtitle="Who was involved"
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

                        {suspectKnown === false && (
                            <OtherDetailsForm data={data} setField={setField} onUpload={handleUpload} />
                        )}

                        {(relationship === 'schoolmate' && suspectKnown) && (
                            <SchoolMateForm data={data} setField={setField} />
                        )}
                        {(relationship === 'external_student' && suspectKnown) && (
                            <ExternalStudentForm data={data} setField={setField} />
                        )}
                        {(relationship === 'other' && suspectKnown) && (
                            <OtherSuspectForm data={data} setField={setField} />
                        )}
                    </form>
                </WizardSection>
            </div>
        </>
    )
}

export default AddSuspectForm
