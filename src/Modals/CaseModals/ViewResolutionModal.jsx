import React from 'react'

const ViewResolutionModal = ({ setmodalIsOpen }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Resolution</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                    </div>

                    <p style={{
                        color: 'rgba(49, 65, 88, 1)',
                        fontSize: '14px',
                        fontWeight:'400'
                    }}><strong style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        marginBottom: '5px', display: 'block'
                    }}>School administration may handle it at their discretion. </strong>
                        Note: Restorative circle or conference</p>


                </div>
            </div>
        </>
    )
}

export default ViewResolutionModal
