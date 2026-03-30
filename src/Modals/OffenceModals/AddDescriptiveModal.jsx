import React from 'react'
import CommonInput from '../../components/common-input'
import CommonButton from '../../components/common-button'

const AddDescriptiveModal = ({toggleFunc}) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Add Descriptive Question</h5>
                        <i onClick={(() => toggleFunc(0))} class="fa-solid fa-xmark" ></i>
                    </div>

                    <div className='radio_main'>
                        <label>Question <span>*</span></label>
                        <CommonInput placeholder='Enter question'/>
                    </div>

                    <div style={{
                        marginLeft: 'auto'
                    }}>
                        <CommonButton onClick={(() => toggleFunc(0))} text='Add' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDescriptiveModal
