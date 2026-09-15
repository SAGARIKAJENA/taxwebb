import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAuthStore } from '@store/index'
import { CompleteProfileModal } from '@shared/components'
import './QuickServices.css'

export interface QuickServiceItem {
  id: string
  label: string
  description: string
  to: string
  iconImg: string
}

const QUICK_SERVICE_LIST: QuickServiceItem[] = [
  {
    id: 'incorporation',
    label: 'Incorporation',
    description: 'Company & LLP Registration',
    to: '#quick-services',
    iconImg: '/assets/images/services/icon-incorporation.png',
  },
  {
    id: 'gst',
    label: 'GST',
    description: 'Registration, Filing & Returns',
    to: routePaths.gst.root,
    iconImg: '/assets/images/services/icon-gst.png',
  },
  {
    id: 'itr',
    label: 'ITR',
    description: 'File Returns & TDS Refund',
    to: routePaths.itr.root,
    iconImg: '/assets/images/services/icon-itr.png',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'CMA Data & Project Reports',
    to: '#quick-services',
    iconImg: '/assets/images/services/icon-projects.png',
  },
  {
    id: 'loans',
    label: 'Loans',
    description: 'Business & Personal Credit',
    to: routePaths.loans,
    iconImg: '/assets/images/services/icon-loans.png',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    description: 'Health, Life & Business Cover',
    to: routePaths.insurance,
    iconImg: '/assets/images/services/icon-insurance.png',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Trade License & Compliance',
    to: '#quick-services',
    iconImg: '/assets/images/services/icon-business.png',
  },
  {
    id: 'more',
    label: 'More Services',
    description: 'Explore All 40+ Solutions',
    to: '#quick-services',
    iconImg: '/assets/images/services/icon-more-services.png',
  },
]

export interface QuickServicesProps {
  services?: QuickServiceItem[]
}

export const QuickServices = ({ services = QUICK_SERVICE_LIST }: QuickServicesProps) => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedTargetUrl, setSelectedTargetUrl] = useState<string>('')

  const handleServiceClick = (e: MouseEvent, targetUrl: string) => {
    e.preventDefault()
    if (!user?.isProfileComplete) {
      setSelectedTargetUrl(targetUrl)
      setIsProfileModalOpen(true)
    } else {
      navigate(targetUrl)
    }
  }

  const handleConfirmCompleteProfile = () => {
    setIsProfileModalOpen(false)
    navigate(routePaths.auth.register, {
      state: { returnTo: selectedTargetUrl, mobile: user?.mobile },
    })
  }

  return (
    <section className="quick-services" id="quick-services">
      {/* Section Header */}
      <div className="quick-services__header">
        <div className="quick-services__header-left">
          <h2 className="quick-services__title">Services</h2>
          <p className="quick-services__subtitle">Select a service to get started immediately</p>
        </div>
      </div>

      {/* 8 Centered Cards Grid */}
      <div className="quick-services__grid">
        {services.map((service) => (
          <a
            className="quick-service"
            key={service.id}
            href={service.to}
            onClick={(e) => handleServiceClick(e, service.to)}
          >
            <div className="quick-service__icon-wrap">
              <img
                src={service.iconImg}
                alt={`${service.label} icon`}
                className="quick-service__icon-img"
                loading="eager"
              />
            </div>

            <h3 className="quick-service__label">{service.label}</h3>
          </a>
        ))}
      </div>

      {/* Profile Completion Intercept Modal */}
      <CompleteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onCompleteProfile={handleConfirmCompleteProfile}
      />
    </section>
  )
}

export default QuickServices



