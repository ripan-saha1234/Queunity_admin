import { useNavigate, useParams } from "react-router";
import CommonButton from "../../../../components/common-button.jsx";
import SuspectCard from "../AddSuspectForm/SuspectCard.jsx";
import usePageHeader from '../../../../hooks/use-page-header.jsx';
const SubmittedSuspect = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    usePageHeader({
        title: `Suspects`,
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "2025AWO77#", link: `/cases/case-submitted/${id}` },
            { title: "Suspects", link: `/cases/submitted-suspect/${id}` },
        ],
    })
    const suspects = [
        {
            id: 1,
            title: "Suspect #1",
            status: "Known Suspect",
            statusClass: "statusKnown_11",
            details: [
                { label: "Name", value: "Asasa" },
                { label: "Type", value: "Schoolmate" },
                { label: "Student Name", value: "Bidisha Bhowmick – Grade 8 – #ST34522" },
            ],
        },
        {
            id: 2,
            title: "Suspect #2",
            status: "Unknown Suspect",
            statusClass: "statusUnknown_12",
            details: [
                { label: "Physical Details", value: "Height - 140cm | Build - Slim" },
                { label: "Vehicle Details", value: "Type - Sedan, Color - Dark Blue" },
                { label: "Other Details", value: "Lorem ipsum dolor sit amet..." },
            ],
        },
        {
            id: 3,
            title: "Suspect #3",
            status: "Known Suspect",
            statusClass: "statusKnown_11",
            details: [
                { label: "Name", value: "Asasa" },
                { label: "Type", value: "External" },
                { label: "Student Name", value: "Bidisha Bhowmick – Grade 8 – #ST34522" },
            ],
        },
        {
            id: 4,
            title: "Suspect #4",
            status: "Known Suspect",
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
                            <div className="add-suspects-title">Add Suspects</div>
                            <div className="add-suspects-subtitle">{suspects?.length} suspect recorded</div>
                        </div>
                    </div>
                </div>
                <div className="suspect_cards_Wrapper">
                    {suspects?.map((suspect) => {
                        return <SuspectCard nodelete={true} noedit={true} suspect={suspect} />
                    })}
                </div>
            </div>
        </>
    )
}

export default SubmittedSuspect
