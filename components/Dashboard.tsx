'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { mockWeights } from '@/lib/mockData'

export function Dashboard({ isPreviewMode }: { isPreviewMode: boolean }) {
  const [weights, setWeights] = useState(isPreviewMode ? mockWeights : {
    recentForm: 50,
    headToHead: 50,
    homeAdvantage: 50,
    teamStrength: 50,
  })
  const { toast } = useToast()

  const handleWeightChange = (name: keyof typeof weights) => (value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [name]: value[0]
    }))
  }

  const handleSave = async () => {
    if (isPreviewMode) {
      toast({
        title: "Preview mód",
        description: "A változtatások nem kerülnek mentésre preview módban.",
      })
      return
    }

    try {
      const response = await fetch('/api/weights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(weights),
      })
      
      if (response.ok) {
        toast({
          title: "Sikeres mentés",
          description: "A predikciós súlyok sikeresen frissítve lettek.",
        })
      } else {
        throw new Error('Failed to save weights')
      }
    } catch (error) {
      console.error('Error saving weights:', error)
      toast({
        title: "Hiba",
        description: "Nem sikerült menteni a súlyokat. Kérjük, próbálja újra később.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Predikciós Súlyok</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Legutóbbi forma</label>
            <Slider
              value={[weights.recentForm]}
              onValueChange={handleWeightChange('recentForm')}
              min={0}
              max={100}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>{weights.recentForm}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Egymás elleni eredmények</label>
            <Slider
              value={[weights.headToHead]}
              onValueChange={handleWeightChange('headToHead')}
              min={0}
              max={100}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>{weights.headToHead}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hazai pálya előny</label>
            <Slider
              value={[weights.homeAdvantage]}
              onValueChange={handleWeightChange('homeAdvantage')}
              min={0}
              max={100}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>{weights.homeAdvantage}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Csapat erőssége</label>
            <Slider
              value={[weights.teamStrength]}
              onValueChange={handleWeightChange('teamStrength')}
              min={0}
              max={100}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>{weights.teamStrength}%</span>
              <span>100%</span>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Súlyok mentése
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

