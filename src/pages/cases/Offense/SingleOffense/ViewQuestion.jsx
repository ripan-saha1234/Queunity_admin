import React, { useState } from 'react'
import HeadLinks from '../../../../components/HeadLinks'
import CommonButton from '../../../../components/common-button'

const ViewQuestion = () => {
    const [viewQuestion, setviequestion] = useState()
    return (
        <>
            <div className='offense_wrapper'>
                <HeadLinks title2={'Offence 1'} title3={'View Question'} link3={'/view-question/2'} link2={'/single-offence/2'} title1={'Offence'} link1={'/offense'} name={'View Question'} />
                <div className='questions_head_wrapper'>
                    <h1 style={{
                        fontSize: '22px',
                        fontWeight: '600'
                    }}>Investigation Question Sets</h1>
                    <CommonButton backgroundColor={'transparent'} borderColor={'var(--primary-color)'} text='Create Question Set' />
                </div>
                {/* 
                <p style={{
                    marginTop:'20px'
                }}>No investigation question sets found.</p> */}
                {['Identifying info', 'Suspect Details', 'Witness Details'].map((e, index) => (
                    <div className='question_set_list_Wrapper'>
                        <div className='question_set_wrapper'>
                            <div className='question_set_head'>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <img src='/menu.svg' />
                                    <h3>{e}</h3>
                                </div>

                                <hr />

                                <div onClick={(() => setviequestion(index))} style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    background: `${viewQuestion == index ? ' var(--primary-color)' : 'rgba(241, 242, 249, 1)'}`
                                }}>
                                    {viewQuestion == index && <i class="fa-solid fa-angle-down"></i>}
                                    {viewQuestion != index && <i style={{
                                        color:'rgba(111, 108, 143, 1)'
                                    }} class="fa-solid fa-angle-up"></i>}
                                </div>
                            </div>

                            {viewQuestion == index && <>
                                <h4 style={{
                                    margin: '20px 0'
                                }}>Questions</h4>

                                <div className='added_question_list_wrapper'>
                                    {[1, 2, 3].map((e, i) => (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '15px 15px',
                                            borderRadius: '5px',
                                            background: '#f1f4f9'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <img src='/menu.svg' />
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <h5 style={{
                                                        fontSize: '15px',
                                                        fontWeight: '500'
                                                    }}>Question 1  </h5>
                                                    <small style={{
                                                        fontSize: '12px'
                                                    }}>Single Choice </small>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                gap: '7px',
                                                fontSize: '13px',
                                                cursor: 'pointer'
                                            }}>
                                                <i style={{
                                                    color: 'var(--primary-color)'
                                                }} class="fa-solid fa-pen"></i>
                                                <i style={{
                                                    color: 'rgba(20, 20, 20, 1)'
                                                }} class="fa-regular fa-trash-can"></i>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </>
                            }
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default ViewQuestion
