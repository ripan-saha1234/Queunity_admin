import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common-table";
import CommonLoader from "../../../components/common-loader";
import usePageHeader from "../../../hooks/use-page-header";
import AddStaffModal from "../../../Modals/StaffModals/AddStaffModal";
import EditStaffModal from "../../../Modals/StaffModals/EditStaffModal";
import ViewStaffModal from "../../../Modals/StaffModals/ViewStaffModal";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import { useToast } from "../../../components/toast/ToastProvider";
import {
  deleteStaff,
  getStaffDetails,
  listStaffs,
  mapStaffToRow,
} from "../../../api/staff";
import "./all-staffs.css";

const PAGE_SIZE = 10;
const RELOAD_DELAY_MS = 600;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function AllStaffs() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [editStaffId, setEditStaffId] = useState("");
  const [viewStaffId, setViewStaffId] = useState("");
  const [viewStaff, setViewStaff] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [deleteStaffId, setDeleteStaffId] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isDeletingRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const pageRef = useRef(page);

  pageRef.current = page;

  const applyListResponse = useCallback((response, pageNumber) => {
    setStaffList(response.data ?? []);
    setTotalItems(response.total ?? 0);
    setTotalPages(response.pages ?? 0);
    setPage(response.page ?? pageNumber);
  }, []);

  const loadStaffs = useCallback(
    async (pageNumber, { silent = false } = {}) => {
      if (!silent) {
        setLoading(true);
        setError("");
      }
      try {
        const response = await listStaffs({
          page: pageNumber,
          pageSize: PAGE_SIZE,
        });
        applyListResponse(response, pageNumber);
        return response.data ?? [];
      } catch (err) {
        if (!silent) {
          setStaffList([]);
          setTotalItems(0);
          setTotalPages(0);
          setError(err.message || "Failed to load staff");
        } else {
          throw err;
        }
      } finally {
        if (!silent) setLoading(false);
      }
      return [];
    },
    [applyListResponse],
  );

  useEffect(() => {
    if (isDeletingRef.current || isRefreshingRef.current) return;

    let cancelled = false;

    const run = async () => {
      try {
        await loadStaffs(page);
      } catch {
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadStaffs]);

  useEffect(() => {
    if (!viewStaffId || editStaffId) {
      setViewStaff(null);
      setViewLoading(false);
      return;
    }

    let cancelled = false;

    const loadView = async () => {
      setViewLoading(true);
      try {
        const listItem = staffList.find(
          (item) => (item.staff_id || item.staffId) === viewStaffId,
        );
        const staff = await getStaffDetails(viewStaffId, {
          roleNameFallback: listItem?.role_name,
        });
        if (!cancelled) {
          setViewStaff(staff);
        }
      } catch (err) {
        if (!cancelled) {
          showToast(err?.message || "Failed to load staff details", "error");
          setViewStaffId("");
          setViewStaff(null);
        }
      } finally {
        if (!cancelled) setViewLoading(false);
      }
    };

    loadView();

    return () => {
      cancelled = true;
    };
  }, [viewStaffId, editStaffId, staffList, showToast]);

  const refreshStaffs = useCallback(
    async (pageNumber, { retry = false } = {}) => {
      isRefreshingRef.current = true;
      setRefreshing(true);
      setPage(pageNumber);

      try {
        await delay(RELOAD_DELAY_MS);
        await loadStaffs(pageNumber, { silent: true });

        if (retry) {
          await delay(400);
          await loadStaffs(pageNumber, { silent: true });
        }
      } catch (err) {
        showToast(err?.message || "Failed to refresh staff", "error");
      } finally {
        isRefreshingRef.current = false;
        setRefreshing(false);
      }
    },
    [loadStaffs, showToast],
  );

  const handleStaffAdded = useCallback(async () => {
    await refreshStaffs(1, { retry: true });
  }, [refreshStaffs]);

  const handleStaffUpdated = useCallback(async () => {
    await refreshStaffs(page, { retry: true });
  }, [refreshStaffs, page]);

  const tableData = useMemo(() => {
    const rows = staffList.map(mapStaffToRow);
    if (!search.trim()) return rows;

    const query = search.trim().toLowerCase();
    return rows.filter((item) => {
      const staffName = item.companyName?.name?.toLowerCase() || "";
      const role = item.role?.toLowerCase() || "";
      const email = item.email?.toLowerCase() || "";
      const phone = item.phone?.toLowerCase() || "";
      return (
        staffName.includes(query) ||
        role.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        String(item.staffId).toLowerCase().includes(query)
      );
    });
  }, [search, staffList]);

  const editStaff = useMemo(
    () => tableData.find((item) => item.staffId === editStaffId) || null,
    [tableData, editStaffId],
  );

  const deleteStaffName = useMemo(() => {
    const row = tableData.find((item) => item.staffId === deleteStaffId);
    return row?.companyName?.name;
  }, [tableData, deleteStaffId]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Roles",
        onClick: () => navigate("/roles"),
        backgroundColor: "#FFFFFF",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "button",
        text: "Add Staff",
        onClick: () => setAddStaffOpen(true),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "search",
        name: "searchStaff",
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
    [search, navigate],
  );

  usePageHeader({
    title: "Staffs",
    breadcrumbs: [{ title: "Staffs", link: "/staffs" }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: "Staff Name", value: "companyName" },
      { title: "Role", value: "role" },
      { title: "Email", value: "email" },
      { title: "Phone", value: "phone" },
      { title: "Actions", value: "action" },
    ],
    [],
  );

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const handleDeleteConfirm = async () => {
    const id = deleteStaffId;
    if (!id || deleting) return;

    setDeleting(true);
    isDeletingRef.current = true;

    try {
      const response = await deleteStaff(id);
      showToast(response?.message || "Staff deleted successfully", "success");
      setDeleteStaffId("");
      setViewStaffId((v) => (v === id ? "" : v));
      setEditStaffId((e) => (e === id ? "" : e));

      const currentPage = pageRef.current;
      const nextPage =
        staffList.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      await refreshStaffs(nextPage, { retry: true });
    } catch (err) {
      showToast(err?.message || "Failed to delete staff", "error");
    } finally {
      isDeletingRef.current = false;
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="all-staffs-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {addStaffOpen ? (
        <AddStaffModal
          onClose={() => setAddStaffOpen(false)}
          onSuccess={handleStaffAdded}
        />
      ) : null}

      {editStaffId && editStaff ? (
        <EditStaffModal
          initialData={editStaff}
          onClose={() => setEditStaffId("")}
          onSuccess={handleStaffUpdated}
        />
      ) : null}

      {viewStaffId && !editStaffId ? (
        viewLoading || !viewStaff ? (
          <div className="modal_wrapper" role="presentation">
            <div className="modal_body view-staff-modal">
              <CommonLoader text="Loading staff..." size={16} />
            </div>
          </div>
        ) : (
          <ViewStaffModal
            staff={viewStaff}
            onClose={() => {
              setViewStaffId("");
              setViewStaff(null);
            }}
            onEditStaff={() => {
              const id = viewStaffId;
              setViewStaffId("");
              setViewStaff(null);
              setEditStaffId(id);
            }}
          />
        )
      ) : null}

      <div className="all-staffs-page all-staffs-page--relative">
        {loading && staffList.length === 0 ? (
          <div className="table1-no-data-container table-loader-container">
            <CommonLoader text="Loading staff..." />
          </div>
        ) : refreshing ? (
          <div className="table1-no-data-container table-loader-container">
            <CommonLoader text="Refreshing staff..." />
          </div>
        ) : (
          <CommonTable
            key={`staff-table-${page}-${totalItems}-${staffList.length}`}
            tableData={tableData}
            headers={tableHeaders}
            specificReturn="staffId"
            handleActionClick={(action, id) => {
              if (action === "view") {
                setEditStaffId("");
                setViewStaffId(id);
              }
              if (action === "edit") {
                setViewStaffId("");
                setViewStaff(null);
                setEditStaffId(id);
              }
              if (action === "delete") {
                setDeleteStaffId(id);
              }
            }}
            pagination={{
              currentPage: page,
              totalPages,
              totalItems,
              pageSize: PAGE_SIZE,
              onPageChange: handlePageChange,
            }}
          />
        )}
      </div>

      {deleteStaffId ? (
        <ConfirmDeleteModal
          title="Delete staff"
          name={deleteStaffName}
          onClose={() => {
            if (!deleting) setDeleteStaffId("");
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
}

export default AllStaffs;
