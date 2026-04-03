import { useParams } from 'react-router';
import usePageHeader from '../../../../hooks/use-page-header';
import WitnessCard from '../AddWitness/WitnessCard';

const SubmittedWitness = () => {
    const {id} = useParams()
    usePageHeader({
        title: `Witnesses`,
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "2025AWO77#", link: `/cases/case-submitted/${id}` },
            { title: "Witness", link: `/cases/submitted-witness/${id}` },
        ],
    })
    const witnessData = [
        {
            id: 1,
            title: "Witness #1",
            status: "Known Witness",
            statusClass: "statusKnown_11",
            details: [
                { label: "Name", value: "Asasa" },
                { label: "Type", value: "Schoolmate" },
                { label: "Student Name", value: "Bidisha Bhowmick – Grade 8 – #ST34522" },
            ],
        },
        {
            id: 2,
            title: "Witness #2",
            status: "Unknown Witness",
            statusClass: "statusUnknown_12",
            details: [
                { label: "Physical Details", value: "Height - 140cm | Build - Slim" },
                { label: "Vehicle Details", value: "Type - Sedan, Color - Dark Blue" },
                { label: "Other Details", value: "Lorem ipsum dolor sit amet..." },
            ],
        },
        {
            id: 3,
            title: "Witness #1",
            status: "Known Witness",
            statusClass: "statusKnown_11",
            details: [
                { label: "Name", value: "Asasa" },
                { label: "Type", value: "External" },
                { label: "Student Name", value: "Bidisha Bhowmick – Grade 8 – #ST34522" },
            ],
        },
        {
            id: 4,
            title: "Witness #1",
            status: "Known Witness",
            statusClass: "statusKnown_11",
            details: [
                { label: "Name", value: "Asasa" },
                { label: "Type", value: "Other" },
                { label: "Student Name", value: "Bidisha Bhowmick – Grade 8 – #ST34522" },
            ],
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
                            <div className="add-suspects-title">Witnesses</div>
                            <div className="add-suspects-subtitle">{witnessData?.length} Witnesses recorded</div>
                        </div>
                    </div>




                </div>
                <div className="suspect_cards_Wrapper">
                    {witnessData?.map((witness) => {
                        return (
                            <WitnessCard
                                noDelete={true}
                                noEdit={true}
                                witness={witness}
                                submittedCaseId={id}
                            />
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default SubmittedWitness
