import React from 'react'
import CommonInput from '../../../../components/common-input'
import icon from '../../../../Assets/regular.svg'
import { WizardSection } from '../../../../components/WizardSection'
const OtherDetails = ({ isOpen = false, onToggle = () => { } }) => {
    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <WizardSection iconBg="linear-gradient(135deg, #62E2FF 0%, #5D78DA 100%)"
                        icon={<img src={icon} alt="" />}
                        title="Other Details"
                        subtitle="Any other helpful information"></WizardSection>
                </section>
                <div className='down_arrow_wrapper' onClick={onToggle} style={{ cursor: 'pointer' }}>
                    <img src={'/Layer_1.svg'} />
                    <div style={{
                        background: isOpen ? 'rgba(159, 197, 61, 0.16)' : '#e5e7eb',
                        width: '28px',
                        height: '28px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <i class="fa-solid fa-angle-down" style={{
                            color: 'var(--deep-color)',
                            fontSize: '10px',
                            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.2s ease'
                        }}></i>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='physical_details_wrapper'>
                    <CommonInput label={'Describe actions, behavior, or anything unusual observed by witnesses or staff.'} multiline placeholder='Enter details' style={{
                        height: '80px',
                        resize: 'none'
                    }} />
                </div>
            )}

        </>
    )
}

export default OtherDetails
