import "../Modals.css";
import "./view-staff-modal.css";
import CommonButton from "../../components/common-button";

const DEFAULT_PHOTO = "/view-image.svg";

function ViewStaffModal({ staff, onClose, onEditStaff }) {
  if (!staff) return null;

  const name = staff.companyName?.name ?? "";
  const idText = staff.companyName?.id || `#${staff.staffId}`;
  const phone = staff.phone ?? "";
  const email = staff.email ?? "";
  const role = staff.role ?? "";
  const imageSrc = staff.photoUrl || DEFAULT_PHOTO;

  return (
    <div className="modal_wrapper" role="presentation" onClick={onClose}>
      <div
        className="modal_body view-staff-modal"
        role="dialog"
        aria-labelledby="view-staff-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head view-staff-modal__head">
          <h5 id="view-staff-modal-title" className="view-staff-modal__title">
            <span className="view-staff-modal__name">{name}</span>
            <span className="view-staff-modal__id"> ({idText})</span>
          </h5>
          <button
            type="button"
            className="add-evidence-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="view-staff-modal__photo-wrap">
          <img className="view-staff-modal__photo" src={imageSrc} alt="" />
        </div>

        <hr className="view-staff-modal__divider" />

        <dl className="view-staff-modal__details">
          <div className="view-staff-modal__row">
            <dt>Phone number</dt>
            <dd>{phone}</dd>
          </div>
          <div className="view-staff-modal__row">
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div className="view-staff-modal__row">
            <dt>Role</dt>
            <dd>{role}</dd>
          </div>
        </dl>

        <div className="view-staff-modal__footer">
          <CommonButton
            text="Edit Staff"
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            onClick={() => {
              onEditStaff?.();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewStaffModal;
