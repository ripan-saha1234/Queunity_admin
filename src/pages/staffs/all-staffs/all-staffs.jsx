import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common-table";
import usePageHeader from "../../../hooks/use-page-header";
import AddStaffModal from "../../../Modals/StaffModals/AddStaffModal";
import EditStaffModal from "../../../Modals/StaffModals/EditStaffModal";
import ViewStaffModal from "../../../Modals/StaffModals/ViewStaffModal";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import "./all-staffs.css";

const ROLE_LABELS = {
  role1: "Role 1",
  role2: "Role 2",
  role3: "Role 3",
};

const INITIAL_STAFF = [
  {
    staffId: "ST456666",
    companyName: { name: "Somali Goswami", id: "#ST456666" },
    role: "Role 1",
    email: "bidishabhhowmick@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456667",
    companyName: { name: "Raunak Bhowmick", id: "#ST456666" },
    role: "Role 2",
    email: "somaligoswami@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456668",
    companyName: { name: "Somali Goswami", id: "#ST456666" },
    role: "Role 3",
    email: "bidishabhhowmick@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456669",
    companyName: { name: "Raunak Bhowmick", id: "#ST456666" },
    role: "Role 2",
    email: "somaligoswami@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456670",
    companyName: { name: "Somali Goswami", id: "#ST456666" },
    role: "Role 3",
    email: "bidishabhhowmick@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456671",
    companyName: { name: "Raunak Bhowmick", id: "#ST456666" },
    role: "Role 2",
    email: "somaligoswami@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456672",
    companyName: { name: "Somali Goswami", id: "#ST456666" },
    role: "Role 3",
    email: "bidishabhhowmick@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456673",
    companyName: { name: "Raunak Bhowmick", id: "#ST456666" },
    role: "Role 2",
    email: "somaligoswami@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456674",
    companyName: { name: "Somali Goswami", id: "#ST456666" },
    role: "Role 3",
    email: "bidishabhhowmick@gmail.com",
    phone: "+1 1234567890",
  },
  {
    staffId: "ST456675",
    companyName: { name: "Raunak Bhowmick", id: "#ST456666" },
    role: "Role 2",
    email: "somaligoswami@gmail.com",
    phone: "+1 1234567890",
  },
];

function AllStaffs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [editStaffId, setEditStaffId] = useState("");
  const [viewStaffId, setViewStaffId] = useState("");
  const [deleteStaffId, setDeleteStaffId] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return staffList;
    const query = search.trim().toLowerCase();
    return staffList.filter((item) => {
      const staffName = item.companyName?.name?.toLowerCase() || "";
      const role = item.role?.toLowerCase() || "";
      const email = item.email?.toLowerCase() || "";
      const phone = item.phone?.toLowerCase() || "";
      return (
        staffName.includes(query) ||
        role.includes(query) ||
        email.includes(query) ||
        phone.includes(query)
      );
    });
  }, [search, staffList]);

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

  return (
    <div className="all-staffs-page">
      <CommonTable
        tableData={filteredData}
        headers={tableHeaders}
        specificReturn="staffId"
        handleActionClick={(action, id) => {
          if (action === "view") {
            setEditStaffId("");
            setViewStaffId(id);
          }
          if (action === "edit") {
            setViewStaffId("");
            setEditStaffId(id);
          }
          if (action === "delete") {
            setDeleteStaffId(id);
          }
        }}
      />
      {viewStaffId && !editStaffId ? (
        <ViewStaffModal
          staff={staffList.find((item) => item.staffId === viewStaffId)}
          onClose={() => setViewStaffId("")}
          onEditStaff={() => {
            const id = viewStaffId;
            setViewStaffId("");
            setEditStaffId(id);
          }}
        />
      ) : null}
      {addStaffOpen ? (
        <AddStaffModal
          onClose={() => setAddStaffOpen(false)}
          onAdd={(payload) => {
            const nextId = `ST${Date.now()}`;
            const roleLabel = ROLE_LABELS[payload.role] || payload.role;
            setStaffList((prev) => [
              ...prev,
              {
                staffId: nextId,
                companyName: {
                  name: `${payload.firstName} ${payload.lastName}`.trim(),
                  id: `#${nextId}`,
                },
                role: roleLabel,
                email: payload.email,
                phone: `${payload.phoneCode} ${payload.phone}`.trim(),
              },
            ]);
          }}
        />
      ) : null}
      {editStaffId ? (
        <EditStaffModal
          initialData={staffList.find((item) => item.staffId === editStaffId)}
          onClose={() => setEditStaffId("")}
          onSave={(payload) => {
            const roleLabel = ROLE_LABELS[payload.role] || payload.role;
            setStaffList((prev) =>
              prev.map((item) =>
                item.staffId !== editStaffId
                  ? item
                  : {
                      ...item,
                      companyName: {
                        ...item.companyName,
                        name: `${payload.firstName} ${payload.lastName}`.trim(),
                      },
                      role: roleLabel,
                      email: payload.email,
                      phone: `${payload.phoneCode} ${payload.phone}`.trim(),
                    },
              ),
            );
          }}
        />
      ) : null}

      {deleteStaffId ? (
        <ConfirmDeleteModal
          title="Delete staff"
          name={staffList.find((item) => item.staffId === deleteStaffId)?.companyName?.name}
          onClose={() => setDeleteStaffId("")}
          onConfirm={() => {
            const id = deleteStaffId;
            setStaffList((prev) => prev.filter((item) => item.staffId !== id));
            setViewStaffId((v) => (v === id ? "" : v));
            setEditStaffId((e) => (e === id ? "" : e));
          }}
        />
      ) : null}
    </div>
  );
}

export default AllStaffs;
