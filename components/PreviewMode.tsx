'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

interface PreviewModeProps {
  isPreviewMode: boolean
  setIsPreviewMode: (isPreview: boolean) => void
}

export function PreviewMode({ isPreviewMode, setIsPreviewMode }: PreviewModeProps) {
  const { toast } = useToast()

  const handleToggle = (checked: boolean) => {
    setIsPreviewMode(checked)
    toast({
      title: checked ? "Preview mód bekapcsolva" : "Preview mód kikapcsolva",
      description: checked
        ? "Most előnézeti adatokat látsz. A változtatások nem lesznek elmentve."
        : "Visszatértél a normál módba. Minden változtatás élesben történik.",
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="preview-mode"
        checked={isPreviewMode}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="preview-mode">Preview Mód</Label>
    </div>
  )
}

