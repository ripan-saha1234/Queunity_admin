import React, { useState } from 'react'
import './CharityPolice.css'
import { WizardSection } from '../../../../components/WizardSection'
import CommonInput from '../../../../components/common-input'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { charityInvolvementTypeOptions } from '../options'
import { useCaseForm } from '../../../../context/CaseFormContext'
import { useToast } from '../../../../components/toast/ToastProvider'
import icon from '../../../../Assets/Capa_1 (1).svg'
import icon2 from '../../../../Assets/svg2532 (1).svg'

const CHARITY_INVOLVEMENT = [
    { label: 'Already informed', value: 'already_informed' },
    { label: 'Inform now', value: 'inform_now' },
    { label: 'Maybe later', value: 'maybe_later' },
    { label: 'No', value: 'no' },
]

const POLICE_INVOLVEMENT = [
    { label: 'Already reported to police', value: 'already_reported' },
    { label: 'Maybe later', value: 'maybe_later' },
    { label: 'No', value: 'not_reported' },
]

const CharityPoliceForm = () => {
    const { caseData, setCharity, setPolice, uploadFile } = useCaseForm()
    const { showToast } = useToast()
    const charity = caseData.charity || {}
    const police = caseData.police || {}
    const [involveCharity, setinvolveCharity] = useState(charity.involvement || null)
    const [involvePolice, setinvolvePolice] = useState(
        police.involvement && police.involvement !== 'not_reported' ? police.involvement : null,
    )
    const [uploading, setUploading] = useState(false)

    const handleReportUpload = async (fileList) => {
        const files = Array.from(fileList || [])
        if (!files.length) return
        setUploading(true)
        try {
            const urls = await Promise.all(files.map((f) => uploadFile(f)))
            setPolice({ report_file_urls: [...(police.report_file_urls || []), ...urls] })
            showToast('Report uploaded', 'success')
        } catch (err) {
            showToast(err?.message || 'Report upload failed', 'error')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <div className='charity_police_wrapper'>
                <form className='charity_police_form_wrapper'>
                    <WizardSection
                        iconBg=" linear-gradient(135deg, #FB64B6 0%, #FF2056 100%)"
                        icon={<img src={icon} alt="" />}
                        title="Charity"
                        subtitle={' Support for those affected'}
                    >
                    </WizardSection>

                    <div className="radio_main">
                        <label>Involve Charity? <span>*</span></label>
                        <div className="radio_buttons_wrapper" style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'start'
                        }}>
                            {CHARITY_INVOLVEMENT.map((opt) => (
                                <ChoiceRadio
                                    key={opt.value}
                                    name="charity_involvement"
                                    onChange={() => {
                                        setinvolveCharity(opt.value)
                                        setCharity({ involvement: opt.value })
                                    }}
                                    label={opt.label}
                                    value={opt.value}
                                    checked={involveCharity === opt.value}
                                />
                            ))}
                        </div>
                    </div>

                    {involveCharity === 'already_informed' && <div className="radio_main">
                        <label>Charity Name <span>*</span></label>
                        <CommonInput
                            placeholder='Enter charity name...'
                            onChange={(e) => setCharity({ charity_name: e.target.value })}
                        />
                    </div>}


                    {involveCharity === 'inform_now' && <>
                        <div className="radio_main">
                            <label>Type of charity involvement? <span>*</span></label>
                            <div className="radio_buttons_wrapper" >
                                {charityInvolvementTypeOptions.map((opt) => (
                                    <ChoiceRadio
                                        key={opt.value}
                                        name="charity_involvement_type"
                                        label={opt.label}
                                        value={opt.value}
                                        checked={charity.involvement_type === opt.value}
                                        onChange={(value) => setCharity({ involvement_type: value })}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='radio_main'>
                            <label>Reason for involving charity? <span>*</span></label>
                            <CommonInput style={{
                                height: '80px',
                                resize: 'none'
                            }} multiline placeholder='Enter reason...'
                                onChange={(e) => setCharity({ reason: e.target.value })}
                            />
                        </div>
                    </>}

                    <div style={{
                        marginTop: '10px'
                    }}>
                        <WizardSection
                            iconBg="  linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
                            icon={<img src={icon2} alt="" />}
                            title="Police"
                            subtitle={'Police involvement details'}
                        >
                        </WizardSection>
                    </div>
                    <div className="radio_main">
                        <label>Involve Police? <span>*</span></label>
                        <div className="radio_buttons_wrapper" style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'start'
                        }}>
                            {POLICE_INVOLVEMENT.map((opt) => (
                                <ChoiceRadio
                                    key={opt.value}
                                    name="police_involvement"
                                    label={opt.label}
                                    value={opt.value}
                                    onChange={() => {
                                        setinvolvePolice(opt.value)
                                        setPolice({ involvement: opt.value })
                                    }}
                                    checked={involvePolice === opt.value}
                                />
                            ))}
                        </div>
                    </div>

                    {involvePolice === 'already_reported' && <div className='four_grid_layout'>
                        <div className="radio_main">
                            <label> Police Report Number </label>
                            <CommonInput placeholder='Enter police report number...'
                                onChange={(e) => setPolice({ report_number: e.target.value })}
                            />
                        </div>

                        <div className="radio_main">
                            <label> Officer Name </label>
                            <CommonInput placeholder='Enter officer Name...'
                                onChange={(e) => setPolice({ officer_name: e.target.value })}
                            />
                        </div>

                        <div className="radio_main">
                            <label> Station / Department </label>
                            <CommonInput placeholder='Enter deparment name...'
                                onChange={(e) => setPolice({ station_department: e.target.value })}
                            />
                        </div>

                        <div className="radio_main">
                            <label>Date reported </label>
                            <CommonInput type='date'
                                onChange={(e) => setPolice({ date_reported: e.target.value })}
                            />
                        </div>
                    </div>}

                    {involvePolice === 'already_reported' && <div className="radio_main">
                        <label> Upload police report {uploading && <span>(uploading...)</span>}</label>
                        <NewCommonMultiFileUpload onChange={(e) => handleReportUpload(e.target.files)} />
                    </div>}
                </form>

            </div>
        </>
    )
}

export default CharityPoliceForm
