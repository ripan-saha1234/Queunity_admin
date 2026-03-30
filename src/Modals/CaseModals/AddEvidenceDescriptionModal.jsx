import React from 'react'
import '../Modals.css'
import InputCommon from '../../components/input_common'
import CommonInput from '../../components/common-input'
import CommonButton from '../../components/common-button'
const AddEvidenceDescriptionModal = ({setaddEvidence}) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Add Description</h5>
                        <i onClick={(() => setaddEvidence(false))} class="fa-solid fa-xmark"></i>
                    </div>
                    <div className='radio_main'>
                    <label style={{
                        marginLeft:'10px',
                        display:'block'
                    }}>Description</label>
                        <CommonInput style={{
                            height: '100px',
                            resize: 'none'
                        }} multiline placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation' />
                    </div>
                    <div style={{
                        marginLeft:'auto'
                    }}>
                        <CommonButton onClick={(() => setaddEvidence(false))} text='Add' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEvidenceDescriptionModal
