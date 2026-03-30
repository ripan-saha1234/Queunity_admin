import React from 'react'
import CommonButton from '../../components/common-button'
import CommonInput from '../../components/common-input'

const AddUploadModal = ({toggleFunc}) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body' >
                    <div className='modal_head'>
                        <h5>Add File Upload Question</h5>
                        <i onClick={(() => toggleFunc(0))} class="fa-solid fa-xmark" ></i>
                    </div>
                    <div className='radio_main'>
                        <label style={{
                            marginLeft: '10px',
                            display: 'block'
                        }}>Question <span>*</span></label>
                        <CommonInput placeholder='Enter question' />
                    </div>

                    <div>
                        <h3>Choose File format to upload</h3>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '30px',
                            marginTop:'20px'
                        }}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <input style={{
                                    width: '17px',
                                    height: '17px',
                                    accentColor: 'var(--primary-color)'
                                }} type='checkbox' />
                                <p>pdf</p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <input style={{
                                    width: '17px',
                                    height: '17px',
                                    accentColor: 'var(--primary-color)'
                                }} type='checkbox' />
                                <p>jpg</p>
                            </div>


                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <input style={{
                                    width: '17px',
                                    height: '17px',
                                    accentColor: 'var(--primary-color)'
                                }} type='checkbox' />
                                <p>png</p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <input style={{
                                    width: '17px',
                                    height: '17px',
                                    accentColor: 'var(--primary-color)'
                                }} type='checkbox' />
                                <p>jpeg</p>
                            </div>
                        </div>
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

export default AddUploadModal
