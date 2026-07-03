import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCharity, listCharities } from "../../../api/charity";
import CommonTable from "../../../components/common-table";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import "./all-charity.css";

const PAGE_SIZE = 10;
const RELOAD_DELAY_MS = 200;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatContactPhone(contact) {
  if (!contact) return "-";
  const parts = [contact.phone_code, contact.phone].filter(Boolean);
  return parts.join(" ").trim() || "-";
}

function mapCharityToRow(item) {
  const contact = item.contact_person || {};
  const contactName = [contact.first_name, contact.last_name]
    .filter(Boolean)
    .join(" ");

  return {
    charityId: item.charity_id,
    companyName: {
      name: item.charity_name || "-",
      id: item.charity_id ? `#${item.charity_id}` : "",
      image: item.charity_logo_url || "/table-img1.svg",
    },
    principalName: contactName || "-",
    email: contact.email || "-",
    phone: formatContactPhone(contact),
  };
}

function AllCharity() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [charities, setCharities] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteCharityId, setDeleteCharityId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isDeletingRef = useRef(false);
  const pageRef = useRef(page);

  pageRef.current = page;

  const applyListResponse = useCallback((response, pageNumber) => {
    setCharities(response.data ?? []);
    setTotalItems(response.total ?? 0);
    setTotalPages(response.pages ?? 0);
    setPage(response.page ?? pageNumber);
  }, []);

  const loadCharities = useCallback(async (pageNumber) => {
    const response = await listCharities({
      page: pageNumber,
      pageSize: PAGE_SIZE,
    });
    applyListResponse(response, pageNumber);
    return response.data ?? [];
  }, [applyListResponse]);

  useEffect(() => {
    if (isDeletingRef.current) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        await loadCharities(page);
      } catch (err) {
        if (!cancelled) {
          setCharities([]);
          setTotalItems(0);
          setTotalPages(0);
          setError(err.message || "Failed to load charities");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [page, loadCharities]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Add Charity",
        onClick: () => navigate("/charity/add-charity"),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "search",
        name: "searchCharity",
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
    title: "Charity",
    breadcrumbs: [{ title: "Charity", link: "/charity" }],
    buttons: headerButtons,
  });

  const tableHeaders = useMemo(
    () => [
      { title: "Charity Name", value: "companyName" },
      { title: "Contact Name", value: "principalName" },
      { title: "Email", value: "email" },
      { title: "Phone", value: "phone" },
      { title: "Actions", value: "action" },
    ],
    [],
  );

  const tableData = useMemo(() => {
    const rows = charities.map(mapCharityToRow);
    if (!search.trim()) return rows;

    const query = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        row.companyName?.name?.toLowerCase().includes(query) ||
        row.principalName.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.phone.toLowerCase().includes(query) ||
        String(row.charityId).toLowerCase().includes(query),
    );
  }, [charities, search]);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const deleteCharityName = useMemo(() => {
    const row = tableData.find((item) => item.charityId === deleteCharityId);
    return row?.companyName?.name;
  }, [tableData, deleteCharityId]);

  const handleDeleteConfirm = async () => {
    const id = deleteCharityId;
    if (!id || deleting) return;

    setDeleting(true);
    isDeletingRef.current = true;

    try {
      await deleteCharity(id);
      showToast("Charity deleted successfully", "success");
      setDeleteCharityId("");

      const currentPage = pageRef.current;
      const nextPage =
        charities.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      setRefreshing(true);
      setCharities((prev) => prev.filter((item) => item.charity_id !== id));
      setTotalItems((prev) => Math.max(0, prev - 1));

      await delay(RELOAD_DELAY_MS);

      let rows = await loadCharities(nextPage);
      if (rows.some((item) => item.charity_id === id)) {
        await delay(400);
        rows = await loadCharities(nextPage);
      }

      if (rows.some((item) => item.charity_id === id)) {
        setCharities((prev) => prev.filter((item) => item.charity_id !== id));
      }
    } catch (err) {
      showToast(err?.message || "Failed to delete charity", "error");
    } finally {
      isDeletingRef.current = false;
      setRefreshing(false);
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="all-charity-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-charity-page all-charity-page--relative">
      {loading && charities.length === 0 ? (
        <div className="table1-no-data-container">
          <p>Loading charities...</p>
        </div>
      ) : (
        <div className="all-charity-table-wrap">
          {refreshing ? (
            <div className="all-charity-table-overlay">
              <p>Refreshing charities...</p>
            </div>
          ) : null}
          <CommonTable
            key={`charity-table-${page}-${totalItems}-${charities.length}`}
            tableData={tableData}
            headers={tableHeaders}
            index={0}
            specificReturn="charityId"
            handleActionClick={(action, id) => {
              if (action === "view") navigate(`/charity/details/${id}`);
              if (action === "edit") navigate(`/charity/edit-charity/${id}`);
              if (action === "delete") setDeleteCharityId(id);
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
        </div>
      )}

      {deleteCharityId ? (
        <ConfirmDeleteModal
          title="Delete charity"
          name={deleteCharityName}
          onClose={() => {
            if (!deleting) setDeleteCharityId("");
          }}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </div>
  );
}

export default AllCharity;
