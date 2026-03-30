import React from 'react'
import CommonButton from '../../components/common-button'
import CommonInput from '../../components/common-input'

const AddSingleQuestionModal = ({ toggleFunc }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body' style={{
                    height:'87vh',
                    overflowY:'auto'
                }}>
                    <div className='modal_head'>
                        <h5>Add Single Choice Question</h5>
                        <i onClick={(() => toggleFunc(0))} class="fa-solid fa-xmark" ></i>
                    </div>
                    <div className='radio_main'>
                        <label style={{
                            marginLeft: '10px',
                            display: 'block'
                        }}>Question <span>*</span></label>
                        <CommonInput placeholder='Enter question' />
                    </div>

                    <div className='options_wrapper'>
                        <h3>Options</h3>
                        <CommonButton text='Add Option' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />
                    </div>

                    <div className='options_list_wrapper'>
                    {[1,2,3].map((e,i)=>(
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div className='option_left'>
                                <div className='radio_main'>
                                    <label style={{
                                        marginLeft: '10px',
                                        display: 'block'
                                    }}>Option {i+1} <span>*</span></label>
                                    <CommonInput placeholder='Enter question' />
                                </div>
                            </div>
                            <div className='option_right'>
                                <div style={{
                                    padding: '10px',
                                    background: 'rgba(243, 243, 243, 1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    borderRadius: '5px',
                                    marginTop: '25px',
                                    cursor: 'pointer'

                                }}>
                                    <i style={{
                                        fontSize: '15px',
                                        color: '#404040',
                                        cursor: 'pointer'
                                    }} class="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                       

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

export default AddSingleQuestionModal
