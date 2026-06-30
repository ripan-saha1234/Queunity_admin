import React from 'react';
import { getAnonymityLabel } from '../../utils/caseDisplay';

const AnnomityLevelModal = ({ setmodalIsOpen, value }) => {
  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Anonymity Level</h5>
          <i onClick={() => setmodalIsOpen('')} className="fa-solid fa-xmark" />
        </div>

        <p
          style={{
            color: 'rgba(20, 20, 20, 0.8)',
            marginTop: '15px',
            fontWeight: '500',
          }}
        >
          {getAnonymityLabel(value)}
        </p>
      </div>
    </div>
  );
};

export default AnnomityLevelModal;
