'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, LineChart } from '@/components/ui/chart'
import { mockStatistics } from '@/lib/mockData'

interface StatisticsData {
  monthlyPerformance: {
    month: string
    profit: number
  }[]
  leaguePerformance: {
    league: string
    winRate: number
  }[]
}

export function Statistics({ isPreviewMode }: { isPreviewMode: boolean }) {
  const [data, setData] = useState<StatisticsData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (isPreviewMode) {
        setData(mockStatistics)
      } else {
        try {
          const response = await fetch('/api/statistics')
          const data = await response.json()
          setData(data)
        } catch (error) {
          console.error('Error fetching statistics:', error)
        }
      }
    }

    fetchData()
  }, [isPreviewMode])

  if (!data) {
    return <div>Betöltés...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Statisztikák</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Havi Teljesítmény</TabsTrigger>
            <TabsTrigger value="league">Liga Teljesítmény</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <LineChart
              data={data.monthlyPerformance}
              xField="month"
              yField="profit"
              height={300}
            />
          </TabsContent>
          <TabsContent value="league">
            <BarChart
              data={data.leaguePerformance}
              xField="league"
              yField="winRate"
              height={300}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

