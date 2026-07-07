import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCase, getAllCasesPagination } from "../../../api/cases";
import usePageHeader from "../../../hooks/use-page-header";
import CommonTable from "../../../components/common-table";
import { useToast } from "../../../components/toast/ToastProvider";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import { formatCreatedAt } from "../../../utils/caseDisplay";
import "./all-cases.css";

const PAGE_SIZE = 10;
const RELOAD_DELAY_MS = 600;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapCaseToRow(item) {
  const { date, time } = formatCreatedAt(item.created_at);

  return {
    caseId: item.case_id,
    offense: item.offence_category?.trim() || "-",
    date,
    time,
    status: item.status || "-",
  };
}

function AllCases() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [cases, setCases] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteCaseId, setDeleteCaseId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const skipPageLoadRef = useRef(false);

  const loadCases = useCallback(async (pageNumber, { silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
      setError("");
    }
    try {
      const response = await getAllCasesPagination({
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      setCases(response.data ?? []);
      setTotalItems(response.total ?? 0);
      setTotalPages(response.pages ?? 0);
      setPage(response.page ?? pageNumber);
    } catch (err) {
      if (!silent) {
        setCases([]);
        setTotalItems(0);
        setTotalPages(0);
        setError(err.message || "Failed to load cases");
      } else {
        throw err;
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!location.state?.refreshCases) return;

    skipPageLoadRef.current = true;
    let cancelled = false;

    const run = async () => {
      setRefreshing(true);
      setPage(1);
      try {
        await delay(RELOAD_DELAY_MS);
        await loadCases(1, { silent: true });
      } catch (err) {
        if (!cancelled) {
          showToast(err?.message || "Failed to refresh cases", "error");
        }
      } finally {
        if (!cancelled) {
          setRefreshing(false);
          skipPageLoadRef.current = false;
          navigate("/cases", { replace: true, state: {} });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [location.state?.refreshCases, loadCases, navigate, showToast]);

  useEffect(() => {
    if (skipPageLoadRef.current) return;

    let cancelled = false;

    const run = async () => {
      try {
        await loadCases(page);
      } finally {
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadCases]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Add Case",
        onClick: () => navigate("/cases/add-cases"),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "search",
        name: "searchCase",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        inputType: "text",
      },
      {
        type: "icon",
        img: "/filter_icon.svg",
        onClick: () => {},
      },
    ],
    [navigate, search],
  );

  usePageHeader({
    title: "Cases",
    breadcrumbs: [{ title: "Cases", link: "/cases" }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: "Cases ID", value: "caseId" },
      { title: "Offense", value: "offense" },
      { title: "Date", value: "date" },
      { title: "Time", value: "time" },
      { title: "Status", value: "status" },
      { title: "Actions", value: "action" },
    ],
    [],
  );

  const tableData = useMemo(() => {
    const rows = cases.map(mapCaseToRow);
    if (!search.trim()) return rows;

    const query = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        row.caseId.toLowerCase().includes(query) ||
        row.offense.toLowerCase().includes(query),
    );
  }, [cases, search]);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const deleteCaseLabel = useMemo(() => {
    const row = tableData.find((item) => item.caseId === deleteCaseId);
    return row?.caseId;
  }, [tableData, deleteCaseId]);

  const handleDeleteConfirm = async () => {
    const id = deleteCaseId;
    if (!id || deleting) return;

    setDeleting(true);
    try {
      await deleteCase(id);
      showToast("Case deleted successfully", "success");
      setDeleteCaseId("");

      const nextPage = cases.length === 1 && page > 1 ? page - 1 : page;
      setRefreshing(true);
      await delay(RELOAD_DELAY_MS);
      await loadCases(nextPage, { silent: true });
    } catch (err) {
      showToast(err?.message || "Failed to delete case", "error");
    } finally {
      setRefreshing(false);
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="all-cases-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-cases-page">
      {loading && cases.length === 0 ? (
        <div className="table1-no-data-container">
          <p>Loading cases...</p>
        </div>
      ) : refreshing ? (
        <div className="table1-no-data-container">
          <p>Refreshing cases...</p>
        </div>
      ) : (
        <CommonTable
          key={`cases-table-${page}-${totalItems}-${cases.length}`}
          tableData={tableData}
          headers={tableHeaders}
          specificReturn="caseId"
          handleActionClick={(action, id) => {
            if (action === "view") {
              navigate(`/cases/case-submitted/${id}`);
            }
            if (action === "edit") {
              navigate(`/cases/edit-cases/${id}`);
            }
            if (action === "delete") {
              setDeleteCaseId(id);
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
            { label: "Edit", action: "edit" },
            { label: "View", action: "view" },
            { label: "Delete", action: "delete" },
          ]}
        />
      )}

      {deleteCaseId ? (
        <ConfirmDeleteModal
          title="Delete case"
          name={deleteCaseLabel}
          onClose={() => {
            if (!deleting) setDeleteCaseId("");
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </div>
  );
}

export default AllCases;
