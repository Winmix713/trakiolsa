'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchApi } from '@/lib/api'
import { useUser } from '@/contexts/UserContext'
import PredictionResults from './PredictionResults'

export default function Favorites() {
  const { user } = useUser()
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await fetchApi('/api/favorites')
          if (response.ok) {
            const data = await response.json()
            setFavorites(data)
          } else {
            throw new Error('Failed to fetch favorites')
          }
        } catch (error) {
          console.error('Error fetching favorites:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        const storedFavorites = localStorage.getItem('favoritePredictions')
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  const toggleFavorite = async (predictionId: string) => {
    try {
      if (user) {
        const response = await fetchApi('/api/favorites/toggle', {
          method: 'POST',
          body: JSON.stringify({ predictionId }),
        })
        if (!response.ok) {
          throw new Error('Failed to toggle favorite')
        }
      }
      setFavorites(prev => 
        prev.filter(fav => fav.id !== predictionId)
      )
      const storedFavorites = JSON.parse(localStorage.getItem('favoritePredictions') || '[]')
      const updatedFavorites = storedFavorites.filter(fav => fav.id !== predictionId)
      localStorage.setItem('favoritePredictions', JSON.stringify(updatedFavorites))
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCFF00]"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-[#CCFF00]">Kedvencek</h2>
      {favorites.length > 0 ? (
        <PredictionResults predictions={favorites} onToggleFavorite={toggleFavorite} />
      ) : (
        <p className="text-center text-gray-400">Nincsenek kedvenc predikciók.</p>
      )}
    </motion.div>
  )
}

