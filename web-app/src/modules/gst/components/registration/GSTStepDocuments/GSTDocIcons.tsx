import type { FC, ImgHTMLAttributes } from 'react'

type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>

export const PanCardIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'PAN Card', ...props }) => (
  <img src="/assets/icons/gst/pan-card.svg" width={width} height={height} alt={alt} {...props} />
)

export const AadhaarCardIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Aadhaar Card', ...props }) => (
  <img src="/assets/icons/gst/aadhaar-card.svg" width={width} height={height} alt={alt} {...props} />
)

export const BusinessRegIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Business Registration', ...props }) => (
  <img src="/assets/icons/gst/business-reg.svg" width={width} height={height} alt={alt} {...props} />
)

export const AddressProofIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Address Proof', ...props }) => (
  <img src="/assets/icons/gst/address-proof.svg" width={width} height={height} alt={alt} {...props} />
)

export const BankProofIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Bank Proof', ...props }) => (
  <img src="/assets/icons/gst/bank-proof.svg" width={width} height={height} alt={alt} {...props} />
)

export const PhotoIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Photo Proof', ...props }) => (
  <img src="/assets/icons/gst/photo.svg" width={width} height={height} alt={alt} {...props} />
)

export const CameraButtonIcon: FC<IconProps> = ({ width = 17, height = 17, alt = 'Camera', ...props }) => (
  <img src="/assets/icons/gst/camera.svg" width={width} height={height} alt={alt} {...props} />
)

export const CloudUploadIcon: FC<IconProps> = ({ width = 17, height = 17, alt = 'Upload', ...props }) => (
  <img src="/assets/icons/gst/cloud-upload.svg" width={width} height={height} alt={alt} {...props} />
)

export const CheckCircleIcon: FC<IconProps> = ({ width = 14, height = 14, alt = 'Uploaded', ...props }) => (
  <img src="/assets/icons/gst/check-circle.svg" width={width} height={height} alt={alt} {...props} />
)

export const ViewEyeIcon: FC<IconProps> = ({ width = 14, height = 14, alt = 'View', ...props }) => (
  <img src="/assets/icons/gst/view-eye.svg" width={width} height={height} alt={alt} {...props} />
)

export const ReplaceRotateIcon: FC<IconProps> = ({ width = 14, height = 14, alt = 'Replace', ...props }) => (
  <img src="/assets/icons/gst/replace-rotate.svg" width={width} height={height} alt={alt} {...props} />
)

export const DeleteTrashIcon: FC<IconProps> = ({ width = 14, height = 14, alt = 'Delete', ...props }) => (
  <img src="/assets/icons/gst/delete-trash.svg" width={width} height={height} alt={alt} {...props} />
)

export const SecurityShieldIcon: FC<IconProps> = ({ width = 18, height = 18, alt = 'Security', ...props }) => (
  <img src="/assets/icons/gst/security-shield.svg" width={width} height={height} alt={alt} {...props} />
)

export const AlertCircleIcon: FC<IconProps> = ({ width = 18, height = 18, alt = 'Alert', ...props }) => (
  <img src="/assets/icons/gst/alert-circle.svg" width={width} height={height} alt={alt} {...props} />
)

export const DocChecklistIcon: FC<IconProps> = ({ width = 22, height = 22, alt = 'Checklist', ...props }) => (
  <img src="/assets/icons/gst/doc-checklist.svg" width={width} height={height} alt={alt} {...props} />
)

export const DocPlaceholderIcon: FC<IconProps> = ({ width = 48, height = 48, alt = 'Document Placeholder', ...props }) => (
  <img src="/assets/icons/gst/doc-placeholder.svg" width={width} height={height} alt={alt} {...props} />
)
