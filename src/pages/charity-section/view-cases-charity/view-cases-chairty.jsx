import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import CommonTable from "../../../components/common-table";
import "./view-cases-charity.css";

function ViewCasesChairty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");

  const headerButtons = useMemo(
    () => [
      {
        type: "search",
        name: "searchCharityCase",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        inputType: "text",
      },
      { type: "icon", img: "/filter_icon.svg", onClick: () => {} },
    ],
    [search],
  );

  usePageHeader({
    title: "View Cases",
    breadcrumbs: [
      { title: "Charity", link: "/charity" },
      { title: "Hope Foundation", link: `/charity/details/${id || "1"}` },
      { title: "View Cases", link: `/charity/details/${id || "1"}/view-cases` },
    ],
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

  const tableData = useMemo(
    () => [
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Open" },
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Closed" },
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Open" },
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Open" },
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Open" },
      { caseId: "#ST456666", offense: "Offense 1", date: "27/10/2025", time: "10:07 AM", status: "Closed" },
    ],
    [],
  );

  const filteredTableData = useMemo(() => {
    if (!search.trim()) return tableData;
    const q = search.trim().toLowerCase();
    return tableData.filter(
      (row) =>
        row.caseId.toLowerCase().includes(q) ||
        row.offense.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q),
    );
  }, [search, tableData]);

  return (
    <div className="view-cases-charity-page">
      <CommonTable
        tableData={filteredTableData}
        headers={tableHeaders}
        handleActionClick={(action, caseId) => {
          if (action === "view") navigate(`/cases/case-submitted/${caseId}`);
        }}
        actionButtons={[
          { label: "View", action: "view" },
          { label: "Edit", action: "edit" },
          { label: "Delete", action: "delete" },
        ]}
      />
    </div>
  );
}

export default ViewCasesChairty;
