import { useNavigate } from "react-router";
import CommonButton from "../../../components/common-button";
import SuspectCard from "./AddSuspectForm/SuspectCard";
import { useCaseForm } from "../../../context/CaseFormContext";

const RELATIONSHIP_LABELS = {
    schoolmate: "Schoolmate",
    external_student: "External",
    other: "Other",
};

function buildSuspectDetails(suspect) {
    if (suspect.do_you_know_the_suspect) {
        const type = RELATIONSHIP_LABELS[suspect.suspect_relationship_type] || "Known";
        const details = [{ label: "Type", value: type }];

        if (suspect.suspect_relationship_type === "schoolmate" && suspect.schoolmate) {
            details.push({ label: "Student Name", value: suspect.schoolmate.student_name || "-" });
        } else if (suspect.suspect_relationship_type === "external_student" && suspect.external_student) {
            details.push({ label: "Student Name", value: suspect.external_student.student_name || "-" });
            details.push({ label: "School", value: suspect.external_student.school_name || "-" });
        } else if (suspect.suspect_relationship_type === "other" && suspect.other) {
            details.push({ label: "Suspect Name", value: suspect.other.suspect_name || "-" });
            details.push({ label: "Organization", value: suspect.other.organization || "-" });
        }
        return details;
    }

    const details = [];
    if (suspect.physical_details) {
        details.push({
            label: "Physical Details",
            value: `Height - ${suspect.physical_details.height_cm || "-"}cm | Build - ${suspect.physical_details.build || "-"}`,
        });
    }
    if (suspect.vehicle_details) {
        details.push({
            label: "Vehicle Details",
            value: `Type - ${suspect.vehicle_details.vehicle_type || "-"}, Color - ${suspect.vehicle_details.color || "-"}`,
        });
    }
    if (suspect.other_details?.description) {
        details.push({ label: "Other Details", value: suspect.other_details.description });
    }
    return details;
}

export function AddSuspectsScreen() {
    const navigate = useNavigate()
    const { caseData, removeSuspect } = useCaseForm()
    const suspects = (caseData.suspects || []).map((suspect, index) => ({
        id: index + 1,
        title: `Suspect #${index + 1}`,
        status: suspect.do_you_know_the_suspect ? "Known Suspect" : "Unknown Suspect",
        statusClass: suspect.do_you_know_the_suspect ? "statusKnown_11" : "statusUnknown_12",
        details: buildSuspectDetails(suspect),
    }));

    return (
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

                <div className="add-suspects-card-right">
                    <CommonButton
                        text="Add Suspect"
                        img=""
                        backgroundColor="transparent"
                        color="#141414"
                        borderColor="#95C63D"
                        onClick={() => { navigate('/cases/add-suspect') }}
                    />
                </div>


            </div>
            <div className="suspect_cards_Wrapper">
                {suspects?.map((suspect, index) => {
                    return (
                        <SuspectCard
                            key={suspect.id}
                            suspect={suspect}
                            noedit
                            onDelete={() => removeSuspect(index)}
                        />
                    )
                })}
            </div>

        </div>
    );
}
