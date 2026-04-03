import { useRef, useState } from 'react'
import '../Modals.css'
import CommonButton from '../../components/common-button'

const ACCEPT_TYPES =
  '.doc,.docx,.pdf,.png,.jpeg,.jpg,.mp4,.mp3,application/pdf,image/png,image/jpeg'

function formatFileSize(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function AddEvidenceModal({ onClose, onAdd }) {
  const fileInputRef = useRef(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const f = e.target.files?.[0]
    setFile(f ?? null)
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAdd = () => {
    if (!file) return
    onAdd({ file, description: description.trim() })
    onClose()
  }

  return (
    <div
      className="modal_wrapper"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="modal_body add-evidence-modal"
        role="dialog"
        aria-labelledby="add-evidence-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head">
          <h5 id="add-evidence-modal-title">Add Evidence</h5>
          <button
            type="button"
            className="add-evidence-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="add-evidence-modal__field">
          <span className="add-evidence-modal__label" id="add-evidence-file-label">
            Add Evidence file
          </span>
          <div className="add-evidence-modal__file-stack">
            <div
              className="add-evidence-modal__upload"
              role="button"
              tabIndex={0}
              aria-labelledby="add-evidence-file-label"
              aria-describedby="add-evidence-file-hint"
              onClick={openFilePicker}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openFilePicker()
                }
              }}
            >
              <img src="/document-upload.png" alt="" />
              <p className="add-evidence-modal__upload-title">
                <span>Choose file</span> to upload
              </p>
              <p id="add-evidence-file-hint" className="add-evidence-modal__upload-types">
                docx, pdf, png, jpeg, mp4, mp3
              </p>
            </div>

            {file && (
              <div className="add-evidence-modal__file-preview">
                <div className="add-evidence-modal__file-preview-icon" aria-hidden="true">
                <img src="/evidence_icon.svg" alt="" />
                </div>
                <div className="add-evidence-modal__file-preview-info">
                  <span className="add-evidence-modal__file-preview-name">{file.name}</span>
                  <p className="add-evidence-modal__file-preview-meta">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="add-evidence-modal__file-preview-sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="add-evidence-modal__file-preview-ready">
                      <span className="add-evidence-modal__file-preview-ready-dot" />
                      Ready
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="add-evidence-modal__file-preview-remove"
                  aria-label="Remove file"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFile()
                  }}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              id="add-evidence-file-input"
              type="file"
              accept={ACCEPT_TYPES}
              className="add-evidence-modal__file-input"
              onChange={handleFileChange}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="add-evidence-modal__field">
          <label className="add-evidence-modal__label" htmlFor="add-evidence-description">
            Description
          </label>
          <textarea
            id="add-evidence-description"
            className="add-evidence-modal__textarea"
            rows={5}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="add-evidence-modal__footer">
          <CommonButton
            text="Add"
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            disabled={!file}
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  )
}

export default AddEvidenceModal
