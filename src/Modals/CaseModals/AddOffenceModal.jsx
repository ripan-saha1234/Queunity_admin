import { useState } from "react";
import CommonInput from "../../components/common-input";
import CommonButton from "../../components/common-button";
import { useToast } from "../../components/toast/ToastProvider";
import { addOffence, validateOffenceForm } from "../../api/offence";

const AddOffenceModal = ({ setaddOffense, onSuccess }) => {
  const { showToast } = useToast();
  const [offenseName, setOffenseName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    if (!submitting) setaddOffense(false);
  };

  const handleAdd = async () => {
    const validationError = validateOffenceForm({ offenseName });
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      const response = await addOffence({ offenseName });
      showToast(response?.message || "Offense added successfully", "success");
      setaddOffense(false);
      await onSuccess?.();
    } catch (err) {
      showToast(err?.message || "Failed to add offense", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Add Offense</h5>
          <i className="fa-solid fa-xmark" onClick={handleClose} />
        </div>
        <div className="radio_main">
          <label
            style={{
              marginLeft: "10px",
              display: "block",
            }}
          >
            Offense Name <span>*</span>
          </label>
          <CommonInput
            placeholder="Enter offence name"
            value={offenseName}
            onChange={(e) => setOffenseName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div
          onClick={submitting ? undefined : handleAdd}
          style={{
            marginLeft: "auto",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          <CommonButton
            text={submitting ? "Adding..." : "Add"}
            backgroundColor="var(--primary-color)"
            borderColor="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default AddOffenceModal;
