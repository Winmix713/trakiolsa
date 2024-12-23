export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © 2024 WinMix. Minden jog fenntartva.
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Adatvédelmi irányelvek
            </a>
            <a href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Felhasználási feltételek
            </a>
            <a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Kapcsolat
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

