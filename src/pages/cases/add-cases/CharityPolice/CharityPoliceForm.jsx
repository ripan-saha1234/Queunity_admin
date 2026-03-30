import React, { useState } from 'react'
import './CharityPolice.css'
import { WizardSection } from '../../../../components/WizardSection'
import CommonInput from '../../../../components/common-input'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
const CharityPoliceForm = () => {
    const [involveCharity, setinvolveCharity] = useState('already_informed')
    const [involvePolice, setinvolvePolice] = useState('already_reported')
    return (
        <>
            <div className='charity_police_wrapper'>
                <form className='charity_police_form_wrapper'>
                    <WizardSection
                        iconBg=" linear-gradient(135deg, #FB64B6 0%, #FF2056 100%);"
                        icon={<img src="/Container (9).svg" alt="" />}
                        title="Charity"
                        subtitle={'When & where it happened'}
                    >
                    </WizardSection>

                    <div className="radio_main">
                        <label>Involve Charity? <span>*</span></label>
                        <div className="radio_buttons_wrapper" style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'start'
                        }}>
                            <ChoiceRadio
                                name="already_informed"
                                onChange={(() => setinvolveCharity('already_informed'))}
                                label="Already informed"
                                value="already_informed"
                                checked={involveCharity == 'already_informed'}
                            />
                            <ChoiceRadio
                                name="Inform now"
                                label="Inform now"
                                value="inform_now"
                                onChange={(() => setinvolveCharity('inform_now'))}
                                checked={involveCharity == 'inform_now'}
                            />

                            <ChoiceRadio
                                name="Maybe later"
                                label="Maybe later"
                                value="Maybe later"
                                onChange={(() => setinvolveCharity('maybe'))}
                                checked={involveCharity == 'maybe'}
                            />

                            <ChoiceRadio
                                name="No"
                                label="No"
                                value="No"
                                onChange={(() => setinvolveCharity('no'))}
                                checked={involveCharity == 'no'}
                            />
                        </div>
                    </div>

                    {involveCharity != 'inform_now' && <div className="radio_main">
                        <label>Charity Name <span>*</span></label>
                        <CommonInput placeholder='Enter charity name...' />
                    </div>}


                    {involveCharity == 'inform_now' && <>
                        <div className="radio_main">
                            <label>Type of charity involvement? <span>*</span></label>
                            <div className="radio_buttons_wrapper" >
                                <ChoiceRadio
                                    label="Counseling support"
                                />
                                <ChoiceRadio
                                    label="Crisis intervention"
                                />

                                <ChoiceRadio
                                    name="Family support"
                                    label="Family support"
                                    value="Family support"

                                />

                                <ChoiceRadio
                                    name="Mental health"
                                    label="Mental health"
                                    value="Mental health"

                                />

                                <ChoiceRadio
                                    name="Anti-bullying partner
"
                                    label="Anti-bullying partner
"
                                    value="Anti-bullying partner
"

                                />

                                <ChoiceRadio
                                    name="Community support
"
                                    label="Community support
"
                                    value="Community support
"

                                />
                            </div>
                        </div>

                        <div className='radio_main'>
                            <label>Reason for involving charity? <span>*</span></label>
                            <CommonInput style={{
                                height: '80px',
                                resize: 'none'
                            }} multiline placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation' />
                        </div>
                    </>}

                    <div style={{
                        marginTop: '10px'
                    }}>
                        <WizardSection
                            iconBg="  linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);"
                            icon={<img src="/Container (10).svg" alt="" />}
                            title="Police"
                            subtitle={'When & where it happened'}
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
                            <ChoiceRadio
                                name="Already reported to police"
                                label="Already reported to police"
                                value="Already reported to police"
                                onChange={(() => setinvolvePolice('already_reported'))}
                                checked={involvePolice == 'already_reported'}
                            />
                            <ChoiceRadio
                                name="Maybe later"
                                label="Maybe later"
                                value="Maybe later"
                                onChange={(() => setinvolvePolice('maybe'))}
                                checked={involvePolice == 'maybe'}
                            />
                            <ChoiceRadio
                                name="No"
                                label="No"
                                value="No"
                                onChange={(() => setinvolvePolice('no'))}
                                checked={involvePolice == 'no'}
                            />
                        </div>
                    </div>

                    {involvePolice != 'no' &&   <div className='four_grid_layout'>
                        <div className="radio_main">
                            <label> Police Report Number </label>
                            <CommonInput placeholder='Enter police report number...' />
                        </div>

                        <div className="radio_main">
                            <label> Officer Name </label>
                            <CommonInput placeholder='Enter officer Name...' />
                        </div>

                        <div className="radio_main">
                            <label> Station / Department </label>
                            <CommonInput placeholder='Enter deparment name...' />
                        </div>

                        <div className="radio_main">
                            <label>Date reported </label>
                            <CommonInput type='date' />
                        </div>
                    </div>}

                    {involvePolice != 'no' && <div className="radio_main">
                        <label> Upload police report</label>
                        <NewCommonMultiFileUpload />
                    </div>}
                </form>

            </div>
        </>
    )
}

export default CharityPoliceForm
