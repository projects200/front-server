'use client'

import { ReactNode, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: ReactNode
}

function Portal({ children }: Props) {

  const [element, setElement] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
      setElement(modalRoot)
    }
  }, []) 
  if (!element) {
    return null
  }
  return ReactDOM.createPortal(children, element)
}

export default Portal
