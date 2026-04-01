import React from 'react'
import CommonButton from '../../components/common-button'
import { useNavigate } from 'react-router'

const SummaryCaseModal = ({ setsummaryCase }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Case Summary</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setsummaryCase(false))}></i>
                    </div>
                    <div className='case_summary_list'>
                        <ul>
                            <li><strong>Date:</strong>27/10/2025</li>
                            <li><strong>Time:</strong> 10:07 AM</li>
                            <li><strong>Offense category:</strong>  Offense category 1</li>
                            <li><strong>Student involved:</strong>  Lorem Ipsum</li>
                            <li><strong>Evidence count:</strong>2</li>
                            <li><strong>Police reporting choice:</strong>Yes</li>
                            <li><strong>Charity reporting choice:</strong>No</li>
                            <li><strong>Selected resolution:</strong></li>
                            <strong>School administration may handle it at their discretion.</strong>

                        </ul>

                        <strong>Are you sure you want to submit this case?</strong>
                    </div>
                    <div style={{
                        marginLeft: 'auto',
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <CommonButton onClick={(() => setsummaryCase(false))} text='Cancel' backgroundColor={'transparent'} borderColor={'transparent'} />
                        <CommonButton onClick={(() => navigate('/cases/case-submitted/2'))} text='Yes' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryCaseModal
