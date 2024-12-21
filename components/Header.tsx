'use client'

import Link from 'next/link'
import { useUser } from '../lib/user-context'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bell, Settings, LogOut, User } from 'lucide-react'
import { LoginModal } from './login-modal'
import { useState } from 'react'
import { usePreviewMode } from '../contexts/PreviewModeContext'
import { PreviewMode } from './PreviewMode'

export function Header() {
  const { user, logout } = useUser()
  const { isPreviewMode, setIsPreviewMode } = usePreviewMode()
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <header className="border-b bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">
          WinMix
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Főoldal
          </Link>
          <Link href="/predictions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Predikciók
          </Link>
          <Link href="/statistics" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Statisztikák
          </Link>
          {user && (
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Vezérlőpult
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Beállítások</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Kijelentkezés</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => setShowLoginModal(true)}>
              Bejelentkezés
            </Button>
          )}
        </div>
      </div>
      <PreviewMode isPreviewMode={isPreviewMode} setIsPreviewMode={setIsPreviewMode} />
      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
      />
    </header>
  )
}

