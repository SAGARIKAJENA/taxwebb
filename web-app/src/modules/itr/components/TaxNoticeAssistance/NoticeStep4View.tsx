import React from 'react'

export interface Step4Props {
  onRequestChanges: () => void
  onApproveAndSubmit: () => void
}

export const NoticeStep4View: React.FC<Step4Props> = ({
  onRequestChanges,
  onApproveAndSubmit,
}) => (
  <>
    <div>
      <h2 className="notice-flow-card-heading">Please review our response before we submit it</h2>
      <p className="notice-flow-card-subheading">
        Nothing is sent to the department on your behalf without your approval.
      </p>
    </div>

    <div className="notice-draft-letter-card">
      <p style={{ margin: '0 0 1rem 0', fontWeight: 600 }}>Respected Sir/Madam,</p>
      <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
        With reference to the intimation under section 143(1)(a) bearing number
        CPC/2526/A3/284419260 dated 18 August 2026, we respectfully submit the following response
        on behalf of the assessee, Ms Anjali Deshmukh (PAN AXTPD4419K), for Assessment Year 2025-26.
      </p>
      <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
        The proposed adjustment relates to interest income of ₹42,000 reflected in the Annual
        Information Statement. The assessee confirms that this interest was received and that it was
        inadvertently omitted from Schedule OS of the return.
      </p>
      <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
        The assessee therefore agrees with the proposed adjustment. The resulting additional tax of
        ₹8,736 including cess has been paid vide challan dated 1 September 2026, a copy of which is
        enclosed.
      </p>
      <p style={{ margin: '0 0 1.25rem 0', lineHeight: 1.6 }}>
        We request that the return be processed accordingly.
      </p>
      <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>Yours faithfully,</p>
      <p style={{ margin: '0 0 0.2rem 0', color: '#1e3a8a', fontWeight: 700 }}>
        For TaxEdge Fin Solutions
      </p>
      <p style={{ margin: 0, color: '#64748b' }}>Meera Iyer, Tax Executive</p>
    </div>

    <div className="notice-draft-actions">
      <button type="button" className="notice-btn-outline" onClick={onRequestChanges}>
        Request changes
      </button>
      <button type="button" className="notice-btn-primary" onClick={onApproveAndSubmit}>
        Approve &amp; submit →
      </button>
    </div>
  </>
)
