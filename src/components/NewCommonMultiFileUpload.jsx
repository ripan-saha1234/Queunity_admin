import { useEffect, useMemo, useRef, useState } from "react";
import "../css/CommonFileUpload.css";

function isImageSource(value) {
  if (!value) return false;
  if (typeof value === "string") {
    return /\.(png|jpe?g|gif|webp|bmp|svg)($|\?)/i.test(value);
  }
  return value.type?.startsWith("image/");
}

const NewCommonMultiFileUpload = ({
  onChange,
  existingUrls = [],
  removable = false,
  onRemoveExisting,
}) => {
  const inputRef = useRef(null);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => {
        if (preview.src?.startsWith("blob:")) {
          URL.revokeObjectURL(preview.src);
        }
      });
    };
  }, [filePreviews]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFilePreviews((prev) => {
      prev.forEach((preview) => {
        if (preview.src?.startsWith("blob:")) {
          URL.revokeObjectURL(preview.src);
        }
      });
      return files.map((file) => ({
        key: `${file.name}-${file.lastModified}-${file.size}`,
        src: isImageSource(file) ? URL.createObjectURL(file) : "/document1.svg",
        alt: file.name,
        type: "new",
      }));
    });
    if (onChange) onChange(e);
  };

  const handleRemoveNew = (key) => {
    setFilePreviews((prev) => {
      const removed = prev.find((preview) => preview.key === key);
      if (removed?.src?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.src);
      }
      return prev.filter((preview) => preview.key !== key);
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onChange) {
      onChange({ target: { files: [] } });
    }
  };

  const handleRemoveExisting = (url) => {
    onRemoveExisting?.(url);
  };

  const existingPreviews = useMemo(
    () =>
      (existingUrls || []).map((url, index) => ({
        key: `existing-${url}-${index}`,
        src: isImageSource(url) ? url : "/document1.svg",
        alt: `Uploaded file ${index + 1}`,
        type: "existing",
        url,
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
            <div key={preview.key} className="file_upload_preview_item">
              <img
                src={preview.src}
                alt={preview.alt}
                className="file_upload_preview_image"
              />
              {removable ? (
                <button
                  type="button"
                  className="file_upload_preview_remove"
                  aria-label="Remove image"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (preview.type === "existing") {
                      handleRemoveExisting(preview.url);
                    } else {
                      handleRemoveNew(preview.key);
                    }
                  }}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              ) : null}
            </div>
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

      <input ref={inputRef} type="file" multiple onChange={handleChange} />
    </div>
  );
};

export default NewCommonMultiFileUpload;
