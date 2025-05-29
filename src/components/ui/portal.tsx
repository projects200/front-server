import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface IPortalProps {
  children: ReactNode
}

function Portal({ children }: IPortalProps) {
  const element =
    typeof window !== 'undefined' && document.getElementById('modal-root')

  return element && children ? ReactDOM.createPortal(children, element) : null
}

export default Portal
