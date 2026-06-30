import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import SuspectCard from '../AddSuspectForm/SuspectCard.jsx';
import usePageHeader from '../../../../hooks/use-page-header.jsx';
import useCaseDetails from '../../../../hooks/use-case-details.jsx';
import { getCaseDisplayTitle, mapSuspectsToCards } from '../../../../utils/caseDisplay';

const SubmittedSuspect = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { caseData, loading, error } = useCaseDetails(id);

  const displayTitle = getCaseDisplayTitle(caseData) || id || '';
  const suspects = useMemo(
    () => mapSuspectsToCards(caseData?.suspects),
    [caseData?.suspects],
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
    title: 'Suspects',
    breadcrumbs: [
      { title: 'Cases', link: '/cases' },
      { title: displayTitle, link: `/cases/case-submitted/${id}` },
      { title: 'Suspects', link: `/cases/submitted-suspect/${id}` },
    ],
    buttons: headerButtons,
  });

  if (loading) {
    return (
      <div className="add-suspects-screen">
        <div className="table1-no-data-container">
          <p>Loading suspects...</p>
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
          <div className="add-suspects-icon">
            <img src="/suspects-icon.svg" alt="" />
          </div>
          <div className="add-suspects-card-text">
            <div className="add-suspects-title">Suspects</div>
            <div className="add-suspects-subtitle">{suspects.length} suspect recorded</div>
          </div>
        </div>
      </div>
      <div className="suspect_cards_Wrapper">
        {suspects.length > 0 ? (
          suspects.map((suspect) => (
            <SuspectCard
              key={suspect.id}
              nodelete
              noedit
              suspect={suspect}
              submittedCaseId={id}
            />
          ))
        ) : (
          <div className="table1-no-data-container">
            <p>No suspects recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedSuspect;
