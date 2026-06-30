import React from 'react';
import { getPrivacyDisplay } from '../../utils/caseDisplay';

const PrivacyLevelModal = ({ setmodalIsOpen, value }) => {
  const privacy = getPrivacyDisplay(value);

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Privacy Level</h5>
          <i onClick={() => setmodalIsOpen('')} className="fa-solid fa-xmark" />
        </div>

        <p
          style={{
            color: 'rgba(20, 20, 20, 0.8)',
            marginTop: '15px',
            fontWeight: '500',
          }}
        >
          {privacy.title}
          {privacy.note ? (
            <>
              <br />
              <br />
              {privacy.note}
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default PrivacyLevelModal;
