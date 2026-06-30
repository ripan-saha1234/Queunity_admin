import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WizardSection } from '../../../../components/WizardSection';
import AnnomityLevelModal from '../../../../Modals/CaseModals/AnnomityLevelModal.jsx';
import PrivacyLevelModal from '../../../../Modals/CaseModals/PrivacyLevelModal.jsx';
import ViewClarityModal from '../../../../Modals/CaseModals/ViewClarityModal.jsx';
import ViewPoliceModal from '../../../../Modals/CaseModals/ViewPoliceModal.jsx';
import ViewResolutionModal from '../../../../Modals/CaseModals/ViewResolutionModal.jsx';
import usePageHeader from '../../../../hooks/use-page-header.jsx';
import useCaseDetails from '../../../../hooks/use-case-details.jsx';
import {
  buildIncidentDetails,
  formatCreatedAt,
  getCaseDisplayTitle,
} from '../../../../utils/caseDisplay';
import icon from '../../../../Assets/Icon (5).svg';
import './SubmitedCase.css';

const SubmitedCase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { caseData, loading, error } = useCaseDetails(id);
  const [modalIsOpen, setmodalIsOpen] = useState('');

  const displayTitle = getCaseDisplayTitle(caseData) || id || '';
  const createdAt = formatCreatedAt(caseData?.created_at);
  const status = caseData?.status || 'Open';
  const isClosed = status === 'Closed';
  const detailsData = useMemo(() => buildIncidentDetails(caseData), [caseData]);

  const headerButtons = useMemo(
    () => [
      {
        type: 'button',
        text: 'Edit',
        backgroundColor: 'transparent',
        textColor: 'rgba(111, 124, 142, 1)',
        borderColor: 'rgba(217, 217, 217, 1)',
      },
      {
        type: 'button',
        text: 'Update Status',
        backgroundColor: 'rgba(220, 224, 229, 1)',
        textColor: 'rgba(111, 124, 142, 1)',
        borderColor: 'transparent',
      },
    ],
    [],
  );

  usePageHeader({
    title: displayTitle,
    breadcrumbs: [
      { title: 'Cases', link: '/cases' },
      { title: displayTitle, link: `/cases/case-submitted/${id}` },
    ],
    buttons: headerButtons,
  });

  if (loading) {
    return (
      <div className="submited_case_wrapper">
        <div className="table1-no-data-container">
          <p>Loading case details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="submited_case_wrapper">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {modalIsOpen === 'anonymity' && (
        <AnnomityLevelModal
          setmodalIsOpen={setmodalIsOpen}
          value={caseData?.anonymity_level}
        />
      )}

      {modalIsOpen === 'privacy' && (
        <PrivacyLevelModal
          setmodalIsOpen={setmodalIsOpen}
          value={caseData?.privacy_level}
        />
      )}

      {modalIsOpen === 'charity' && (
        <ViewClarityModal setmodalIsOpen={setmodalIsOpen} charity={caseData?.charity} />
      )}

      {modalIsOpen === 'police' && (
        <ViewPoliceModal setmodalIsOpen={setmodalIsOpen} police={caseData?.police} />
      )}

      {modalIsOpen === 'resolution' && (
        <ViewResolutionModal
          setmodalIsOpen={setmodalIsOpen}
          resolution={caseData?.resolution_desired}
        />
      )}

      <div className="submited_case_wrapper">
        <div className="submited_case_head">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div className="submited_email_box">
              <img src="/Icon (1).svg" alt="" />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
              }}
            >
              <h1
                style={{
                  fontWeight: '700',
                  fontSize: '24px',
                }}
              >
                {displayTitle}
              </h1>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'rgba(20, 20, 20, 0.8)',
                  }}
                >
                  <i className="fa-regular fa-calendar" />
                  <p style={{ fontWeight: '500' }}>Created date: {createdAt.date}</p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'rgba(20, 20, 20, 0.8)',
                  }}
                >
                  <i className="fa-regular fa-clock" />
                  <p style={{ fontWeight: '500' }}>Creation time: {createdAt.time}</p>
                </div>
              </div>
            </div>
          </div>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '7px 15px',
              background: isClosed ? 'rgba(220, 38, 38, 1)' : 'rgba(0, 166, 62, 1)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '13px',
              borderRadius: '15px',
            }}
          >
            <i className="fa-regular fa-circle-check" /> {status}
          </p>
        </div>

        <div className="submitted_case_details_wrapper">
          <div>
            <WizardSection
              iconBg=" linear-gradient(135deg, #FF8904 0%, #FF6467 100%)"
              icon={<img src={icon} alt="" />}
              title="Incident Details "
              subtitle="When & where it happened"
            />

            <div className="vehicle_details_box_wrapper">
              {detailsData.map((item) => (
                <div key={item.title} className="physical_details_box ">
                  <p>{item.title}</p>
                  <small>{item.para}</small>
                </div>
              ))}
            </div>
          </div>

          <h3
            style={{
              fontWeight: '600',
              fontSize: '23px',
              color: 'rgba(15, 23, 43, 1)',
            }}
          >
            Other Details
          </h3>
          <div className="case_details_cards_wrapper">
            <div className="case_details_card" onClick={() => setmodalIsOpen('anonymity')}>
              <div className="icon_image">
                <img src="/Icon (2).svg" alt="" />
              </div>
              <p>Anonymity Level</p>
            </div>

            <div className="case_details_card" onClick={() => setmodalIsOpen('privacy')}>
              <div className="icon_image">
                <img src="/Icon (3).svg" alt="" />
              </div>
              <p>Privacy Level</p>
            </div>

            <div
              className="case_details_card"
              onClick={() => navigate(`/cases/submitted-suspect/${id}`)}
            >
              <div className="icon_image">
                <img src="/Capa_1.svg" alt="" />
              </div>
              <p>Suspects</p>
            </div>

            <div
              className="case_details_card"
              onClick={() => navigate(`/cases/submitted-witness/${id}`)}
            >
              <div className="icon_image">
                <img src="/Icon (4).svg" alt="" />
              </div>
              <p>Witnesses</p>
            </div>

            <div
              className="case_details_card"
              onClick={() => navigate(`/cases/submitted-evidence/${id}`)}
            >
              <div className="icon_image">
                <img src="/Icon (6).svg" alt="" />
              </div>
              <p>Evidence</p>
            </div>

            <div className="case_details_card" onClick={() => setmodalIsOpen('charity')}>
              <div className="icon_image">
                <img src="/Capa_1 (1).svg" alt="" />
              </div>
              <p>Charity</p>
            </div>

            <div className="case_details_card" onClick={() => setmodalIsOpen('police')}>
              <div className="icon_image">
                <img src="/svg2532.svg" alt="" />
              </div>
              <p>Police</p>
            </div>

            <div className="case_details_card" onClick={() => setmodalIsOpen('resolution')}>
              <div className="icon_image">
                <img src="/Icon (5).svg" alt="" />
              </div>
              <p>Resolution</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitedCase;
