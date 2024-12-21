'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockPredictions } from '@/lib/mockData'

interface Prediction {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  winProbability: number
  drawProbability: number
  loseProbability: number
}

export function PredictionResults({ isPreviewMode }: { isPreviewMode: boolean }) {
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    const fetchPredictions = async () => {
      if (isPreviewMode) {
        setPredictions(mockPredictions)
      } else {
        try {
          const response = await fetch('/api/predictions')
          if (response.ok) {
            const data = await response.json()
            setPredictions(data)
          }
        } catch (error) {
          console.error('Error fetching predictions:', error)
        }
      }
    }

    fetchPredictions()
  }, [isPreviewMode])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Legutóbbi Predikciók</h2>
      {predictions.map((prediction) => (
        <Card key={prediction.id}>
          <CardHeader>
            <CardTitle>{prediction.homeTeam} vs {prediction.awayTeam}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <span>Prediktált eredmény:</span>
              <span className="font-bold">{prediction.homeScore} - {prediction.awayScore}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Győzelem esélye:</span>
                <span>{(prediction.winProbability * 100).toFixed(2)}%</span>
              </div>
              <Progress value={prediction.winProbability * 100} className="h-2" />
              <div className="flex justify-between">
                <span>Döntetlen esélye:</span>
                <span>{(prediction.drawProbability * 100).toFixed(2)}%</span>
              </div>
              <Progress value={prediction.drawProbability * 100} className="h-2" />
              <div className="flex justify-between">
                <span>Vereség esélye:</span>
                <span>{(prediction.loseProbability * 100).toFixed(2)}%</span>
              </div>
              <Progress value={prediction.loseProbability * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

