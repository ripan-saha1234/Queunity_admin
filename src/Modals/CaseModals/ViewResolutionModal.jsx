import React from 'react';
import { getResolutionDisplay } from '../../utils/caseDisplay';

const ViewResolutionModal = ({ setmodalIsOpen, resolution }) => {
  const resolutionDisplay = getResolutionDisplay(resolution);

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Resolution</h5>
          <i className="fa-solid fa-xmark" onClick={() => setmodalIsOpen('')} />
        </div>

        <p
          style={{
            color: 'rgba(49, 65, 88, 1)',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          <strong
            style={{
              fontWeight: '500',
              fontSize: '14px',
              marginBottom: '5px',
              display: 'block',
            }}
          >
            {resolutionDisplay.title}
          </strong>
          {resolutionDisplay.note || null}
        </p>
      </div>
    </div>
  );
};

export default ViewResolutionModal;
