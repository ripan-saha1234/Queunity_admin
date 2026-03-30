import React from 'react'
import CommonInput from '../../components/common-input'
import CommonButton from '../../components/common-button'

const EditOffenceModal = ({ seteditOffence }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Edit Offense</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => seteditOffence(false))}></i>
                    </div>
                    <div className='radio_main'>
                        <label style={{
                            marginLeft: '10px',
                            display: 'block'
                        }}>Offense Name <span>*</span></label>
                        <CommonInput placeholder='Enter offence name' />
                    </div>
                    <div onClick={(() => seteditOffence(false))} style={{
                        marginLeft: 'auto'
                    }}>
                        <CommonButton text='Save' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditOffenceModal
