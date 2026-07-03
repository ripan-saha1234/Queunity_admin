import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSchool, listSchools } from "../../../api/school";
import CommonTable from "../../../components/common-table";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import "./all-schools.css";

const PAGE_SIZE = 10;

function formatPrincipalPhone(principal) {
  if (!principal) return "-";
  const parts = [principal.phone_code, principal.phone].filter(Boolean);
  return parts.join(" ").trim() || "-";
}

function mapSchoolToRow(item) {
  const principal = item.principal || {};
  const principalName = [principal.first_name, principal.last_name]
    .filter(Boolean)
    .join(" ");

  return {
    schoolId: item.school_id,
    companyName: {
      name: item.school_name || "-",
      id: item.school_id ? `#${String(item.school_id).slice(0, 8)}` : "",
      image: item.school_logo_url || "/table-img1.svg",
    },
    principalName: principalName || "-",
    email: principal.email || "-",
    phone: formatPrincipalPhone(principal),
  };
}

function AllSchools() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [schools, setSchools] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteSchoolId, setDeleteSchoolId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchSchools = useCallback(async (pageNumber) => {
    setLoading(true);
    setError("");
    try {
      const response = await listSchools({
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      setSchools(response.data ?? []);
      setTotalItems(response.total ?? 0);
      setTotalPages(response.pages ?? 0);
      setPage(response.page ?? pageNumber);
    } catch (err) {
      setSchools([]);
      setTotalItems(0);
      setTotalPages(0);
      setError(err.message || "Failed to load schools");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchools(page);
  }, [page, fetchSchools]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Add",
        onClick: () => navigate("/schools/add-schools"),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "search",
        name: "searchSchool",
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
    title: "All Schools",
    breadcrumbs: [{ title: "Schools", link: "/schools" }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: "School Name", value: "companyName" },
      { title: "Principal Name", value: "principalName" },
      { title: "Email", value: "email" },
      { title: "Phone", value: "phone" },
      { title: "Actions", value: "action" },
    ],
    [],
  );

  const tableData = useMemo(() => {
    const rows = schools.map(mapSchoolToRow);
    if (!search.trim()) return rows;

    const query = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        row.companyName?.name?.toLowerCase().includes(query) ||
        row.principalName.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.phone.toLowerCase().includes(query) ||
        String(row.schoolId).toLowerCase().includes(query),
    );
  }, [schools, search]);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const deleteSchoolName = useMemo(() => {
    const row = tableData.find((item) => item.schoolId === deleteSchoolId);
    return row?.companyName?.name;
  }, [tableData, deleteSchoolId]);

  const handleDeleteConfirm = async () => {
    const id = deleteSchoolId;
    if (!id || deleting) return;

    setDeleting(true);
    try {
      const response = await deleteSchool(id);
      showToast(response?.message || "School deleted successfully", "success");
      setDeleteSchoolId("");

      if (schools.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchSchools(page);
      }
    } catch (err) {
      showToast(err?.message || "Failed to delete school", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="all-schools-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-schools-page">
      {loading && schools.length === 0 ? (
        <div className="table1-no-data-container">
          <p>Loading schools...</p>
        </div>
      ) : (
        <CommonTable
          tableData={tableData}
          headers={tableHeaders}
          index={0}
          specificReturn="schoolId"
          handleActionClick={(action, id) => {
            if (action === "view") {
              navigate(`/schools/details/${id}`);
            }
            if (action === "edit") {
              navigate(`/schools/edit-schools`);
            }
            if (action === "delete") {
              setDeleteSchoolId(id);
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

      {deleteSchoolId ? (
        <ConfirmDeleteModal
          title="Delete school"
          name={deleteSchoolName}
          onClose={() => {
            if (!deleting) setDeleteSchoolId("");
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </div>
  );
}

export default AllSchools;
