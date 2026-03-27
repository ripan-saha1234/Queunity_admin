import { useNavigate } from "react-router";
import CommonButton from "../../../components/common-button";
import SuspectCard from "./AddSuspectForm/SuspectCard";

export function AddSuspectsScreen() {
    const navigate = useNavigate()
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
        <div className="add-suspects-screen">
            <div className="add-suspects-card">
                <div className="add-suspects-card-left">
                    <div className="add-suspects-icon">
                        <img src="/suspects-icon.svg" alt="" />
                    </div>
                    <div className="add-suspects-card-text">
                        <div className="add-suspects-title">Add Suspects</div>
                        <div className="add-suspects-subtitle">{suspects?.length } suspect recorded</div>
                    </div>
                </div>

                <div className="add-suspects-card-right">
                    <CommonButton
                        text="Add Suspect"
                        img=""
                        backgroundColor="transparent"
                        color="#141414"
                        borderColor="#95C63D"
                        onClick={() => { navigate('/cases/add-suspect')}}
                    />
                </div>


            </div>
            <div className="suspect_cards_Wrapper">
                {suspects?.map((suspect) => {
                    return <SuspectCard suspect={suspect} />
                })}
            </div>
           
        </div>
    );
}