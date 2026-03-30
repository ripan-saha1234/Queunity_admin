import React, { useState } from 'react'
import CommonButton from "../../../../components/common-button.jsx";
import { useNavigate } from 'react-router';
import EvidenceCard from './EvidenceCard.jsx';
import './Evidence.css'
const AllEvidence = () => {
    const navigate = useNavigate();
    const evidenceData = [
        {
            id: 1,
            title: "Evidence #1",
            img:'/Image (Vehicle 2).png',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'
        },
        {
            id: 2,
            title: "Evidence #2",
            img: '/Image (Vehicle 2).png',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'

        },
        {
            id: 3,
            title: "Evidence #3",
            img: '/Image (Vehicle 2).png',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'

        },
        {
            id: 4,
            title: "Evidence #4",
            img: '/Image (Vehicle 2).png',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'

        },
    ];
    return (
        <>
            <div className="add-suspects-screen">
                <div className="add-suspects-card">
                    <div className="add-suspects-card-left">
                        <div className="add-suspects-icon">
                            <img src="/suspects-icon.svg" alt="" />
                        </div>
                        <div className="add-suspects-card-text">
                            <div className="add-suspects-title">Add Evidence</div>
                            <div className="add-suspects-subtitle">{evidenceData?.length} Evidences recorded</div>
                        </div>
                    </div>

                    <div className="add-suspects-card-right">
                        <CommonButton
                            text="Add Evidence"
                            img=""
                            backgroundColor="transparent"
                            color="#141414"
                            borderColor="#95C63D"
                            onClick={() => { navigate('/cases/add-evidence') }}
                        />
                    </div>


                </div>
                <div className="all_evidence_cards_wrapper">
                    {evidenceData?.map((evidence) => {
                        return <EvidenceCard evidence={evidence} />
                    })}
                </div>

            </div>
        </>
    )
}

export default AllEvidence
