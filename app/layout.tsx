import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { UserProvider } from '@/lib/user-context'
import '@/styles/globals.css'
import { PreviewModeProvider } from '@/contexts/PreviewModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WinMix - Futball Predikciós Rendszer',
  description: 'Professzionális futball predikciós és elemző platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <PreviewModeProvider>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </UserProvider>
        </PreviewModeProvider>
      </body>
    </html>
  )
}

