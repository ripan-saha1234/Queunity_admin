import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common-table";
import usePageHeader from "../../../hooks/use-page-header";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import "./all-charity.css";

const INITIAL_CHARITIES = [
      {
        charityId: "CH456666",
        companyName: { name: "Hope Foundation", id: "#CH456666", image: "/table-img1.svg" },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        charityId: "CH456667",
        companyName: { name: "Prism Relief Trust", id: "#CH456667", image: "/table-img2.svg" },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        charityId: "CH456668",
        companyName: { name: "Hope Foundation", id: "#CH456668", image: "/table-img1.svg" },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        charityId: "CH456669",
        companyName: { name: "Prism Relief Trust", id: "#CH456669", image: "/table-img2.svg" },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        charityId: "CH456670",
        companyName: { name: "Hope Foundation", id: "#CH456670", image: "/table-img1.svg" },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        charityId: "CH456671",
        companyName: { name: "Prism Relief Trust", id: "#CH456671", image: "/table-img2.svg" },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
];

function AllCharity() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [charityList, setCharityList] = useState(INITIAL_CHARITIES);
  const [deleteCharityId, setDeleteCharityId] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return charityList;
    const query = search.trim().toLowerCase();
    return charityList.filter((item) => {
      const charityName = item.companyName?.name?.toLowerCase() || "";
      const principalName = item.principalName?.toLowerCase() || "";
      const email = item.email?.toLowerCase() || "";
      const phone = item.phone?.toLowerCase() || "";
      return (
        charityName.includes(query) ||
        principalName.includes(query) ||
        email.includes(query) ||
        phone.includes(query)
      );
    });
  }, [search, charityList]);

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

  return (
    <div className="all-charity-page">
      <CommonTable
        tableData={filteredData}
        headers={tableHeaders}
        index={0}
        specificReturn="charityId"
        handleActionClick={(action, id) => {
          if (action === "view") navigate(`/charity/details/${id}`);
          if (action === "edit") navigate("/charity/edit-charity");
          if (action === "delete") setDeleteCharityId(id);
        }}
        actionButtons={[
          { label: "Edit", action: "edit" },
          { label: "View", action: "view" },
          { label: "Delete", action: "delete" },
        ]}
      />

      {deleteCharityId ? (
        <ConfirmDeleteModal
          title="Delete charity"
          name={charityList.find((item) => item.charityId === deleteCharityId)?.companyName?.name}
          onClose={() => setDeleteCharityId("")}
          onConfirm={() => {
            const id = deleteCharityId;
            setCharityList((prev) => prev.filter((item) => item.charityId !== id));
          }}
        />
      ) : null}
    </div>
  );
}

export default AllCharity;
