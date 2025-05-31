'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

type ScreenSizeContextType = {
  isSmallMobile: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isMediumDesktop: boolean
  fromSmallMobile: boolean
  fromMobile: boolean
  fromTablet: boolean
  fromDesktop: boolean
  fromMediumDesktop: boolean
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(
  undefined,
)

interface ScreenSizeProviderProps {
  children: React.ReactNode
}

const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false)

  const isSmallMobile = useMediaQuery({ maxWidth: 374 })
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 })
  const isMediumDesktop = useMediaQuery({ minWidth: 1440 })

  const fromSmallMobile = useMediaQuery({ minWidth: 0 })
  const fromMobile = useMediaQuery({ minWidth: 375 })
  const fromTablet = useMediaQuery({ minWidth: 768 })
  const fromDesktop = useMediaQuery({ minWidth: 1024 })
  const fromMediumDesktop = useMediaQuery({ minWidth: 1440 })

  const screenSize = {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isMediumDesktop,
    fromSmallMobile,
    fromMobile,
    fromTablet,
    fromDesktop,
    fromMediumDesktop,
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

const useScreenSize = () => {
  const context = useContext(ScreenSizeContext)
  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider')
  }
  return context
}

export { ScreenSizeProvider, useScreenSize }
