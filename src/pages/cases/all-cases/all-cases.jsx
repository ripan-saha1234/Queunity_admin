import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
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

  return (
    <div>AllCases</div>
  )
}

export default AllCases