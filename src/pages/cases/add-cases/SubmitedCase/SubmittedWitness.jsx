import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import usePageHeader from '../../../../hooks/use-page-header';
import WitnessCard from '../AddWitness/WitnessCard';
import useCaseDetails from '../../../../hooks/use-case-details.jsx';
import { getCaseDisplayTitle, mapWitnessesToCards } from '../../../../utils/caseDisplay';

const SubmittedWitness = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { caseData, loading, error } = useCaseDetails(id);

  const displayTitle = getCaseDisplayTitle(caseData) || id || '';
  const witnessData = useMemo(
    () => mapWitnessesToCards(caseData?.witnesses),
    [caseData?.witnesses],
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
    title: 'Witnesses',
    breadcrumbs: [
      { title: 'Cases', link: '/cases' },
      { title: displayTitle, link: `/cases/case-submitted/${id}` },
      { title: 'Witness', link: `/cases/submitted-witness/${id}` },
    ],
    buttons: headerButtons,
  });

  if (loading) {
    return (
      <div className="add-suspects-screen">
        <div className="table1-no-data-container">
          <p>Loading witnesses...</p>
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
            <div className="add-suspects-title">Witnesses</div>
            <div className="add-suspects-subtitle">{witnessData.length} Witnesses recorded</div>
          </div>
        </div>
      </div>
      <div className="suspect_cards_Wrapper">
        {witnessData.length > 0 ? (
          witnessData.map((witness) => (
            <WitnessCard
              key={witness.id}
              noDelete
              noEdit
              witness={witness}
              submittedCaseId={id}
            />
          ))
        ) : (
          <div className="table1-no-data-container">
            <p>No witnesses recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedWitness;
