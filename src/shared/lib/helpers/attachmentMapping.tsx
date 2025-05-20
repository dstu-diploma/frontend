import {
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePptx,
  BsFiletypeTxt,
  BsFiletypeJpg,
  BsFiletypePng,
} from 'react-icons/bs'
import { PiFilePpt } from 'react-icons/pi'

export type MimeType =
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/plain'
  | 'image/jpeg'
  | 'image/png'

export type MimeTypeItem = {
  type: MimeType
  icon: React.ReactNode
}

export const allowedMimeTypes: MimeTypeItem[] = [
  {
    type: 'application/msword',
    icon: <BsFiletypeDoc />,
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    icon: <BsFiletypeDocx />,
  },
  {
    type: 'application/vnd.ms-powerpoint',
    icon: <PiFilePpt />,
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    icon: <BsFiletypePptx />,
  },
  {
    type: 'text/plain',
    icon: <BsFiletypeTxt />,
  },
  {
    type: 'image/jpeg',
    icon: <BsFiletypeJpg />,
  },
  {
    type: 'image/png',
    icon: <BsFiletypePng />,
  },
]

export const isAllowedMimeType = (mimeType: MimeType) => {
  return allowedMimeTypes.map(mime => mime.type).includes(mimeType)
}
