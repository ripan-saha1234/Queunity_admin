import { useMemo, useState } from "react";
import "../css/CommonFileUpload.css";

function isImageSource(value) {
  if (!value) return false;
  if (typeof value === "string") {
    return /\.(png|jpe?g|gif|webp|bmp|svg)($|\?)/i.test(value);
  }
  return value.type?.startsWith("image/");
}

const NewCommonMultiFileUpload = ({ onChange, existingUrls = [] }) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({
      key: `${file.name}-${file.lastModified}-${file.size}`,
      src: isImageSource(file) ? URL.createObjectURL(file) : "/document1.svg",
      alt: file.name,
    }));

    setFilePreviews(previews);
    if (onChange) onChange(e);
  };

  const existingPreviews = useMemo(
    () =>
      (existingUrls || []).map((url, index) => ({
        key: `existing-${url}-${index}`,
        src: isImageSource(url) ? url : "/document1.svg",
        alt: `Uploaded file ${index + 1}`,
      })),
    [existingUrls],
  );

  const allPreviews = [...existingPreviews, ...filePreviews];
  const hasPreviews = allPreviews.length > 0;

  return (
    <div
      className={`file_upload_wrapper${
        hasPreviews ? " file_upload_wrapper--has-preview" : ""
      }`}
    >
      {hasPreviews ? (
        <div className="preview_container">
          {allPreviews.map((preview) => (
            <img
              key={preview.key}
              src={preview.src}
              alt={preview.alt}
              className="file_upload_preview_image"
            />
          ))}
        </div>
      ) : (
        <>
          <img src="/document-upload.png" alt="upload" />
          <h2>
            <span>Choose file</span> to upload <br />
            pdf, png, jpeg, jpg
          </h2>
        </>
      )}

      <input type="file" multiple onChange={handleChange} />
    </div>
  );
};

export default NewCommonMultiFileUpload;
