import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import CommonTable from "../../../components/common-table";
import "./all-cases.css";

function AllCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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
  )

  const tableData = useMemo(
    () => [
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Open",
      },
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Closed",
      },
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Open",
      },
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Open",
      },
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Closed",
      },
      {
        caseId: "#ST456666",
        offense: "Offense 1",
        date: "27/10/2025",
        time: "10:07 AM",
        status: "Open",
      },
    ],
    [],
  )

  const filteredTableData = useMemo(() => {
    if (!search.trim()) return tableData
    const q = search.trim().toLowerCase()
    return tableData.filter((row) => row.offense.toLowerCase().includes(q) || row.caseId.toLowerCase().includes(q))
  }, [search, tableData])

  return (
    <div>
      <CommonTable
        tableData={filteredTableData}
        headers={tableHeaders}
        handleActionClick={(action, id) => {
          console.log("table action", action, id)
        }}
        actionButtons={[
          { label: "Edit", action: "edit" },
          { label: "View", action: "view" },
          { label: "Delete", action: "delete" },
        ]}
      />
    </div>
  )
}

export default AllCases