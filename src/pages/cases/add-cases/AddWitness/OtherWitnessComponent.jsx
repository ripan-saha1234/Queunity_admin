import React from 'react'
import CommonInput from '../../../../components/common-input'

const OtherWitnessComponent = () => {
    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <div className="add-cases-section-header">
                        <div className="add-cases-section-icon">
                            <img src={'/Container (4).svg'} />
                        </div>
                        <div className="add-cases-section-header-text">
                            <h3 className="add-cases-section-title">Other Details</h3>
                            <p className="add-cases-section-subtitle">When & where it happened</p>
                        </div>
                    </div>
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
                <label style={{
                    marginBottom:'10px',
                    display:'block'
                }}>Behavior Observed</label>
                <CommonInput multiline placeholder='Enter details' style={{
                    height: '80px',
                    resize: 'none'
                }} />
            </div>

        </>
    )
}

export default OtherWitnessComponent
