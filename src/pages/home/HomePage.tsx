import React from 'react'
import { Link } from 'react-router-dom'

import TagManager from 'react-gtm-module'

const HomePage = () => {
  const handleClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'button_click',
        category: 'Button',
        action: 'Click',
        label: 'gtm test button'
      },
    })
  }

  return (
    <div>
      <h1>운다방 임시 홈페이지 입니다.</h1>
      <Link to="/login" onClick={handleClick}>로그인</Link>
    </div>
  )
}

export default HomePage
