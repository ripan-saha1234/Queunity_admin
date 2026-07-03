import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSchoolById } from "../../../api/school";
import usePageHeader from "../../../hooks/use-page-header";
import "./schools-details.css";
import CommonButton from "../../../components/common-button";

const SCHOOL_TYPE_LABELS = {
  primary: "Primary",
  middle: "Middle",
  high: "High",
  k12: "K-12",
};

const SCHOOL_CATEGORY_LABELS = {
  public: "Public",
  private: "Private",
  charter: "Charter",
};

function formatSchoolType(value) {
  if (!value) return "-";
  return SCHOOL_TYPE_LABELS[value] || value;
}

function formatSchoolCategory(value) {
  if (!value) return "-";
  return SCHOOL_CATEGORY_LABELS[value] || value;
}

function formatAddress(address) {
  if (!address) return "-";
  const parts = [
    address.address_line1,
    address.address_line2,
    address.landmark,
    address.city,
    address.state,
    address.zip,
    address.country,
  ].filter(Boolean);
  return parts.join(", ") || "-";
}

function formatPrincipalPhone(principal) {
  if (!principal) return "-";
  const parts = [principal.phone_code, principal.phone].filter(Boolean);
  return parts.join(" ").trim() || "-";
}

function mapSchoolToDetailCards(school) {
  const principal = school.principal || {};

  return [
    { label: "School ID:", value: school.school_id ? `#${school.school_id}` : "-" },
    { label: "School Type", value: formatSchoolType(school.school_type) },
    { label: "School Category", value: formatSchoolCategory(school.school_category) },
    {
      label: "Number of Faculty Members",
      value: school.faculty_count != null ? String(school.faculty_count) : "-",
    },
    {
      label: "Number of students:",
      value: school.student_count != null ? String(school.student_count) : "-",
    },
    { label: "Country", value: school.address?.country || "-" },
    { label: "Address", value: formatAddress(school.address) },
    { label: "Phone number", value: formatPrincipalPhone(principal) },
    { label: "Email", value: principal.email || "-" },
  ];
}

function SchoolsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSchool = useCallback(async () => {
    if (!id) {
      setError("School ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getSchoolById(id);
      setSchool(data);
    } catch (err) {
      setSchool(null);
      setError(err.message || "Failed to load school details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSchool();
  }, [fetchSchool]);

  const schoolName = school?.school_name || "School Details";

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
        onClick: () => navigate(`/schools/edit-schools/${id}`),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
    ],
    [navigate],
  );

  usePageHeader({
    title: schoolName,
    breadcrumbs: [
      { title: "Schools", link: "/schools" },
      { title: schoolName, link: `/schools/details/${id || ""}` },
    ],
    buttons: headerButtons,
  });

  const detailCards = useMemo(
    () => (school ? mapSchoolToDetailCards(school) : []),
    [school],
  );

  const caseCards = [
    { label: "TOTAL CASES", value: "2,847" },
    { label: "ACTIVE CASES", value: "182" },
    { label: "RESOLVED", value: "2,531" },
    { label: "PENDING REVIEW", value: "134" },
  ];

  if (loading) {
    return (
      <div className="schools-details-page">
        <div className="table1-no-data-container">
          <p>Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schools-details-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schools-details-page">
      <div className="schools-details-hero">
        <div className="schools-details-logo-box">
          <img
            src={school?.school_logo_url || "/school-detail-img.svg"}
            alt="School logo"
          />
        </div>
        <h2>{schoolName}</h2>
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
