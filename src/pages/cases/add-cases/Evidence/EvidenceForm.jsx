import { useState } from 'react'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import CommonButton from '../../../../components/common-button.jsx'
import AddEvidenceModal from '../../../../Modals/CaseModals/AddEvidenceModal.jsx'
import EvidenceCard from './EvidenceCard.jsx'
import '../AddSuspectForm/AddSuspectForm.css'
import './Evidence.css'
import icon from '../../../../Assets/Icon (8).svg'
import { useCaseForm } from '../../../../context/CaseFormContext'
import { useToast } from '../../../../components/toast/ToastProvider'

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

function detectFileType(file) {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('audio/')) return 'audio'
  return 'document'
}

const EvidenceForm = () => {
  const { caseData, setEvidence, uploadFile } = useCaseForm()
  const { showToast } = useToast()
  const evidenceItems = caseData.evidence?.items || []
  const [haveEvidence, sethaveEvidence] = useState(
    caseData.evidence?.has_evidence || evidenceItems.length > 0 ? true : null,
  )
  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleAddEvidence = async ({ file, description }) => {
    const detailsText = description.trim() || DEFAULT_DESCRIPTION
    setUploading(true)
    try {
      const url = await uploadFile(file)
      const nextIndex = evidenceItems.length + 1
      const newItem = {
        title: `Evidence #${nextIndex}`,
        description: detailsText,
        file_url: url,
        filename: file.name,
        file_type: detectFileType(file),
      }
      setEvidence({
        has_evidence: true,
        items: [...evidenceItems, newItem],
      })
      showToast('Evidence added', 'success')
    } catch (err) {
      showToast(err?.message || 'Evidence upload failed', 'error')
    } finally {
      setUploading(false)
    }
  }

  const clearEvidenceList = () => {
    setEvidence({ has_evidence: false, items: [] })
  }

  return (
    <>
      {addEvidenceModalOpen && (
        <AddEvidenceModal
          onClose={() => setAddEvidenceModalOpen(false)}
          onAdd={handleAddEvidence}
        />
      )}
      <div className="evidence_wrapper">
        <WizardSection
          iconBg=" linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
          icon={<img src={icon} alt="" />}
          title="Evidence"
          subtitle="Proof of what happened"
        >
        </WizardSection>
        <form className="evidence_form_wrapper">
          <div className="radio_main">
            <label>
              Any Evidence? <span>*</span>
            </label>
            <div className="radio_buttons_wrapper">
              <ChoiceRadio
                name="any_evidence"
                label="Yes"
                value="yes"
                onChange={() => {
                  sethaveEvidence(true)
                  setEvidence({ has_evidence: true, items: evidenceItems })
                }}
                checked={haveEvidence === true}
              />
              <ChoiceRadio
                name="any_evidence"
                label="No"
                value="no"
                onChange={() => {
                  sethaveEvidence(false)
                  clearEvidenceList()
                }}
                checked={haveEvidence === false}
              />
            </div>
          </div>
          {haveEvidence === true && (
            <div className="evidence_list_block">
              <div className="evidence_list_header_row">
                <div className="evidence_list_header_text">
                  <h3 className="evidence_list_title">Evidence List</h3>
                  {evidenceItems.length === 0 && (
                    <p className="evidence_list_empty">No Evidence added.</p>
                  )}
                </div>
                <div className="evidence_list_header_actions">
                  <CommonButton
                    text={uploading ? 'Uploading...' : 'Add Evidence'}
                    img=""
                    disabled={uploading}
                    backgroundColor="transparent"
                    color="#141414"
                    borderColor="#95C63D"
                    onClick={() => setAddEvidenceModalOpen(true)}
                  />
                </div>
              </div>
              {evidenceItems.length > 0 && (
                <ul className="evidence_cards_grid">
                  {evidenceItems.map((item, index) => (
                    <li key={`${item.filename}-${index}`}>
                      <EvidenceCard
                        evidence={{
                          id: index + 1,
                          displayIndex: index + 1,
                          title: item.title,
                          img: item.file_type === 'image' ? item.file_url : '/Image (Vehicle 2).png',
                          details: item.description,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default EvidenceForm
