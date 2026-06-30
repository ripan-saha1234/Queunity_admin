import React from 'react';
import {
  getCharityInvolvementLabel,
  getCharityTypeLabel,
} from '../../utils/caseDisplay';

const ViewClarityModal = ({ setmodalIsOpen, charity = {} }) => {
  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Charity</h5>
          <i className="fa-solid fa-xmark" onClick={() => setmodalIsOpen('')} />
        </div>

        <p
          style={{
            color: 'rgba(49, 65, 88, 1)',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >
          <strong style={{ marginBottom: '10px', display: 'block' }}>
            Involve Charity?
          </strong>
          {getCharityInvolvementLabel(charity.involvement)}
        </p>

        {charity.charity_name ? (
          <p
            style={{
              color: 'rgba(49, 65, 88, 1)',
              fontSize: '14px',
            }}
          >
            <strong style={{ marginBottom: '10px', display: 'block' }}>Charity Name</strong>
            {charity.charity_name}
          </p>
        ) : null}

        <p
          style={{
            color: 'rgba(49, 65, 88, 1)',
            fontSize: '14px',
          }}
        >
          <strong style={{ marginBottom: '10px', display: 'block' }}>
            Type of charity involvement
          </strong>
          {getCharityTypeLabel(charity.involvement_type)}
        </p>

        <p
          style={{
            color: 'rgba(49, 65, 88, 1)',
            fontSize: '14px',
          }}
        >
          <strong style={{ marginBottom: '10px', display: 'block' }}>
            Reason for involving charity
          </strong>
          {charity.reason || '-'}
        </p>
      </div>
    </div>
  );
};

export default ViewClarityModal;
