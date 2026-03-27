import { useNavigate } from "react-router";
import CommonButton from "../../../../components/common-button.jsx";
import WitnessCard from "./WitnessCard.jsx";


export function AddWitness() {
    const navigate = useNavigate()
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
        <div className="add-suspects-screen">
            <div className="add-suspects-card">
                <div className="add-suspects-card-left">
                    <div className="add-suspects-icon">
                        <img src="/suspects-icon.svg" alt="" />
                    </div>
                    <div className="add-suspects-card-text">
                        <div className="add-suspects-title">Add Witnesses</div>
                        <div className="add-suspects-subtitle">{witnessData?.length} Witnesses recorded</div>
                    </div>
                </div>

                <div className="add-suspects-card-right">
                    <CommonButton
                        text="Add Witness"
                        img=""
                        backgroundColor="transparent"
                        color="#141414"
                        borderColor="#95C63D"
                        onClick={() => {navigate('/cases/add-witness') }}
                    />
                </div>


            </div>
            <div className="suspect_cards_Wrapper">
                {witnessData?.map((witness) => {
                    return <WitnessCard witness={witness} />
                })}
            </div>

        </div>
    );
}