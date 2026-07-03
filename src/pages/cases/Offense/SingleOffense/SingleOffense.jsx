import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommonTable from '../../../../components/common-table';
import usePageHeader from '../../../../hooks/use-page-header';
import { useToast } from '../../../../components/toast/ToastProvider';
import AddSubCategoryModal from '../../../../Modals/OffenceModals/AddSubCategoryModal';
import { getOffenceById } from '../../../../api/offence';

const SingleOffense = () => {
  const { id: offenseId } = useParams();
  const [search, setSearch] = useState('');
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [offenseName, setOffenseName] = useState('Offense');
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const loadOffence = useCallback(async ({ silent = false } = {}) => {
    if (!offenseId) {
      setError('Offense ID is missing');
      if (!silent) setLoading(false);
      return;
    }

    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const data = await getOffenceById(offenseId);
      setOffenseName(data.offenseName || 'Offense');
      setSubCategories(data.subCategories ?? []);
    } catch (err) {
      setSubCategories([]);
      if (!silent) {
        setError(err.message || 'Failed to load offense details');
      } else {
        throw err;
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [offenseId]);

  const handleSubCategoryAdded = useCallback(async () => {
    try {
      await loadOffence({ silent: true });
    } catch (err) {
      showToast(err?.message || 'Failed to refresh sub-categories', 'error');
    }
  }, [loadOffence, showToast]);

  useEffect(() => {
    loadOffence();
  }, [loadOffence]);

  const headerButtons = useMemo(
    () => [
      {
        type: 'button',
        text: 'Add Sub-Category',
        onClick: () => setAddSubCategory(true),
        backgroundColor: 'transparent',
        textColor: '#141414',
        borderColor: '#9FC53D',
      },
      {
        type: 'button',
        text: 'View Question',
        backgroundColor: '#95C63D',
        textColor: '#141414',
        borderColor: '#9FC53D',
        onClick: () => navigate(`/view-question/${offenseId}`),
      },
      {
        type: 'search',
        name: 'searchSubCategory',
        value: search,
        onChange: (e) => setSearch(e.target.value),
        inputType: 'text',
      },
      {
        type: 'icon',
        img: '/filter_icon.svg',
        onClick: () => {},
      },
    ],
    [navigate, offenseId, search],
  );

  usePageHeader({
    title: offenseName,
    breadcrumbs: [
      { title: 'Offense', link: '/offense' },
      {
        title: offenseName,
        link: offenseId ? `/single-offense/${offenseId}` : '/offense',
      },
    ],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: 'Sub Category Name', value: 'subCategoryName' },
      { title: 'No of cases assigned', value: 'case_assigned' },
      { title: 'Actions', value: 'action' },
    ],
    [],
  );

  const filteredTableData = useMemo(() => {
    if (!search.trim()) return subCategories;

    const q = search.trim().toLowerCase();
    return subCategories.filter(
      (row) =>
        row.subCategoryId?.toLowerCase().includes(q) ||
        row.subCategoryName?.toLowerCase().includes(q) ||
        String(row.case_assigned).toLowerCase().includes(q),
    );
  }, [search, subCategories]);

  if (error) {
    return (
      <div className="offense_wrapper">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {addSubCategory && (
        <AddSubCategoryModal
          setAddSubCategory={setAddSubCategory}
          offenseId={offenseId}
          onSuccess={handleSubCategoryAdded}
        />
      )}
      <div className="offense_wrapper">
        {loading ? (
          <div className="table1-no-data-container">
            <p>Loading sub-categories...</p>
          </div>
        ) : (
          <CommonTable
            tableData={filteredTableData}
            headers={tableHeaders}
            specificReturn="subCategoryId"
            handleActionClick={(action, subCategoryId) => {
              if (action === 'edit') {
                console.log('edit sub-category', subCategoryId);
              }
              if (action === 'delete') {
                console.log('delete sub-category', subCategoryId);
              }
            }}
            actionButtons={[
              { label: 'Edit', action: 'edit' },
              { label: 'Delete', action: 'delete' },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default SingleOffense;
