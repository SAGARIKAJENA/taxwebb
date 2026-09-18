import React from 'react'
import {
  UserCategoryIcon,
  ShieldCategoryIcon,
  type TaxpayerProfile,
} from './itrCategories.constants'

export interface ItrTaxpayerProfileCardProps {
  taxpayerProfile: TaxpayerProfile
}

export const ItrTaxpayerProfileCard: React.FC<ItrTaxpayerProfileCardProps> = ({
  taxpayerProfile,
}) => {
  return (
    <section className="itr-info-card" aria-labelledby="taxpayer-identity-heading">
      <div className="itr-info-card__top">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <UserCategoryIcon size={20} />
          </div>
          <h2 id="taxpayer-identity-heading" className="itr-info-card__title">
            Taxpayer Identity
          </h2>
        </div>
        <span className="itr-badge-verified">
          <ShieldCategoryIcon size={13} />
          <span>Auto-Verified</span>
        </span>
      </div>

      <p className="itr-info-card__desc">
        Auto-filled from your TaxEdge profile. Verified with Income Tax Department PAN Master.
      </p>

      <div className="itr-taxpayer-details-box">
        <div className="itr-detail-row">
          <span className="itr-detail-label">PAN Number</span>
          <strong className="itr-detail-val itr-detail-val--mono">
            {taxpayerProfile.panNumber}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Aadhaar Number</span>
          <strong className="itr-detail-val itr-detail-val--mono">
            {taxpayerProfile.aadhaarNumber}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Full Legal Name</span>
          <strong className="itr-detail-val">
            {taxpayerProfile.fullName}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Date of Birth</span>
          <strong className="itr-detail-val">
            {taxpayerProfile.dob}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Mobile Number</span>
          <strong className="itr-detail-val">
            {taxpayerProfile.mobileNumber}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Email Address</span>
          <strong className="itr-detail-val">
            {taxpayerProfile.emailAddress}
          </strong>
        </div>
        <div className="itr-detail-row">
          <span className="itr-detail-label">Registered Address</span>
          <strong className="itr-detail-val">
            {taxpayerProfile.registeredAddress}
          </strong>
        </div>
      </div>
    </section>
  )
}
