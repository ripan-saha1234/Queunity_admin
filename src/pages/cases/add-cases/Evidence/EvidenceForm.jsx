import { useState } from 'react'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload'
import { WizardSection } from '../../../../components/WizardSection'
import './Evidence.css'
import EvidenceFileList from './EvidenceFileList'
import icon from '../../../../Assets/Icon (8).svg'
const EvidenceForm = () => {
    const [haveEvidence, sethaveEvidence] = useState(true)
    return (
        <>
            <div className='evidence_wrapper'>
                <WizardSection
                    iconBg=" linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
                    icon={<img src={icon} alt="" />}
                    title="Evidence"
                >
                </WizardSection>
                <form className='evidence_form_wrapper'>
                    <div className="radio_main">
                        <label>Any Evidence? <span>*</span></label>
                        <div className="radio_buttons_wrapper">
                            <ChoiceRadio
                                name="any_evidence"
                                label="Yes"
                                value="yes"
                                onChange={(() => sethaveEvidence(true))}
                                checked={haveEvidence}
                            />
                            <ChoiceRadio
                                name="any_evidence"
                                label="No"
                                value="no"
                                onChange={(() => sethaveEvidence(false))}
                                checked={!haveEvidence}
                            />
                        </div>
                    </div>
                    {haveEvidence && <>
                        <NewCommonMultiFileUpload />

                        <EvidenceFileList />
                    </>}
                </form>

            </div>
        </>
    )
}

export default EvidenceForm
