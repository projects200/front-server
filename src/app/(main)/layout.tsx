'use client'

import { usePwa } from '@/hooks/pwa/usePwa'

import BackToExitHandler from './_components/backToExitHandler'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const isPwa = usePwa()

  return (
    <>
      <div className="container">{children}</div>
      {isPwa && <BackToExitHandler />}
    </>
  )
}
