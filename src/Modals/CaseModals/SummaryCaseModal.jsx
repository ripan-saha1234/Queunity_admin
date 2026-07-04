import React, { useMemo, useState } from 'react'
import CommonButton from '../../components/common-button'
import { useNavigate } from 'react-router'
import { useToast } from '../../components/toast/ToastProvider'
import { useCaseForm } from '../../context/CaseFormContext'

const RESOLUTION_LABELS = {
    school_discretion: 'School administration may handle it at their discretion.',
    discipline_per_policy: 'I want the student disciplined according to the school conduct policy.',
    class_wide_intervention: 'I do not want the student to be disciplined, but I would like a class-wide intervention (without identifying anyone).',
    discipline_and_restorative: 'I want the student to be disciplined and have a restorative circle.',
}

// Turn a raw enum-ish value (e.g. "verbal_bullying") into a readable label.
const humanize = (value) =>
    !value
        ? '-'
        : String(value)
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())

const suspectName = (suspect) => {
    if (suspect?.schoolmate?.student_name) return suspect.schoolmate.student_name
    if (suspect?.external_student?.student_name) return suspect.external_student.student_name
    if (suspect?.other?.suspect_name) return suspect.other.suspect_name
    return 'Unknown'
}

const SummaryCaseModal = ({ setsummaryCase, onSubmit, isEditMode = false }) => {
    const navigate = useNavigate()
    const { showToast } = useToast()
    const { caseData } = useCaseForm()
    const [submitting, setSubmitting] = useState(false)

    const summary = useMemo(() => {
        const suspects = caseData.suspects || []
        const names = suspects.map(suspectName).filter(Boolean)
        return {
            date: caseData.incident_date || '-',
            time: caseData.incident_time || '-',
            offence: humanize(caseData.offence_category),
            offenceSub: humanize(caseData.offence_sub_category),
            studentsInvolved: names.length ? names.join(', ') : 'None added',
            evidenceCount: caseData.evidence?.items?.length || 0,
            police:
                caseData.police?.involvement && caseData.police.involvement !== 'not_reported'
                    ? 'Yes'
                    : 'No',
            charity: caseData.charity?.involvement ? 'Yes' : 'No',
            resolution:
                RESOLUTION_LABELS[caseData.resolution_desired] ||
                (caseData.resolution_desired ? humanize(caseData.resolution_desired) : 'Not selected'),
        }
    }, [caseData])

    const handleConfirm = async () => {
        if (submitting) return
        if (typeof onSubmit !== 'function') {
            navigate('/cases')
            return
        }
        try {
            setSubmitting(true)
            const response = await onSubmit()
            showToast(
                response?.message ||
                    (isEditMode ? 'Case updated successfully' : 'Case added successfully'),
                'success',
            )
            setsummaryCase(false)
            navigate('/cases', { state: { refreshCases: true } })
        } catch (error) {
            showToast(error?.message || (isEditMode ? 'Failed to update case' : 'Failed to add case'), 'error')
            setSubmitting(false)
        }
    }

    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Case Summary</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setsummaryCase(false))}></i>
                    </div>
                    <div className='case_summary_list'>
                        <ul>
                            <li><strong>Date:</strong>{summary.date}</li>
                            <li><strong>Time:</strong> {summary.time}</li>
                            <li><strong>Offense category:</strong>  {summary.offence}</li>
                            <li><strong>Student involved:</strong>  {summary.studentsInvolved}</li>
                            <li><strong>Evidence count:</strong>{summary.evidenceCount}</li>
                            <li><strong>Police reporting choice:</strong>{summary.police}</li>
                            <li><strong>Charity reporting choice:</strong>{summary.charity}</li>
                            <li><strong>Selected resolution:</strong></li>
                            <strong>{summary.resolution}</strong>
                        </ul>

                        <strong>
                            {isEditMode
                                ? 'Are you sure you want to update this case?'
                                : 'Are you sure you want to submit this case?'}
                        </strong>
                    </div>
                    <div style={{
                        marginLeft: 'auto',
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <CommonButton onClick={(() => setsummaryCase(false))} text='Cancel' backgroundColor={'transparent'} borderColor={'transparent'} />
                        <CommonButton onClick={handleConfirm} disabled={submitting} text={submitting ? (isEditMode ? 'Updating...' : 'Submitting...') : 'Yes'} backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryCaseModal
