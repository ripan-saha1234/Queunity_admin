import React, { useState } from 'react'
import ViewEvidenceModal from '../../../../Modals/CaseModals/ViewEvidenceModal';

const EvidenceCard = ({ evidence }) => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [evidenceTitle, setevidenceTitle] = useState('')
    return (
        <>
        {modalIsOpen && <ViewEvidenceModal title={evidenceTitle} setmodalIsOpen={setmodalIsOpen}/>}
            <div className={"card_01"}>
                <div className={"cardTop_02"}>
                    <div className={"leftSection_03"} style={{
                        alignItems: 'center'
                    }}>
                        <div className={"numberBox_04"}>{evidence.id}</div>

                        <div className={"titleSection_05"}>
                            <h3>{evidence.title}</h3>
                        </div>
                    </div>

                    <div className={"actionsWrap_06"}>
                        <button onClick={(() => {
                            setevidenceTitle(evidence?.title)
                            setmodalIsOpen(true)
                        })} className={"iconBtn_07 viewBtn_08"} title={"View"}>
                            <i className={"fa-regular fa-eye"}></i>
                        </button>
                    </div>
                </div>

                <div className={"cardBody_13"}>
                    <img style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        marginBottom: '10px'
                    }} src={evidence?.img} />
                    <p>
                        <strong style={{
                            display: 'block',
                            fontWeight: '600'
                        }}>Description</strong>
                        <span style={{
                            marginTop: '5px',
                            display: 'block'
                        }}>{evidence?.details}</span>
                    </p>

                </div>
            </div>
        </>
    )
}

export default EvidenceCard
