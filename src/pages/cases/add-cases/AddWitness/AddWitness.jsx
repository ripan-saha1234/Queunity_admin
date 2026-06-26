import { useNavigate } from "react-router";
import CommonButton from "../../../../components/common-button.jsx";
import WitnessCard from "./WitnessCard.jsx";
import { useCaseForm } from "../../../../context/CaseFormContext";

const RELATIONSHIP_LABELS = {
    schoolmate: "Schoolmate",
    external_student: "External",
    other: "Other",
};

function buildWitnessDetails(witness) {
    if (witness.do_you_know_the_witness) {
        const type = RELATIONSHIP_LABELS[witness.witness_relationship_type] || "Known";
        const details = [{ label: "Type", value: type }];

        if (witness.witness_relationship_type === "schoolmate" && witness.schoolmate) {
            details.push({ label: "Student Name", value: witness.schoolmate.student_name || "-" });
            details.push({ label: "Grade", value: witness.schoolmate.grade || "-" });
        } else if (witness.witness_relationship_type === "external_student" && witness.external_student) {
            details.push({ label: "School", value: witness.external_student.school_name || "-" });
            details.push({ label: "Grade", value: witness.external_student.grade || "-" });
        } else if (witness.witness_relationship_type === "other" && witness.other) {
            details.push({ label: "Witness Name", value: witness.other.witness_name || "-" });
            details.push({ label: "Organization", value: witness.other.organization || "-" });
        }
        return details;
    }

    const details = [];
    if (witness.physical_details) {
        details.push({
            label: "Physical Details",
            value: `Height - ${witness.physical_details.height_cm || "-"}cm | Build - ${witness.physical_details.build || "-"}`,
        });
    }
    if (witness.vehicle_details) {
        details.push({
            label: "Vehicle Details",
            value: `Type - ${witness.vehicle_details.vehicle_type || "-"}, Color - ${witness.vehicle_details.color || "-"}`,
        });
    }
    if (witness.other_details?.description) {
        details.push({ label: "Other Details", value: witness.other_details.description });
    }
    return details;
}

export function AddWitness() {
    const navigate = useNavigate()
    const { caseData, removeWitness } = useCaseForm()
    const witnessData = (caseData.witnesses || []).map((witness, index) => ({
        id: index + 1,
        title: `Witness #${index + 1}`,
        status: witness.do_you_know_the_witness ? "Known Witness" : "Unknown Witness",
        statusClass: witness.do_you_know_the_witness ? "statusKnown_11" : "statusUnknown_12",
        details: buildWitnessDetails(witness),
    }));

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
                {witnessData?.map((witness, index) => {
                    return (
                        <WitnessCard
                            key={witness.id}
                            witness={witness}
                            noEdit
                            onDelete={() => removeWitness(index)}
                        />
                    )
                })}
            </div>

        </div>
    );
}
