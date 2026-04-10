import { useMemo, useState } from "react";
import usePageHeader from "../../../hooks/use-page-header";
import CommonTable from "../../../components/common-table";
import AddRoleModal from "../../../Modals/StaffModals/AddRoleModal";
import EditRoleModal from "../../../Modals/StaffModals/EditRoleModal";
import ConfirmDeleteModal from "../../../Modals/StaffModals/ConfirmDeleteModal";
import "./roles.css";

const toPermissionsText = (rows = []) => {
  const modules = rows.map((r) => r.module).filter(Boolean);
  return modules.join(" | ");
};

const INITIAL_ROLES = [
  {
    roleId: "RL1",
    role: "Role 1",
    permissionRows: [{ module: "Schools", add: true, edit: false, view: true, delete: false }],
  },
  {
    roleId: "RL2",
    role: "Role 2",
    permissionRows: [{ module: "Schools", add: true, edit: false, view: true, delete: false }],
  },
  {
    roleId: "RL3",
    role: "Role 3",
    permissionRows: [{ module: "Schools", add: true, edit: false, view: true, delete: false }],
  },
  {
    roleId: "RL4",
    role: "Role 4",
    permissionRows: [{ module: "Schools", add: true, edit: false, view: true, delete: false }],
  },
].map((item) => ({ ...item, permissions: toPermissionsText(item.permissionRows) + " | CMS | Offense" }));

function RolesPage() {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [addOpen, setAddOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [deleteRoleId, setDeleteRoleId] = useState("");

  const filteredRoles = useMemo(() => {
    if (!search.trim()) return roles;
    const query = search.trim().toLowerCase();
    return roles.filter(
      (item) =>
        item.role.toLowerCase().includes(query) || item.permissions.toLowerCase().includes(query),
    );
  }, [roles, search]);

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

  return (
    <div className="roles-page">
      <CommonTable
        tableData={filteredRoles}
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
      />

      {addOpen ? (
        <AddRoleModal
          onClose={() => setAddOpen(false)}
          onAdd={(payload) => {
            const nextId = `RL${Date.now()}`;
            const roleName = payload.roleName;
            const permissions = toPermissionsText(payload.permissionRows);
            setRoles((prev) => [
              ...prev,
              { roleId: nextId, role: roleName, permissions, permissionRows: payload.permissionRows },
            ]);
          }}
        />
      ) : null}

      {editRoleId ? (
        <EditRoleModal
          initialRole={roles.find((item) => item.roleId === editRoleId)}
          onClose={() => setEditRoleId("")}
          onSave={(payload) => {
            const permissions = toPermissionsText(payload.permissionRows);
            setRoles((prev) =>
              prev.map((item) =>
                item.roleId === editRoleId
                  ? { ...item, role: payload.roleName, permissionRows: payload.permissionRows, permissions }
                  : item,
              ),
            );
          }}
        />
      ) : null}

      {deleteRoleId ? (
        <ConfirmDeleteModal
          title="Delete role"
          name={roles.find((item) => item.roleId === deleteRoleId)?.role}
          onClose={() => setDeleteRoleId("")}
          onConfirm={() => {
            setRoles((prev) => prev.filter((item) => item.roleId !== deleteRoleId));
          }}
        />
      ) : null}
    </div>
  );
}

export default RolesPage;
