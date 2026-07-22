import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import usePageHeader from "../../../hooks/use-page-header";
import CommonTable from "../../../components/common-table";
import CommonLoader from "../../../components/common-loader";
import AddRoleModal from "../../../Modals/StaffModals/AddRoleModal";
import EditRoleModal from "../../../Modals/StaffModals/EditRoleModal";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import { useToast } from "../../../components/toast/ToastProvider";
import { deleteRole, listRoles, mapRoleToRow } from "../../../api/roles";
import "./roles.css";

const PAGE_SIZE = 10;
const RELOAD_DELAY_MS = 200;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RolesPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [deleteRoleId, setDeleteRoleId] = useState("");
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
    setRoles(response.data ?? []);
    setTotalItems(response.total ?? 0);
    setTotalPages(response.pages ?? 0);
    setPage(response.page ?? pageNumber);
  }, []);

  const loadRoles = useCallback(
    async (pageNumber, { silent = false } = {}) => {
      if (!silent) {
        setLoading(true);
        setError("");
      }
      try {
        const response = await listRoles({
          page: pageNumber,
          pageSize: PAGE_SIZE,
        });
        applyListResponse(response, pageNumber);
        return response.data ?? [];
      } catch (err) {
        if (!silent) {
          setRoles([]);
          setTotalItems(0);
          setTotalPages(0);
          setError(err.message || "Failed to load roles");
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
        await loadRoles(page);
      } catch {
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadRoles]);

  const refreshRoles = useCallback(
    async (pageNumber) => {
      isRefreshingRef.current = true;
      setRefreshing(true);
      setPage(pageNumber);

      try {
        await delay(RELOAD_DELAY_MS);
        await loadRoles(pageNumber, { silent: true });
      } catch (err) {
        showToast(err?.message || "Failed to refresh roles", "error");
      } finally {
        isRefreshingRef.current = false;
        setRefreshing(false);
      }
    },
    [loadRoles, showToast],
  );

  const handleRoleAdded = useCallback(async () => {
    await refreshRoles(1);
  }, [refreshRoles]);

  const handleRoleUpdated = useCallback(async () => {
    await refreshRoles(page);
  }, [refreshRoles, page]);

  const tableData = useMemo(() => {
    const rows = roles.map(mapRoleToRow);
    if (!search.trim()) return rows;

    const query = search.trim().toLowerCase();
    return rows.filter(
      (item) =>
        item.role.toLowerCase().includes(query) ||
        item.permissions.toLowerCase().includes(query) ||
        String(item.roleId).toLowerCase().includes(query),
    );
  }, [roles, search]);

  const editRole = useMemo(
    () => tableData.find((item) => item.roleId === editRoleId) || null,
    [tableData, editRoleId],
  );

  const deleteRoleName = useMemo(() => {
    const row = tableData.find((item) => item.roleId === deleteRoleId);
    return row?.role;
  }, [tableData, deleteRoleId]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Add Role",
        onClick: () => setAddOpen(true),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "search",
        name: "searchRole",
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
    [search],
  );

  usePageHeader({
    title: "Roles",
    breadcrumbs: [{ title: "Roles", link: "/roles" }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: "Role", value: "role" },
      { title: "Permissions", value: "permissions" },
      { title: "Actions", value: "action" },
    ],
    [],
  );

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const handleDeleteConfirm = async () => {
    const id = deleteRoleId;
    if (!id || deleting) return;

    setDeleting(true);
    isDeletingRef.current = true;

    try {
      const response = await deleteRole(id);
      showToast(response?.message || "Role deleted successfully", "success");
      setDeleteRoleId("");

      const currentPage = pageRef.current;
      const nextPage =
        roles.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      setRefreshing(true);
      setRoles((prev) => prev.filter((item) => item.role_id !== id));
      setTotalItems((prev) => Math.max(0, prev - 1));

      await delay(RELOAD_DELAY_MS);

      let rows = await loadRoles(nextPage, { silent: true });
      if (rows.some((item) => item.role_id === id)) {
        await delay(400);
        rows = await loadRoles(nextPage, { silent: true });
      }

      if (rows.some((item) => item.role_id === id)) {
        setRoles((prev) => prev.filter((item) => item.role_id !== id));
      }
    } catch (err) {
      showToast(err?.message || "Failed to delete role", "error");
    } finally {
      isDeletingRef.current = false;
      setRefreshing(false);
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="roles-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {addOpen ? (
        <AddRoleModal
          onClose={() => setAddOpen(false)}
          onSuccess={handleRoleAdded}
        />
      ) : null}

      {editRoleId && editRole ? (
        <EditRoleModal
          initialRole={editRole}
          onClose={() => setEditRoleId("")}
          onSuccess={handleRoleUpdated}
        />
      ) : null}

      <div className="roles-page roles-page--relative">
        {loading && roles.length === 0 ? (
          <div className="table1-no-data-container table-loader-container">
            <CommonLoader text="Loading roles..." />
          </div>
        ) : (
          <div className="roles-table-wrap">
            {refreshing ? (
              <div className="roles-table-overlay">
                <CommonLoader text="Refreshing roles..." size={16} />
              </div>
            ) : null}
            <CommonTable
              key={`roles-table-${page}-${totalItems}-${roles.length}`}
              tableData={tableData}
              headers={tableHeaders}
              specificReturn="roleId"
              actionButtons={[
                { label: "Edit", action: "edit" },
                { label: "Delete", action: "delete" },
              ]}
              handleActionClick={(action, id) => {
                if (action === "edit") setEditRoleId(id);
                if (action === "delete") setDeleteRoleId(id);
              }}
              pagination={{
                currentPage: page,
                totalPages,
                totalItems,
                pageSize: PAGE_SIZE,
                onPageChange: handlePageChange,
              }}
            />
          </div>
        )}
      </div>

      {deleteRoleId ? (
        <ConfirmDeleteModal
          title="Delete role"
          name={deleteRoleName}
          onClose={() => {
            if (!deleting) setDeleteRoleId("");
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
}

export default RolesPage;
