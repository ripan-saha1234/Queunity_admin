import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import EvidenceCard from './EvidenceCard.jsx';
import './Evidence.css';
import { WizardSection } from '../../../../components/WizardSection.jsx';
import icon from '../../../../Assets/Icon (6).svg';
import usePageHeader from '../../../../hooks/use-page-header.jsx';
import useCaseDetails from '../../../../hooks/use-case-details.jsx';
import { getCaseDisplayTitle, mapEvidenceToCards } from '../../../../utils/caseDisplay';

const AllEvidence = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { caseData, loading, error } = useCaseDetails(id);

  const displayTitle = getCaseDisplayTitle(caseData) || id || '';
  const evidenceData = useMemo(
    () => mapEvidenceToCards(caseData?.evidence),
    [caseData?.evidence],
  );

  const backToViewCasesLink = id ? `/cases/case-submitted/${id}` : '/cases';

  const headerButtons = useMemo(
    () => [
      {
        type: 'button',
        text: 'Back to view cases',
        onClick: () => navigate(backToViewCasesLink),
        backgroundColor: '#95C63D',
        textColor: '#141414',
        borderColor: '#9FC53D',
      },
    ],
    [navigate, backToViewCasesLink],
  );

  usePageHeader({
    title: 'Evidence',
    breadcrumbs: [
      { title: 'Cases', link: '/cases' },
      { title: displayTitle, link: `/cases/case-submitted/${id}` },
      { title: 'Evidence', link: `/cases/submitted-evidence/${id}` },
    ],
    buttons: headerButtons,
  });

  if (loading) {
    return (
      <div className="add-suspects-screen">
        <div className="table1-no-data-container">
          <p>Loading evidence...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="add-suspects-screen">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-suspects-screen">
      <div className="add-suspects-card">
        <div className="add-suspects-card-left">
          <WizardSection
            iconBg="linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
            icon={<img src={icon} alt="" />}
            title="Evidence"
            subtitle={`${evidenceData.length} Evidences found`}
          />
        </div>
      </div>
      <div className="all_evidence_cards_wrapper">
        {evidenceData.length > 0 ? (
          evidenceData.map((evidence) => (
            <EvidenceCard key={evidence.id} evidence={evidence} />
          ))
        ) : (
          <div className="table1-no-data-container">
            <p>No evidence recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvidence;
