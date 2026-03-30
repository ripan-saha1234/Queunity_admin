import React from 'react'
import CommonInput from '../../components/common-input'
import CommonButton from '../../components/common-button'

const AddOffenceModal = ({ setaddOffense }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Add Offense</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setaddOffense(false))}></i>
                    </div>
                    <div className='radio_main'>
                        <label style={{
                            marginLeft: '10px',
                            display: 'block'
                        }}>Offense Name <span>*</span></label>
                        <CommonInput  placeholder='Enter offence name' />
                    </div>
                    <div onClick={(() => setaddOffense(false))} style={{
                        marginLeft: 'auto'
                    }}>
                        <CommonButton text='Add' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddOffenceModal
