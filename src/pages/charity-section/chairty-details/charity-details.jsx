import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { getCharityById } from "../../../api/charity";
import usePageHeader from "../../../hooks/use-page-header";
import "./charity-details.css";

const CHARITY_TYPE_LABELS = {
  non_profit: "Non-Profit",
};

const CHARITY_CATEGORY_LABELS = {
  public: "Public",
  private: "Private",
  community: "Community",
  education: "Education",
};

function formatCharityType(value) {
  if (!value) return "-";
  return CHARITY_TYPE_LABELS[value] || value.replace(/_/g, " ");
}

function formatCharityCategory(value) {
  if (!value) return "-";
  return CHARITY_CATEGORY_LABELS[value] || value.replace(/_/g, " ");
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

function formatContactPhone(contact) {
  if (!contact) return "-";
  const parts = [contact.phone_code, contact.phone].filter(Boolean);
  return parts.join(" ").trim() || "-";
}

function getDocumentIcon(index) {
  if (index === 2) return "/document2.svg";
  return "/document1.svg";
}

function mapCharityToDetailCards(charity) {
  const contact = charity.contact_person || {};

  return [
    {
      label: "Charity ID:",
      value: charity.charity_id ? `#${charity.charity_id}` : "-",
    },
    { label: "Charity Type", value: formatCharityType(charity.charity_type) },
    {
      label: "Charity Category",
      value: formatCharityCategory(charity.charity_category),
    },
    {
      label: "Document",
      value: "documents",
      documentUrls: charity.document_urls || [],
    },
    {
      label: "Number of Team Members",
      value: charity.member_count != null ? String(charity.member_count) : "-",
    },
    {
      label: "Number of Beneficiaries:",
      value:
        charity.beneficiary_count != null
          ? String(charity.beneficiary_count)
          : "-",
    },
    { label: "Country", value: charity.address?.country || "-" },
    { label: "Address", value: formatAddress(charity.address) },
    { label: "Phone number", value: formatContactPhone(contact) },
    { label: "Email", value: contact.email || "-" },
  ];
}

function CharityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCharity = useCallback(async () => {
    if (!id) {
      setError("Charity ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getCharityById(id);
      setCharity(data);
    } catch (err) {
      setCharity(null);
      setError(err.message || "Failed to load charity details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCharity();
  }, [fetchCharity]);

  const charityName = charity?.charity_name || "Charity Details";

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
        onClick: () => navigate(`/charity/edit-charity/${id}`),
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
      {
        type: "button",
        text: "View Cases",
        onClick: () => navigate("/charity/details/view-cases-charity"),
        backgroundColor: "#FFFFFF",
        textColor: "#141414",
        borderColor: "#9FC53D",
      },
    ],
    [navigate],
  );

  usePageHeader({
    title: charityName,
    breadcrumbs: [
      { title: "Charity", link: "/charity" },
      { title: charityName, link: `/charity/details/${id || ""}` },
    ],
    buttons: headerButtons,
  });

  const detailCards = useMemo(
    () => (charity ? mapCharityToDetailCards(charity) : []),
    [charity],
  );

  const galleryImages = charity?.gallery_urls?.length
    ? charity.gallery_urls
    : [];

  if (loading) {
    return (
      <div className="charity-details-page">
        <div className="table1-no-data-container">
          <p>Loading charity details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="charity-details-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charity-details-page">
      <div className="charity-details-hero">
        <div className="charity-details-logo-box">
          <img
            src={charity?.charity_logo_url || "/school-detail-img.svg"}
            alt="Charity logo"
          />
        </div>
        <h2>{charityName}</h2>
      </div>

      <section className="charity-details-section">
        <h3>Charity Details</h3>
        <div className="charity-details-grid">
          {detailCards.map((item, index) => (
            <article key={index} className="charity-details-card">
              <p className="charity-details-card-label">{item.label}</p>
              {item.value === "documents" ? (
                <div className="charity-details-documents-row">
                  {item.documentUrls?.length ? (
                    item.documentUrls.map((docUrl, docIndex) => (
                      <a
                        key={`${docUrl}-${docIndex}`}
                        href={docUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="charity-details-doc-link"
                      >
                        <img
                          src={getDocumentIcon(docIndex)}
                          alt={`Document ${docIndex + 1}`}
                          className="charity-details-doc-image"
                        />
                      </a>
                    ))
                  ) : (
                    <>
                      <img
                        src="/document1.svg"
                        alt="Document 1"
                        className="charity-details-doc-image"
                      />
                      <img
                        src="/document1.svg"
                        alt="Document 2"
                        className="charity-details-doc-image"
                      />
                      <img
                        src="/document2.svg"
                        alt="Document 3"
                        className="charity-details-doc-image"
                      />
                    </>
                  )}
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
          {charity?.description || "-"}
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <section className="charity-details-section charity-details-gallery-section">
          <h3 className="charity-details-gallery-title">Gallery</h3>
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={galleryImages.length > 1}
            navigation
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              900: { slidesPerView: 3.2 },
              1200: { slidesPerView: 5 },
            }}
            className="charity-details-gallery-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={`${image}-${index}`}>
                <div className="charity-details-gallery-card">
                  <img src={image} alt={`Charity gallery ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : null}
    </div>
  );
}

export default CharityDetails;
