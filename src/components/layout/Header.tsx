import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'

console.log('🔧 Header component loaded')

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Beranda', path: '/' },
    { name: 'Metode Pembayaran', path: '/payment-method' },
    { name: 'Kontak', path: '/contact' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Cek Reservasi', path: '/check-reservation' },
  ]

  const toggleMenu = () => {
    console.log('📱 Mobile menu toggled:', !isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://cdn-ai.onspace.ai/onspace/project/image/NLwtqMX6dNpEztzbGbr5Sm/ALS-provinsi.jpg" 
              alt="ALS Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-als-blue">ALS</span>
              <span className="text-xs text-gray-600 -mt-1">Antar Lintas Sumatra</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header