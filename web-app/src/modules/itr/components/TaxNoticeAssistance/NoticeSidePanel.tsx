import React from 'react'
import { NOTICE_STEPS_METADATA, type NoticeStepMeta } from './TaxNoticeAssistance'

export interface NoticeSidePanelProps {
  currentStep: number
  activeMeta: NoticeStepMeta
  onSelectStep: (step: number) => void
}

export const NoticeSidePanel: React.FC<NoticeSidePanelProps> = ({
  currentStep,
  activeMeta,
  onSelectStep,
}) => {
  return (
    <aside className="notice-flow-side-panel">
      <div className="notice-side-card">
        <div className="notice-side-card-tag">WHAT THE CUSTOMER SEES</div>
        <p className="notice-side-card-text">{activeMeta.customerSees}</p>
      </div>

      <div className="notice-side-card">
        <div className="notice-side-card-tag">WHAT HAPPENS NEXT</div>
        <p className="notice-side-card-text">{activeMeta.happensNext}</p>
      </div>

      <div className="notice-side-card">
        <div className="notice-side-card-title">Flow</div>
        <div className="notice-flow-list">
          {NOTICE_STEPS_METADATA.map((s) => (
            <div
              key={s.stepNumber}
              className={`notice-flow-item ${
                s.stepNumber === currentStep ? 'notice-flow-item--active' : ''
              }`}
              onClick={() => onSelectStep(s.stepNumber)}
            >
              <span className="notice-flow-num">{s.stepNumber}</span>
              <span>{s.flowLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
