import usePageHeader from "../../../hooks/use-page-header";
import "./add-cases.css";

function AddCases() {
  usePageHeader({
    title: "Add Case",
    breadcrumbs: [
      { title: "Cases", link: "/cases" },
      { title: "Add Case", link: "/cases/add-cases" },
    ],
    buttons: [],
  });

  return (
    <div>AddCases</div>
  )
}

export default AddCases