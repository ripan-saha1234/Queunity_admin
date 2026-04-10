import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import "./charity-details.css";

function CharityDetails() {
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
        onClick: () => navigate("/charity/edit-charity"),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "button",
        text: "View Cases",
        onClick: () => navigate(`/charity/details/view-cases-charity`),
        backgroundColor: "#FFFFFF",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
    ],
    [navigate],
  );

  usePageHeader({
    title: "Hope Foundation",
    breadcrumbs: [
      { title: "Charity", link: "/charity" },
      { title: "Hope Foundation", link: `/charity/details/${id || "1"}` },
    ],
    buttons: headerButtons,
  });

  const detailCards = [
    { label: "Charity ID:", value: "#CH1236" },
    { label: "Charity Type", value: "Non-Profit" },
    { label: "Document", value: "documents" },
    { label: "Number of Team Members", value: "20" },
    { label: "Number of Beneficiaries:", value: "400" },
    { label: "Country", value: "United States" },
    {
      label: "Address",
      value: "Office 149, 450 South Brand Brooklyn San Diego County, CA 91905, USA",
    },
    { label: "Phone number", value: "+1 929 329 36456" },
    // { label: "Email", value: "bidishabh@gmail.com" },
  ];

  return (
    <div className="charity-details-page">
      <div className="charity-details-hero">
        <div className="charity-details-logo-box">
          <img src="/school-detail-img.svg" alt="Charity logo" />
        </div>
        <h2>Hope Foundation</h2>
      </div>

      <section className="charity-details-section">
        <h3>Charity Details</h3>
        <div className="charity-details-grid">
          {detailCards.map((item, index) => (
            <article key={index} className="charity-details-card">
              <p className="charity-details-card-label">{item.label}</p>
              {item.value === "documents" ? (
                <div className="charity-details-documents-row">
                  <img src="/document1.svg" alt="Document 1" className="charity-details-doc-image" />
                  <img src="/document1.svg" alt="Document 2" className="charity-details-doc-image" />
                  <img src="/document1.svg" alt="Document 3" className="charity-details-doc-image" />
                </div>
              ) : (
                <p className="charity-details-card-value">{item.value}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="charity-details-section charity-details-mission-section">
        <h3 className="charity-details-mission-title">Description or Mission</h3>
        <div className="charity-details-mission-box">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </section>
    </div>
  );
}

export default CharityDetails;
