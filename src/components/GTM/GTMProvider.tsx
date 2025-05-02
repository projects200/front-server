import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

interface GTMProviderProps {
  children: React.ReactNode
}

const GTMProvider = ({ children }: GTMProviderProps) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WWW526DV' })
  }, [])

  return <>{children}</>
}

export default GTMProvider
