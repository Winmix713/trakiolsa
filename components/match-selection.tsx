'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TEAMS = [
  {
    id: "arsenal",
    name: "London Ágyúk",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    weight: 1.0
  },
  {
    id: "astonvilla",
    name: "Aston Oroszlán",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t7.png"
  },
  {
    id: "brentford",
    name: "Brentford",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t94.png"
  },
  {
    id: "brighton",
    name: "Brighton",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t36.png"
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    weight: 0.9
  },
  {
    id: "palace",
    name: "Crystal Palace",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t31.png"
  },
  {
    id: "everton",
    name: "Everton",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t11.png"
  },
  {
    id: "fulham",
    name: "Fulham",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t54.png"
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t14.png",
    weight: 0.9
  },
  {
    id: "mancity",
    name: "Manchester Kék",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    weight: 0.8
  },
  {
    id: "newcastle",
    name: "Newcastle",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t4.png"
  },
  {
    id: "nottingham",
    name: "Nottingham",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t17.png"
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    weight: 1.1
  },
  {
    id: "manutd",
    name: "Vörös Ördögök",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    weight: 0.9
  },
  {
    id: "westham",
    name: "West Ham",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t21.png"
  },
  {
    id: "wolves",
    name: "Wolverhampton",
    logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t39.png"
  }
].sort((a, b) => a.name.localeCompare(b.name));

export function MatchSelection() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')

  const handlePrediction = async () => {
    if (!homeTeam || !awayTeam) {
      return
    }

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
      // Handle prediction results
    } catch (error) {
      console.error('Error making prediction:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mérkőzés kiválasztása</CardTitle>
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
          className="w-full mt-4" 
          onClick={handlePrediction}
          disabled={!homeTeam || !awayTeam}
        >
          Predikció futtatása
        </Button>
      </CardContent>
    </Card>
  )
}

