import React from 'react'

type SpacerProps = {
  height: number
}

export default function Spacer({ height }: SpacerProps) {
  const style = {
    height: `${height}px`,
  }
  return <div style={style} />
}
