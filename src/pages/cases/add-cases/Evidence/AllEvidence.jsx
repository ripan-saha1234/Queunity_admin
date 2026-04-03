import React, { useMemo } from 'react'
import CommonButton from "../../../../components/common-button.jsx";
import { useNavigate, useParams } from 'react-router';
import EvidenceCard from './EvidenceCard.jsx';
import './Evidence.css'
import { WizardSection } from '../../../../components/WizardSection.jsx';
import icon from '../../../../Assets/Icon (6).svg'
import usePageHeader from '../../../../hooks/use-page-header.jsx';
const AllEvidence = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const backToViewCasesLink = id
        ? `/cases/case-submitted/${id}`
        : '/cases'

    const headerButtons = useMemo(
        () => [
            {
                type: 'button',
                text: 'Back to view cases',
                onClick: () => navigate(backToViewCasesLink),
                backgroundColor: '#95C63D',
                textColor: '#141414',
                borderColor: '#9FC53D',
            },
        ],
        [navigate, backToViewCasesLink],
    )

    usePageHeader({
        title: `Evidence`,
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "2025AWO77#", link: `/cases/case-submitted/${id}` },
            { title: "Evidence", link: `/cases/submitted-evidence/${id}` },
        ],
        buttons: headerButtons,
    })
    const evidenceData = [
        {
            id: 1,
            title: "Evidence #1",
            img: '/Image (Vehicle 2).png',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'
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
                        <WizardSection
                            iconBg="linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
                            icon={<img src={icon} alt="" />}
                            title="Evidence"
                            subtitle={`${evidenceData.length} Evidences found`}
                        >
                        </WizardSection>

                    </div>

                    {/* <div className="add-suspects-card-right">
                        <CommonButton
                            text="Add Evidence"
                            img=""
                            backgroundColor="transparent"
                            color="#141414"
                            borderColor="#95C63D"
                            onClick={() => { navigate('/cases/add-evidence') }}
                        />
                    </div> */}


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
