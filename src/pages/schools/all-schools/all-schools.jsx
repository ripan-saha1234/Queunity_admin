import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common-table";
import usePageHeader from "../../../hooks/use-page-header";
import "./all-schools.css";

function AllSchools() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const schoolsData = useMemo(
    () => [
      {
        schoolId: "SC456666",
        companyName: {
          name: "Elite High School",
          id: "#SC456666",
          image: "/table-img1.svg",
        },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456667",
        companyName: {
          name: "Prism Dynamics School",
          id: "#SC456667",
          image: "/table-img2.svg",
        },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456668",
        companyName: {
          name: "Elite High School",
          id: "#SC456668",
          image: "/table-img1.svg",
        },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456669",
        companyName: {
          name: "Prism Dynamics School",
          id: "#SC456669",
          image: "/table-img2.svg",
        },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456670",
        companyName: {
          name: "Elite High School",
          id: "#SC456670",
          image: "/table-img1.svg",
        },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456671",
        companyName: {
          name: "Prism Dynamics School",
          id: "#SC456671",
          image: "/table-img2.svg",
        },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456672",
        companyName: {
          name: "Elite High School",
          id: "#SC456672",
          image: "/table-img1.svg",
        },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456673",
        companyName: {
          name: "Prism Dynamics School",
          id: "#SC456673",
          image: "/table-img2.svg",
        },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456674",
        companyName: {
          name: "Elite High School",
          id: "#SC456674",
          image: "/table-img1.svg",
        },
        principalName: "Bidisha Bhowmick",
        email: "bidishabhowmick@gmail.com",
        phone: "+1 1234567890",
      },
      {
        schoolId: "SC456675",
        companyName: {
          name: "Prism Dynamics School",
          id: "#SC456675",
          image: "/table-img2.svg",
        },
        principalName: "Somali Goswami",
        email: "somaligoswami@gmail.com",
        phone: "+1 1234567890",
      },
    ],
    [],
  );

  const filteredSchools = useMemo(() => {
    if (!search.trim()) return schoolsData;

    const query = search.trim().toLowerCase();
    return schoolsData.filter((school) => {
      const schoolName = school.companyName?.name?.toLowerCase() || "";
      const principalName = school.principalName?.toLowerCase() || "";
      const email = school.email?.toLowerCase() || "";
      const phone = school.phone?.toLowerCase() || "";
      return (
        schoolName.includes(query) ||
        principalName.includes(query) ||
        email.includes(query) ||
        phone.includes(query)
      );
    });
  }, [search, schoolsData]);

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

  return (
    <div className="all-schools-page">
      <CommonTable
        tableData={filteredSchools}
        headers={tableHeaders}
        index={0}
        handleActionClick={(action, id) => {
          if (action === "view") {
            navigate(`/schools/details/${id}`);
          }
          if (action === "edit") {
            navigate(`/schools/edit-schools`);
          }
        }}
        actionButtons={[
          { label: "Edit", action: "edit" },
          { label: "View", action: "view" },
          { label: "Delete", action: "delete" },
        ]}
      />
    </div>
  );
}

export default AllSchools;
