import { useState } from 'react'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import CommonButton from '../../../../components/common-button.jsx'
import AddEvidenceModal from '../../../../Modals/CaseModals/AddEvidenceModal.jsx'
import EvidenceCard from './EvidenceCard.jsx'
import '../AddSuspectForm/AddSuspectForm.css'
import './Evidence.css'
import icon from '../../../../Assets/Icon (8).svg'

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

function revokeEvidenceBlobUrls(items) {
  items.forEach((item) => {
    if (item?.img && String(item.img).startsWith('blob:')) {
      URL.revokeObjectURL(item.img)
    }
  })
}

const EvidenceForm = () => {
  const [haveEvidence, sethaveEvidence] = useState(null)
  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false)
  const [evidenceItems, setEvidenceItems] = useState([])

  const handleAddEvidence = ({ file, description }) => {
    const detailsText = description.trim() || DEFAULT_DESCRIPTION
    const isImage = file.type.startsWith('image/')
    const img = isImage ? URL.createObjectURL(file) : '/Image (Vehicle 2).png'

    setEvidenceItems((prev) => {
      const nextIndex = prev.length + 1
      return [
        ...prev,
        {
          id: `ev-${Date.now()}-${file.name}`,
          displayIndex: nextIndex,
          title: `Evidence #${nextIndex}`,
          img,
          details: detailsText,
        },
      ]
    })
  }

  const clearEvidenceList = () => {
    setEvidenceItems((prev) => {
      revokeEvidenceBlobUrls(prev)
      return []
    })
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
                    text="Add Evidence"
                    img=""
                    backgroundColor="transparent"
                    color="#141414"
                    borderColor="#95C63D"
                    onClick={() => setAddEvidenceModalOpen(true)}
                  />
                </div>
              </div>
              {evidenceItems.length > 0 && (
                <ul className="evidence_cards_grid">
                  {evidenceItems.map((item) => (
                    <li key={item.id}>
                      <EvidenceCard evidence={item} />
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
