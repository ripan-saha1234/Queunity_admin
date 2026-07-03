import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePageHeader from '../../../../hooks/use-page-header';
import usePersonFromCase from '../../../../hooks/use-person-from-case';
import { useCaseForm } from '../../../../context/CaseFormContext';
import { getCaseWizardPath } from '../../../../utils/caseRoutes';
import {
  SuspectPersonContent,
} from '../../../../components/case-view/PersonViewSections';
import './ViewSuspect.css';

const ViewSuspect = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const returnStep = useMemo(() => {
    const step = Number(searchParams.get('step'));
    return Number.isFinite(step) ? step : 1;
  }, [searchParams]);

  const isReadOnlyView = searchParams.get('readonly') === '1';
  const submittedCaseId = searchParams.get('submittedCaseId');
  const { person, loading, error, caseTitle } = usePersonFromCase({
    personType: 'suspect',
    personId: id,
    submittedCaseId,
  });

  const isKnown = person?.do_you_know_the_suspect === true;

  const { isEditing, editMeta } = useCaseForm();
  const editCaseId = isEditing ? editMeta?.case_id : null;

  const backToSuspectListLink = submittedCaseId
    ? `/cases/submitted-suspect/${submittedCaseId}`
    : getCaseWizardPath(returnStep, editCaseId);

  const backToViewCasesLink = submittedCaseId
    ? `/cases/case-submitted/${submittedCaseId}`
    : '/cases';

  const headerButtons = useMemo(() => {
    if (isReadOnlyView) {
      return [
        {
          type: 'button',
          text: 'Back to view cases',
          onClick: () => navigate(backToViewCasesLink),
          backgroundColor: '#95C63D',
          textColor: '#141414',
          borderColor: '#9FC53D',
        },
      ];
    }

    return [
      {
        type: 'button',
        text: 'Back to Suspect list',
        onClick: () => navigate(backToSuspectListLink),
        backgroundColor: '#95C63D',
        textColor: '#141414',
        borderColor: '#9FC53D',
      },
      {
        type: 'icon',
        img: '/head-edit.svg',
        backgroundColor: '#DBEAFE',
        onClick: () => {},
      },
      {
        type: 'icon',
        img: '/head-delete.svg',
        backgroundColor: '#FFE2E2',
        onClick: () => {},
      },
    ];
  }, [navigate, isReadOnlyView, backToSuspectListLink, backToViewCasesLink]);

  usePageHeader({
    title: `View Suspect ${id}`,
    breadcrumbs: submittedCaseId
      ? [
          { title: 'Cases', link: '/cases' },
          { title: caseTitle, link: `/cases/case-submitted/${submittedCaseId}` },
          { title: 'Suspects', link: `/cases/submitted-suspect/${submittedCaseId}` },
          { title: `View Suspect ${id}`, link: location.pathname + location.search },
        ]
      : [
          { title: 'Cases', link: '/cases' },
          { title: 'Add Case', link: '/cases/add-cases' },
          { title: `View Suspect ${id}`, link: location.pathname + location.search },
        ],
    buttons: headerButtons,
  });

  if (loading) {
    return (
      <div className="view_suspect_wrapper">
        <div className="table1-no-data-container">
          <p>Loading suspect details...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="view_suspect_wrapper">
        <div className="table1-no-data-container">
          <p>{error || 'Suspect not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view_suspect_wrapper">
      <div className="view_suspect_heading">
        <div className="suspect_name_wrapper">
          <img src="/Container (5).svg" alt="" />
          <h5>Suspect #{id}</h5>
        </div>
        <p
          style={
            isKnown
              ? { background: 'rgba(0, 166, 62, 1)' }
              : undefined
          }
        >
          {isKnown ? 'Known Suspect' : 'Unknown Suspect'}
        </p>
      </div>

      <SuspectPersonContent suspect={person} />
    </div>
  );
};

export default ViewSuspect;
