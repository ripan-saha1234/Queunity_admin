import React from 'react'

const ViewClarityModal = ({ setmodalIsOpen }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Charity</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                    </div>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',
                        marginTop:'10px'
                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                    }}>Type of charity involvement </strong>
                        Counseling support</p>


                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                    }}>Involve Charity? </strong>
                        Inform now </p>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',

                    }}><strong style={{
                        marginBottom: '10px', display: 'block'
                    }}>Reason for involving charity </strong>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>


                </div>
            </div>
        </>
    )
}

export default ViewClarityModal
