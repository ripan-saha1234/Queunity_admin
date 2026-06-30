import { useMemo } from 'react';
import { useCaseForm } from '../context/CaseFormContext';
import useCaseDetails from './use-case-details';
import { getCaseDisplayTitle } from '../utils/caseDisplay';

export default function usePersonFromCase({ personType, personId, submittedCaseId }) {
  const index = Number(personId) - 1;
  const shouldFetch = Boolean(submittedCaseId);
  const { caseData: apiCase, loading, error } = useCaseDetails(shouldFetch ? submittedCaseId : null);
  const { caseData: draftCase } = useCaseForm();

  const caseData = shouldFetch ? apiCase : draftCase;
  const list = personType === 'suspect' ? caseData?.suspects : caseData?.witnesses;

  const person = useMemo(() => {
    if (!Number.isFinite(index) || index < 0) return null;
    return list?.[index] ?? null;
  }, [index, list]);

  const resolvedError = useMemo(() => {
    if (error) return error;
    if (!shouldFetch && !loading && !person) {
      return `${personType === 'suspect' ? 'Suspect' : 'Witness'} not found`;
    }
    if (shouldFetch && !loading && !person) {
      return `${personType === 'suspect' ? 'Suspect' : 'Witness'} not found`;
    }
    return '';
  }, [error, shouldFetch, loading, person, personType]);

  return {
    person,
    caseData,
    loading: shouldFetch && loading,
    error: resolvedError,
    caseTitle: getCaseDisplayTitle(caseData) || submittedCaseId || '',
  };
}
