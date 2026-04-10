import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import "./schools-details.css";
import CommonButton from "../../../components/common-button";

function SchoolsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Delete",
        onClick: () => {},
        backgroundColor: "transparent",
        textColor: "#141414",
        borderColor: "transparent",
      },
      {
        type: "button",
        text: "Edit",
        onClick: () => navigate("/schools/edit-schools"),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
    ],
    [navigate],
  );

  usePageHeader({
    title: "Elite High School",
    breadcrumbs: [
      { title: "Schools", link: "/schools" },
      { title: "Elite High School", link: `/schools/details/${id || "1"}` },
    ],
    buttons: headerButtons,
  });

  const detailCards = [
    { label: "School ID:", value: "#SC1236" },
    { label: "School Type", value: "Primary" },
    { label: "School Category", value: "Public" },
    { label: "Number of Faculty Members", value: "20" },
    { label: "Number of students:", value: "400" },
    { label: "Country", value: "United States" },
    {
      label: "Address",
      value: "Office 149, 450 South Brand Brooklyn San Diego County, CA 91905, USA",
    },
    { label: "Phone number", value: "+1 929 329 36456" },
    { label: "Email", value: "bidishabh@gmail.com" },
  ];

  const caseCards = [
    { label: "TOTAL CASES", value: "2,847" },
    { label: "ACTIVE CASES", value: "182" },
    { label: "RESOLVED", value: "2,531" },
    { label: "PENDING REVIEW", value: "134" },
  ];

  return (
    <div className="schools-details-page">
      <div className="schools-details-hero">
        <div className="schools-details-logo-box">
          <img src="/school-detail-img.svg" alt="School logo" />
        </div>
        <h2>Elite High School</h2>
      </div>

      <section className="schools-details-section">
        <h3>School Details</h3>
        <div className="schools-details-grid">
          {detailCards.map((item, index) => (
            <article key={index} className="schools-details-card">
              <p className="schools-details-card-label">{item.label}</p>
              <p className="schools-details-card-value">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="schools-details-section schools-details-cases">
        <div className="schools-details-cases-head">
          <h3>Cases</h3>
          <CommonButton
            text="View Cases"
            onClick={() => navigate(`/schools/details/${id || "1"}/view-cases`)}
            backgroundColor="#95C63D"
            textColor="#141414"
            borderColor="#9FC53D"
          />
        </div>

        <div className="schools-details-case-grid">
          {caseCards.map((item, index) => (
            <article key={index} className="schools-details-case-card">
              <p className="schools-details-case-label">{item.label}</p>
              <p className="schools-details-case-value">{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SchoolsDetails;
