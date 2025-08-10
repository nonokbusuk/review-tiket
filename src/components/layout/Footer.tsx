import { MapPin, Phone, Instagram, Facebook } from 'lucide-react'

console.log('🦶 Footer component loaded')

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://cdn-ai.onspace.ai/onspace/project/image/NLwtqMX6dNpEztzbGbr5Sm/ALS-provinsi.jpg" 
                alt="ALS Logo" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">ALS</h3>
                <p className="text-gray-400 text-sm">Antar Lintas Sumatra</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-3">Keunggulan Kami</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-als-blue/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">🚀 Cepat</p>
                </div>
                <div className="bg-als-green/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">⏰ Tepat Waktu</p>
                </div>
                <div className="bg-als-orange/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">💰 Murah</p>
                </div>
                <div className="bg-primary/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">🗺️ Antar Lintas Provinsi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Location */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Lokasi Kantor</h4>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm font-medium">Kantor Pusat Medan</p>
                  <p className="text-gray-400 text-sm">Jl. Sisingamangaraja No. 123</p>
                  <p className="text-gray-400 text-sm">Medan, Sumatera Utara 20212</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0394297764797!2d98.67207931475391!3d3.595196997323156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312ff5c8000001%3A0x5292ee8b28b8b1e0!2sMedan%2C%20North%20Sumatra%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1647856789123!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor ALS"
              ></iframe>
            </div>
          </div>

          {/* Links & Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Hubungi Kami</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">WhatsApp Admin</p>
                  <a 
                    href="https://wa.me/6281818657594" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    +62 818-1865-7594
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h5 className="font-medium">Tautan Penting</h5>
              <div className="flex flex-col space-y-2">
                <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Kontak
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium">Media Sosial</h5>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/als_sumatra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg hover:opacity-80 transition-opacity"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com/als.sumatra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-2 rounded-lg hover:opacity-80 transition-opacity"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © Antar Lintas Provinsi 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer