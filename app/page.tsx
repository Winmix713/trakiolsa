'use client'

import { useState } from 'react'
import { MatchSelection } from '@/components/MatchSelection'
import { PredictionResults } from '@/components/PredictionResults'
import { Statistics } from '@/components/Statistics'
import { Dashboard } from '@/components/Dashboard'

export default function Home() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Üdvözöljük a WinMix Predikciós Rendszerben</h1>
      <MatchSelection isPreviewMode={isPreviewMode} />
      <PredictionResults isPreviewMode={isPreviewMode} />
      <Statistics isPreviewMode={isPreviewMode} />
      <Dashboard isPreviewMode={isPreviewMode} />
    </div>
  )
}

