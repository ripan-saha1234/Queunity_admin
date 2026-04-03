import React, { useState } from 'react'
import ViewEvidenceModal from '../../../../Modals/CaseModals/ViewEvidenceModal'

const EvidenceCard = ({ evidence }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false)
  const badgeNumber =
    typeof evidence.displayIndex === 'number'
      ? evidence.displayIndex
      : typeof evidence.id === 'number'
        ? evidence.id
        : 1

  return (
    <>
      {modalIsOpen && (
        <ViewEvidenceModal
          title={evidence?.title}
          imageSrc={evidence?.img}
          description={evidence?.details}
          setmodalIsOpen={setmodalIsOpen}
        />
      )}
      <div className="card_01 evidence-card">
        <div className="cardTop_02 evidence-card__top">
          <div
            className="leftSection_03 evidence-card__left"
            style={{ alignItems: 'center' }}
          >
            <div className="numberBox_04 evidence-card__badge">{badgeNumber}</div>

            <div className="titleSection_05">
              <h3>{evidence.title}</h3>
            </div>
          </div>

          <div className="actionsWrap_06">
            <button
              type="button"
              onClick={() => {
                setmodalIsOpen(true)
              }}
              className="iconBtn_07 viewBtn_08 evidence-card__view"
              title="View"
            >
              <img src="/view-eye.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="cardBody_13 evidence-card__body">
          <img
            className="evidence-card__image"
            src={evidence?.img}
            alt=""
          />
          <div className="evidence-card__description">
            <span className="evidence-card__description-label">Description</span>
            <p className="evidence-card__description-text">{evidence?.details}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EvidenceCard
