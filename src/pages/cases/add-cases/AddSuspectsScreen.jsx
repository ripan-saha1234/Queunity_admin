import CommonButton from "../../../components/common-button";

export function AddSuspectsScreen() {
    return (
        <div className="add-suspects-screen">
            <div className="add-suspects-card">
                <div className="add-suspects-card-left">
                    <div className="add-suspects-icon">
                        <img src="/suspects-icon.svg" alt="" />
                    </div>
                    <div className="add-suspects-card-text">
                        <div className="add-suspects-title">Add Suspects</div>
                        <div className="add-suspects-subtitle">0 suspect recorded</div>
                    </div>
                </div>

                <div className="add-suspects-card-right">
                    <CommonButton
                        text="Add Suspect"
                        img=""
                        backgroundColor="transparent"
                        color="#141414"
                        borderColor="#95C63D"
                        onClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}