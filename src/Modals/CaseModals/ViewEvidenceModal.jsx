import React from 'react'
import '../Modals.css'

const ViewEvidenceModal = ({
  title,
  setmodalIsOpen,
  imageSrc = '/Image (Vehicle 2).png',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}) => {
  return (
    <>
      <div className="modal_wrapper" role="presentation" onClick={() => setmodalIsOpen(false)}>
        <div
          className="modal_body"
          role="dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal_head">
            <h5>{title}</h5>
            <button
              type="button"
              className="add-evidence-modal__close"
              aria-label="Close"
              onClick={() => setmodalIsOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <img
            style={{
              width: '100%',
              borderRadius: '10px',
              height: '250px',
              objectFit: 'cover',
            }}
            src={imageSrc}
            alt=""
          />

          <p
            style={{
              color: 'rgba(49, 65, 88, 1)',
              fontSize: '14px',
            }}
          >
            <strong
              style={{
                marginBottom: '10px',
                display: 'block',
              }}
            >
              Description:
            </strong>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default ViewEvidenceModal
