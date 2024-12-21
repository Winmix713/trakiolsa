'use client'

import React, { createContext, useContext, useState } from 'react'

interface PreviewModeContextType {
  isPreviewMode: boolean
  setIsPreviewMode: (isPreview: boolean) => void
}

const PreviewModeContext = createContext<PreviewModeContextType | undefined>(undefined)

export function PreviewModeProvider({ children }: { children: React.ReactNode }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <PreviewModeContext.Provider value={{ isPreviewMode, setIsPreviewMode }}>
      {children}
    </PreviewModeContext.Provider>
  )
}

export function usePreviewMode() {
  const context = useContext(PreviewModeContext)
  if (context === undefined) {
    throw new Error('usePreviewMode must be used within a PreviewModeProvider')
  }
  return context
}

