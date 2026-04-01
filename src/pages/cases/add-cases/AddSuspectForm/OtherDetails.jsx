import React from 'react'
import CommonInput from '../../../../components/common-input'
import icon from '../../../../Assets/regular.svg'
import { WizardSection } from '../../../../components/WizardSection'
const OtherDetails = () => {
    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <WizardSection iconBg="linear-gradient(135deg, #62E2FF 0%, #5D78DA 100%)"
                        icon={<img src={icon} alt="" />}
                        title="Other Details"
                        subtitle="When & where it happened"></WizardSection>
                </section>
                <div className='down_arrow_wrapper'>
                    <img src={'/Layer_1.svg'} />
                    <div style={{
                        background: 'rgba(159, 197, 61, 0.16)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <i class="fa-solid fa-angle-down" style={{
                            color: 'var(--deep-color)',
                            fontSize: '10px'
                        }}></i>
                    </div>
                </div>
            </div>

            <div className='physical_details_wrapper'>
                <CommonInput label={'Describe actions, behavior, or anything unusual observed by witnesses or staff.'} multiline placeholder='Enter details' style={{
                    height: '80px',
                    resize: 'none'
                }} />
            </div>

        </>
    )
}

export default OtherDetails
