import React from 'react';
import CommonButton from '../../components/common-button';
import { formatIncidentDate, getPoliceInvolvementLabel } from '../../utils/caseDisplay';

const ViewPoliceModal = ({ setmodalIsOpen, police = {} }) => {
  const reportUrl = police.report_file_urls?.[0];

  return (
    <div className="modal_wrapper">
      <div className="modal_body">
        <div className="modal_head">
          <h5>Police</h5>
          <i className="fa-solid fa-xmark" onClick={() => setmodalIsOpen('')} />
        </div>

        <p
          style={{
            color: 'rgba(49, 65, 88, 1)',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >
          <strong style={{ marginBottom: '10px', display: 'block' }}>Involve Police?</strong>
          {getPoliceInvolvementLabel(police.involvement)}
        </p>

        <p style={{ color: 'rgba(49, 65, 88, 1)', fontSize: '14px' }}>
          <strong style={{ marginBottom: '10px', display: 'block' }}>Police Report Number</strong>
          {police.report_number || '-'}
        </p>

        <p style={{ color: 'rgba(49, 65, 88, 1)', fontSize: '14px' }}>
          <strong style={{ marginBottom: '10px', display: 'block' }}>Officer Name</strong>
          {police.officer_name || '-'}
        </p>

        <p style={{ color: 'rgba(49, 65, 88, 1)', fontSize: '14px' }}>
          <strong style={{ marginBottom: '10px', display: 'block' }}>Station / Department</strong>
          {police.station_department || '-'}
        </p>

        <p style={{ color: 'rgba(49, 65, 88, 1)', fontSize: '14px' }}>
          <strong style={{ marginBottom: '10px', display: 'block' }}>Date reported</strong>
          {formatIncidentDate(police.date_reported)}
        </p>

        {reportUrl ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>Police report</strong>
            <a href={reportUrl} target="_blank" rel="noreferrer">
              <CommonButton
                text="Download Report"
                backgroundColor="transparent"
                borderColor="var(--primary-color)"
              />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewPoliceModal;
