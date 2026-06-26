import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import usePageHeader from "../../../../hooks/use-page-header"
import { WizardSection } from "../../../../components/WizardSection"
import { ChoiceRadio } from "../../../../components/ChoiceRadio"
import '../AddSuspectForm/AddSuspectForm.css'
import WitnessSchoolMateForm from "./WitnessSchoolMateForm"
import WitnessExternalForm from "./WitnessExternalForm"
import OtherWitnessForm from "./OtherWitnessForm"
import WitnessOtherDetailsForm from "./WitnessOtherDetailsForm"
import { useCaseForm } from "../../../../context/CaseFormContext"
import { useToast } from "../../../../components/toast/ToastProvider"

const AddWitnessForm = () => {
    const navigate = useNavigate()
    const { addWitness, uploadFile } = useCaseForm()
    const { showToast } = useToast()
    const [relationship, setrelationShip] = useState('')
    const [witnessKnown, setwitnessKnown] = useState(null)
    const [data, setData] = useState({})
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

    const buildWitness = () => {
        const known = witnessKnown === true
        const witness = {
            do_you_know_the_witness: witnessKnown === true,
            witness_relationship_type: known ? relationship : null,
            schoolmate: null,
            external_student: null,
            other: null,
            physical_details: null,
            vehicle_details: null,
            other_details: null,
        }

        if (known && relationship === 'schoolmate') {
            witness.schoolmate = {
                student_name: data.student_name || '',
                grade: data.grade || '',
                incident_visibility: data.incident_visibility || '',
                witness_reliability: data.witness_reliability || '',
                observation_description: data.observation_description || '',
                relationship_to_victim: data.relationship_to_victim || '',
            }
        } else if (known && relationship === 'external_student') {
            witness.external_student = {
                school_name: data.school_name || '',
                city: data.city || '',
                state: data.state || '',
                grade: data.grade || '',
                gender: data.gender || '',
                age: data.age ? Number(data.age) : null,
                how_witness_identified: data.identified_details || '',
                student_details: data.student_details || '',
            }
        } else if (known && relationship === 'other') {
            witness.other = {
                organization: data.organization || '',
                witness_type: data.witness_type || '',
                witness_name: data.witness_name || '',
                age: data.age ? Number(data.age) : null,
                gender: data.gender || '',
                relationship_to_student: data.student_relationship || '',
                contact_country_code: data.contact_country_code || '+1',
                contact_phone: data.contact_phone || '',
                connection_to_incident: data.connection_to_incident || '',
                present_during_incident: data.present_during_incident || '',
            }
        } else if (witnessKnown === false) {
            witness.physical_details = {
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
            witness.vehicle_details = {
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
            witness.other_details = {
                description: data.other_description || '',
            }
        }

        return witness
    }

    const handleAddWitness = () => {
        if (uploading) {
            showToast('Please wait for the file upload to finish', 'info')
            return
        }
        if (witnessKnown === null) {
            showToast('Please indicate if you know the witness', 'error')
            return
        }
        addWitness(buildWitness())
        showToast('Witness added', 'success')
        navigate('/cases/add-cases?step=2')
    }

    const headerButtons = useMemo(() => ([
        {
            type: "wizard",
            progress: 30,
            prevDisabled: false,
            nextDisabled: false,
            prevText: "Back to Witness List",
            nextText: "Add Witness",
            onPrev: () => navigate("/cases/add-cases?step=2"),
            onNext: handleAddWitness,
        },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ]), [navigate, witnessKnown, relationship, data, uploading])

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
                                    name="witnessKnown"
                                    label="Yes"
                                    value="yes"
                                    onChange={() => {
                                        setwitnessKnown(true)
                                        setrelationShip('')
                                    }}
                                    checked={witnessKnown === true}
                                />
                                <ChoiceRadio
                                    name="witnessKnown"
                                    label="No"
                                    value="no"
                                    onChange={() => {
                                        setwitnessKnown(false)
                                        setrelationShip('')
                                    }}
                                    checked={witnessKnown === false}
                                />
                            </div>
                        </div>

                        {witnessKnown === true &&
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

                        {witnessKnown === false && (
                            <WitnessOtherDetailsForm data={data} setField={setField} onUpload={handleUpload} />
                        )}

                        {(relationship === 'schoolmate' && witnessKnown) && (
                            <WitnessSchoolMateForm data={data} setField={setField} />
                        )}
                        {(relationship === 'external_student' && witnessKnown) && (
                            <WitnessExternalForm data={data} setField={setField} />
                        )}
                        {(relationship === 'other' && witnessKnown) && (
                            <OtherWitnessForm data={data} setField={setField} />
                        )}
                    </form>
                </WizardSection>
            </div>
        </>
    )
}

export default AddWitnessForm
