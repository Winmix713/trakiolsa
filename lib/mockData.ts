export const mockPredictions = [
  {
    id: '1',
    homeTeam: 'London Ágyúk',
    awayTeam: 'Manchester Kék',
    homeScore: 2,
    awayScore: 1,
    winProbability: 0.55,
    drawProbability: 0.25,
    loseProbability: 0.20,
  },
  {
    id: '2',
    homeTeam: 'Liverpool',
    awayTeam: 'Vörös Ördögök',
    homeScore: 2,
    awayScore: 2,
    winProbability: 0.35,
    drawProbability: 0.40,
    loseProbability: 0.25,
  },
  // További mock predikciók...
]

export const mockStatistics = {
  monthlyPerformance: [
    { month: '2023-01', profit: 100 },
    { month: '2023-02', profit: 150 },
    { month: '2023-03', profit: 80 },
    { month: '2023-04', profit: 200 },
    { month: '2023-05', profit: 180 },
    { month: '2023-06', profit: 220 },
  ],
  leaguePerformance: [
    { league: 'Premier League', winRate: 65 },
    { league: 'La Liga', winRate: 58 },
    { league: 'Bundesliga', winRate: 62 },
    { league: 'Serie A', winRate: 55 },
    { league: 'Ligue 1', winRate: 60 },
  ],
}

export const mockWeights = {
  recentForm: 60,
  headToHead: 55,
  homeAdvantage: 45,
  teamStrength: 70,
}

