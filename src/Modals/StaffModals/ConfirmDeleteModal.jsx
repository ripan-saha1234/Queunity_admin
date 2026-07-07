import "../Modals.css";
import "./confirm-delete-modal.css";
import CommonButton from "../../components/common-button";

function ConfirmDeleteModal({ title = "Delete", name, onClose, onConfirm }) {
  return (
    <div className="modal_wrapper" role="presentation" onClick={onClose}>
      <div
        className="modal_body confirm-delete-modal"
        role="dialog"
        aria-labelledby="confirm-delete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head">
          <h5 id="confirm-delete-title">{title}</h5>
          <button type="button" className="add-evidence-modal__close" aria-label="Close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <p className="confirm-delete-modal__message">
          Are you sure you want to delete
          {name ? (
            <>
              {" "}
              <strong>{name}</strong>
            </>
          ) : null}
          ?
        </p>
        <div className="confirm-delete-modal__footer">
          <CommonButton
            text="Cancel"
            backgroundColor="#D9D9D9"
            color="#404040"
            borderColor="#D9D9D9"
            onClick={onClose}
          />
          <CommonButton
            text="Done"
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            onClick={async () => {
              await onConfirm?.();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
