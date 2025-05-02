declare module 'react-gtm-module' {
  const TagManager: {
    initialize: (options: { gtmId: string }) => void
    dataLayer: (data: { [key: string]: any }) => void
  }

  export default TagManager
}
