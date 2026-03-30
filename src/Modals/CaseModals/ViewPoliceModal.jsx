import React from 'react'
import CommonButton from '../../components/common-button'

const ViewPoliceModal = ({ setmodalIsOpen }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Police</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                    </div>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',
                        marginTop: '10px'
                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                        }}>Involve Police? </strong>
                        Already reported to police</p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                        }}> Police Report Number </strong>
                        44558959s </p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                        }}>Officer Name </strong>
                        Lorem Ipsum</p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                        }}>Station / Department </strong>
                        Teacher</p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                        }}>Date reported</strong>
                        12/06/2025</p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                    }}>Police reported</strong>
                        12/06/2025</p>

                        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}>

                        <strong>Police report</strong>
                        <CommonButton text='Download Report' backgroundColor={'transparent'} borderColor={'var(--primary-color)'}/>
                        </div>
                </div>
            </div>
        </>
    )
}

export default ViewPoliceModal
