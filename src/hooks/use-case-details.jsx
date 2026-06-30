import { useCallback, useEffect, useState } from 'react';
import { getCaseById } from '../api/cases';

export default function useCaseDetails(caseId) {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(Boolean(caseId));
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    if (!caseId) {
      setCaseData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getCaseById(caseId);
      setCaseData(data);
    } catch (err) {
      setCaseData(null);
      setError(err.message || 'Failed to load case details');
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { caseData, loading, error, refetch };
}
