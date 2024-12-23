'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import { TEAMS } from '../lib/constants'

interface MatchSelectionProps {
  onPredictionsGenerated?: (predictions: any[]) => void
  timeLeft: number
}

export function MatchSelection({ onPredictionsGenerated, timeLeft }: MatchSelectionProps) {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePrediction = async () => {
    if (!homeTeam || !awayTeam) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homeTeam,
          awayTeam,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Predikció elkészült",
          description: "A predikció eredményei megtekinthetők a Predikciók oldalon.",
        })
        if (onPredictionsGenerated) {
          onPredictionsGenerated(data)
        }
      } else {
        throw new Error(data.error || 'Hiba történt a predikció során')
      }
    } catch (error) {
      console.error('Error making prediction:', error)
      toast({
        title: "Hiba",
        description: "Nem sikerült elvégezni a predikciót. Kérjük, próbálja újra később.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Mérkőzés kiválasztása</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 items-center">
          <Select value={homeTeam} onValueChange={setHomeTeam}>
            <SelectTrigger>
              <SelectValue placeholder="Hazai csapat" />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map((team) => (
                <SelectItem 
                  key={team.id} 
                  value={team.id}
                  disabled={team.id === awayTeam}
                >
                  <div className="flex items-center">
                    <img src={team.logoUrl} alt={team.name} className="w-6 h-6 mr-2" />
                    {team.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-center text-2xl font-bold">VS</div>

          <Select value={awayTeam} onValueChange={setAwayTeam}>
            <SelectTrigger>
              <SelectValue placeholder="Vendég csapat" />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map((team) => (
                <SelectItem 
                  key={team.id} 
                  value={team.id}
                  disabled={team.id === homeTeam}
                >
                  <div className="flex items-center">
                    <img src={team.logoUrl} alt={team.name} className="w-6 h-6 mr-2" />
                    {team.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full mt-6" 
          onClick={handlePrediction}
          disabled={!homeTeam || !awayTeam || isLoading || timeLeft === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predikció folyamatban...
            </>
          ) : (
            'Predikció futtatása'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

