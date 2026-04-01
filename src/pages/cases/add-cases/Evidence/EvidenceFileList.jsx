import React, { useState } from 'react'
import './Evidence.css'
import AddEvidenceDescriptionModal from '../../../../Modals/CaseModals/AddEvidenceDescriptionModal'
const EvidenceFileList = () => {
    const [addEvidence, setaddEvidence] = useState(false)
    return (
        <>
            {addEvidence && <AddEvidenceDescriptionModal setaddEvidence={setaddEvidence} />}
            <div className='evidence_file_list_Wrapper'>
                {['/Frame 17.png', '/Frame 17 (1).png', '/Frame 17 (1).png'].map((e, i) => (
                    <div className='evidence_file_box'>
                        <div className='evidence_file_details_wrapper'>
                            <div className='evidence_file_image_name_wrapper'>
                                <img className='evidence_file_image' src={e} />
                                <div className='evidence_name_wrapper'>
                                    <h6>File Uploader Modals.png</h6>
                                    {i < 2 && <p>220KB <li>1 minute left</li></p>}
                                    {i == 2 && <h5 style={{
                                        fontSize: '12px',
                                        color: 'rgba(159, 197, 61, 1)',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        marginBottom: '0px'
                                    }} onClick={(()=>setaddEvidence(true))}>Add Description</h5>}
                                </div>
                            </div>
                            <div className='cross_percentage_wrapper'>
                                <div className='cross_icon_box' style={{
                                    padding: '5px 5px',
                                    border: '1px solid rgba(20, 20, 20, 0.17)',
                                    borderRadius: '3px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '8px',
                                    width:'fit-content',
                                    cursor:'pointer'
                                }}>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                                <p style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '13px'
                                }}>{i * 50}%</p>
                            </div>
                        </div>

                        <div className='evidence_file_upload_progess'>
                            <div className='evidence_file_upload_inside' style={{
                                width: `${i * 50}%`
                            }}></div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default EvidenceFileList
