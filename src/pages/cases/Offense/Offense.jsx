import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offense.css';
import CommonTable from '../../../components/common-table';
import AddOffenceModal from '../../../Modals/CaseModals/AddOffenceModal';
import EditOffenceModal from '../../../Modals/CaseModals/EditOffenceModal';
import usePageHeader from '../../../hooks/use-page-header.jsx';
import { useToast } from '../../../components/toast/ToastProvider';
import ConfirmDeleteModal from '../../../Modals/StaffModals/ConfirmDeleteModal';
import { deleteOffence, listOffences, mapOffenceToRow } from '../../../api/offence';

const PAGE_SIZE = 10;
const RELOAD_DELAY_MS = 200;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Offense = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [addOffense, setaddOffense] = useState(false);
  const [editOffense, seteditOffense] = useState(false);
  const [page, setPage] = useState(1);
  const [offenses, setOffenses] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteOffenseId, setDeleteOffenseId] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isDeletingRef = useRef(false);
  const pageRef = useRef(page);

  pageRef.current = page;

  const applyListResponse = useCallback((response, pageNumber) => {
    setOffenses(response.data ?? []);
    setTotalItems(response.total ?? 0);
    setTotalPages(response.pages ?? 0);
    setPage(response.page ?? pageNumber);
  }, []);

  const loadOffences = useCallback(
    async (pageNumber) => {
      const response = await listOffences({
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      applyListResponse(response, pageNumber);
      return response.data ?? [];
    },
    [applyListResponse],
  );

  useEffect(() => {
    if (isDeletingRef.current) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError('');
      try {
        await loadOffences(page);
      } catch (err) {
        if (!cancelled) {
          setOffenses([]);
          setTotalItems(0);
          setTotalPages(0);
          setError(err.message || 'Failed to load offenses');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadOffences]);

  const handleOffenseAdded = useCallback(async () => {
    setPage(1);
    setRefreshing(true);
    try {
      await loadOffences(1);
    } catch (err) {
      showToast(err?.message || 'Failed to refresh offenses', 'error');
    } finally {
      setRefreshing(false);
    }
  }, [loadOffences, showToast]);

  const headerButtons = useMemo(
    () => [
      {
        type: 'button',
        text: 'Add Offense',
        onClick: () => setaddOffense(true),
        backgroundColor: '#95C63D',
        textColor: '#141414',
        borderColor: '#9FC53D',
      },
      {
        type: 'search',
        name: 'searchCase',
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
    [search],
  );

  usePageHeader({
    title: 'Offence',
    breadcrumbs: [{ title: 'Offense', link: '/offense' }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: 'Offense Name', value: 'offenseName' },
      { title: 'No of cases assigned', value: 'case_assigned' },
      { title: 'Actions', value: 'action' },
    ],
    [],
  );

  const tableData = useMemo(() => {
    const rows = offenses.map(mapOffenceToRow);
    if (!search.trim()) return rows;

    const q = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        row.offenseName?.toLowerCase().includes(q) ||
        String(row.case_assigned).toLowerCase().includes(q) ||
        String(row.offenseId).toLowerCase().includes(q),
    );
  }, [offenses, search]);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const deleteOffenseName = useMemo(() => {
    const row = tableData.find((item) => item.offenseId === deleteOffenseId);
    return row?.offenseName;
  }, [tableData, deleteOffenseId]);

  const handleDeleteConfirm = async () => {
    const id = deleteOffenseId;
    if (!id || deleting) return;

    setDeleting(true);
    isDeletingRef.current = true;

    try {
      const response = await deleteOffence(id);
      showToast(response?.message || 'Offense deleted successfully', 'success');
      setDeleteOffenseId('');

      const currentPage = pageRef.current;
      const nextPage =
        offenses.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      setRefreshing(true);
      setOffenses((prev) => prev.filter((item) => item.offense_id !== id));
      setTotalItems((prev) => Math.max(0, prev - 1));

      await delay(RELOAD_DELAY_MS);

      let rows = await loadOffences(nextPage);
      if (rows.some((item) => item.offense_id === id)) {
        await delay(400);
        rows = await loadOffences(nextPage);
      }

      if (rows.some((item) => item.offense_id === id)) {
        setOffenses((prev) => prev.filter((item) => item.offense_id !== id));
      }
    } catch (err) {
      showToast(err?.message || 'Failed to delete offense', 'error');
    } finally {
      isDeletingRef.current = false;
      setRefreshing(false);
      setDeleting(false);
    }
  };

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
      {addOffense && (
        <AddOffenceModal
          setaddOffense={setaddOffense}
          onSuccess={handleOffenseAdded}
        />
      )}
      {editOffense && <EditOffenceModal seteditOffence={seteditOffense} />}
      <div className="offense_wrapper offense_wrapper--relative">
        {loading && offenses.length === 0 ? (
          <div className="table1-no-data-container">
            <p>Loading offenses...</p>
          </div>
        ) : (
          <div className="offense-table-wrap">
            {refreshing ? (
              <div className="offense-table-overlay">
                <p>Refreshing offenses...</p>
              </div>
            ) : null}
            <CommonTable
              key={`offense-table-${page}-${totalItems}-${offenses.length}`}
              tableData={tableData}
              headers={tableHeaders}
              specificReturn="offenseId"
              handleActionClick={(action, id) => {
                if (action === 'view') {
                  navigate(`/single-offense/${id}`);
                }
                if (action === 'edit') {
                  seteditOffense(true);
                }
                if (action === 'delete') {
                  setDeleteOffenseId(id);
                }
              }}
              pagination={{
                currentPage: page,
                totalPages,
                totalItems,
                pageSize: PAGE_SIZE,
                onPageChange: handlePageChange,
              }}
              actionButtons={[
                { label: 'Edit', action: 'edit' },
                { label: 'View', action: 'view' },
                { label: 'Delete', action: 'delete' },
              ]}
            />
          </div>
        )}
      </div>

      {deleteOffenseId ? (
        <ConfirmDeleteModal
          title="Delete offense"
          name={deleteOffenseName}
          onClose={() => {
            if (!deleting) setDeleteOffenseId('');
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
};

export default Offense;
