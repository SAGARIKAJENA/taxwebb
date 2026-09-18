import type {
  SalaryDetails,
  HousePropertyDetails,
  BusinessDetails,
  CapitalGainsDetails,
  OtherSourcesDetails,
} from './ItrStepIncomeSourcesView'
import type { DeductionsData } from './ItrStepRegimeDeductionsView'
import type {
  ItrCategoryId,
  AssessmentYearOption,
  ResidentialStatusOption,
  FilingTypeOption,
  FilingBankAccount,
  PreviousItrInfo,
} from './itrCategories.constants'
import type { UploadedDocInfo } from './ItrStepDocumentsView'

export const DEFAULT_PREVIOUS_ITR: PreviousItrInfo = {
  hasPreviousReturn: false,
  previousAy: '',
  ackNumber: '',
  filingDate: '',
  hasCarryForwardLoss: false,
  lossAmount: '',
}

export const DEFAULT_SALARY_DETAILS: SalaryDetails = {
  employerName: '',
  grossSalary: '',
  exemptAllowances: '',
  tdsDeducted: '',
}

export const DEFAULT_HOUSE_PROPERTY_DETAILS: HousePropertyDetails = {
  propertyType: 'self_occupied',
  homeLoanInterest: '',
  annualRentReceived: '',
  municipalTaxPaid: '',
}

export const DEFAULT_BUSINESS_DETAILS: BusinessDetails = {
  reportingMethod: '44AD',
  grossTurnover: '',
  declaredNetProfit: '',
}

export const DEFAULT_CAPITAL_GAINS_DETAILS: CapitalGainsDetails = {
  assetTypes: [],
  stcg: '',
  ltcg: '',
}

export const DEFAULT_OTHER_SOURCES_DETAILS: OtherSourcesDetails = {
  interestIncome: '',
  dividendIncome: '',
  otherIncome: '',
}

export const DEFAULT_DEDUCTIONS: DeductionsData = {
  epf: '',
  ppf: '',
  lic: '',
  elss: '',
  childrenTuition: '',
  housingLoanPrincipal: '',
  selfInsurance: '',
  parentInsurance: '',
  parentsSeniorCitizen: false,
  homeLoanInterest24b: '',
  otherDeductions: '',
  section80CTotal: '',
  section80C: '',
  section80D: '',
  homeLoanInterest: '',
}

export interface ItrDraftStateParams {
  isStarted: boolean
  currentStep: number
  selectedCategoryId: ItrCategoryId | null
  assessmentYear: AssessmentYearOption
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  bankAccounts: FilingBankAccount[]
  selectedBankId: string
  previousItr: PreviousItrInfo
  selectedSources: string[]
  salaryDetails: SalaryDetails
  housePropertyDetails: HousePropertyDetails
  businessDetails: BusinessDetails
  capitalGainsDetails: CapitalGainsDetails
  otherSourcesDetails: OtherSourcesDetails
  selectedRegime: 'new' | 'old' | ''
  deductions: DeductionsData
  uploadedDocs: Record<string, UploadedDocInfo>
}

export const ITR_STEP_LABELS = [
  'Personal & Filing Info',
  'Income Sources',
  'Regime & Deductions',
  'Document Checklist',
  'Review & File',
]
