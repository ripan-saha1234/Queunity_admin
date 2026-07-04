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
  const [editOffenseId, setEditOffenseId] = useState('');
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
  const isRefreshingRef = useRef(false);
  const pageRef = useRef(page);

  pageRef.current = page;

  const applyListResponse = useCallback((response, pageNumber) => {
    setOffenses(response.data ?? []);
    setTotalItems(response.total ?? 0);
    setTotalPages(response.pages ?? 0);
    setPage(response.page ?? pageNumber);
  }, []);

  const loadOffences = useCallback(
    async (pageNumber, { silent = false } = {}) => {
      if (!silent) {
        setLoading(true);
        setError('');
      }
      try {
        const response = await listOffences({
          page: pageNumber,
          pageSize: PAGE_SIZE,
        });
        applyListResponse(response, pageNumber);
        return response.data ?? [];
      } catch (err) {
        if (!silent) {
          setOffenses([]);
          setTotalItems(0);
          setTotalPages(0);
          setError(err.message || 'Failed to load offenses');
        } else {
          throw err;
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [applyListResponse],
  );

  useEffect(() => {
    if (isDeletingRef.current || isRefreshingRef.current) return;

    let cancelled = false;

    const run = async () => {
      try {
        await loadOffences(page);
      } catch {
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadOffences]);

  const refreshOffences = useCallback(
    async (pageNumber) => {
      isRefreshingRef.current = true;
      setRefreshing(true);
      setPage(pageNumber);

      try {
        await delay(RELOAD_DELAY_MS);
        await loadOffences(pageNumber, { silent: true });
      } catch (err) {
        showToast(err?.message || 'Failed to refresh offenses', 'error');
      } finally {
        isRefreshingRef.current = false;
        setRefreshing(false);
      }
    },
    [loadOffences, showToast],
  );

  const handleOffenseUpdated = useCallback(async () => {
    await refreshOffences(page);
  }, [refreshOffences, page]);

  const editOffenseMeta = useMemo(() => {
    const item = offenses.find((row) => row.offense_id === editOffenseId);
    if (!item) return null;

    return {
      offenseName: item.offense_name || '',
      case_assigned_count: item.case_assigned_count ?? 0,
      system_info: item.system_info ?? '',
      created_at: item.created_at,
      isactive: item.isactive ?? true,
    };
  }, [offenses, editOffenseId]);

  const handleOffenseAdded = useCallback(async () => {
    await refreshOffences(1);
  }, [refreshOffences]);

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

      let rows = await loadOffences(nextPage, { silent: true });
      if (rows.some((item) => item.offense_id === id)) {
        await delay(400);
        rows = await loadOffences(nextPage, { silent: true });
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
      {editOffenseId && editOffenseMeta ? (
        <EditOffenceModal
          offenseId={editOffenseId}
          offenseMeta={editOffenseMeta}
          onClose={() => setEditOffenseId('')}
          onSuccess={handleOffenseUpdated}
        />
      ) : null}
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
                  setEditOffenseId(id);
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
