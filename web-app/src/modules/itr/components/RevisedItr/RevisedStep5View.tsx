import React from 'react'
import { REVISED_COMPARISON_DATA } from './RevisedItr'

export interface Step5Props {
  selectedAY: string
  onRequestChange: () => void
  onApproveAndFile: () => void
}

export const RevisedStep5View: React.FC<Step5Props> = ({
  selectedAY,
  onRequestChange,
  onApproveAndFile,
}) => (
  <>
    <div>
      <div className="revised-belated-pill">● Revised Return · {selectedAY}</div>
      <h2 className="revised-flow-card-heading">Please review your revised computation</h2>
      <p className="revised-flow-card-subheading">
        Same review, approval, filing and e-verification as regular ITR Filing — labelled as a
        revision.
      </p>
    </div>

    {/* Comparison Table */}
    <div className="revised-table-wrapper">
      <table className="revised-comp-table">
        <thead>
          <tr>
            <th>LINE</th>
            <th>ORIGINAL</th>
            <th>REVISED</th>
            <th>CHANGE</th>
          </tr>
        </thead>
        <tbody>
          {REVISED_COMPARISON_DATA.map((row) => (
            <tr key={row.line}>
              <td>{row.line}</td>
              <td>{row.original}</td>
              <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.revised}</td>
              <td
                style={{
                  fontWeight: 700,
                  color: row.isChangePositive ? '#ea580c' : '#64748b',
                }}
              >
                {row.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Hero Banner: Revised Refund */}
    <div className="revised-hero-banner">
      <div className="revised-hero-label">REVISED REFUND DUE</div>
      <div className="revised-hero-amount">₹12,458</div>
      <div className="revised-hero-sub">Down from ₹18,346 on the original return</div>
    </div>

    {/* Actions */}
    <div className="revised-comp-actions">
      <button type="button" className="revised-btn-outline" onClick={onRequestChange}>
        Request changes
      </button>
      <button type="button" className="revised-btn-primary" onClick={onApproveAndFile}>
        Approve &amp; file revision →
      </button>
    </div>
  </>
)
