import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

console.log('📞 ContactPage component loaded')

const ContactPage = () => {
  const offices = [
    {
      city: 'Medan',
      name: 'Kantor Pusat Medan',
      address: 'Jl. Sisingamangaraja No. 123, Medan, Sumatera Utara 20212',
      phone: '+62 61 8765432',
      hours: '06:00 - 22:00 WIB',
      isMain: true
    },
    {
      city: 'Pekanbaru',
      name: 'Kantor Cabang Pekanbaru',
      address: 'Jl. Sudirman No. 45, Pekanbaru, Riau 28116',
      phone: '+62 761 654321',
      hours: '06:00 - 22:00 WIB',
      isMain: false
    },
    {
      city: 'Padang',
      name: 'Kantor Cabang Padang',
      address: 'Jl. Prof. M Yamin No. 78, Padang, Sumatera Barat 25114',
      phone: '+62 751 123456',
      hours: '06:00 - 22:00 WIB',
      isMain: false
    }
  ]

  const handleWhatsAppContact = () => {
    const message = 'Halo Admin ALS, saya ingin mengetahui informasi lebih lanjut tentang layanan bus ALS.'
    const whatsappUrl = `https://wa.me/6281818657594?text=${encodeURIComponent(message)}`
    console.log('📱 Opening WhatsApp contact')
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tim customer service ALS siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami!
            </p>
          </div>

          {/* Quick Contact */}
          <Card className="p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Hubungi Admin Sekarang</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">WhatsApp Admin</h3>
                <p className="text-gray-600 mb-4">Respon cepat untuk semua pertanyaan Anda</p>
                <Button
                  onClick={handleWhatsAppContact}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Chat via WhatsApp
                </Button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Center</h3>
                <p className="text-gray-600 mb-4">Layanan telepon 24 jam</p>
                <Button
                  onClick={() => window.open('tel:+6281818657594', '_self')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  +62 818-1865-7594
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Jam operasional: 24 jam sehari, 7 hari seminggu
            </p>
          </Card>

          {/* Office Locations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Lokasi Kantor</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <Card key={index} className={`p-6 ${office.isMain ? 'ring-2 ring-primary' : ''}`}>
                  {office.isMain && (
                    <div className="bg-primary text-white text-center py-2 -mx-6 -mt-6 mb-4 rounded-t-lg">
                      <span className="text-sm font-medium">Kantor Pusat</span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">{office.name}</h3>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Telepon</p>
                        <p className="font-medium">{office.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Jam Operasional</p>
                        <p className="font-medium">{office.hours}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(office.address)}`, '_blank')}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    Lihat di Google Maps
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Google Maps */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Peta Lokasi Kantor Pusat</h2>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0394297764797!2d98.67207931475391!3d3.595196997323156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312ff5c8000001%3A0x5292ee8b28b8b1e0!2sMedan%2C%20North%20Sumatra%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1647856789123!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor Pusat ALS Medan"
              ></iframe>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Pertanyaan yang Sering Diajukan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Bagaimana cara memesan tiket?</h3>
                  <p className="text-sm text-gray-600">
                    Anda dapat memesan tiket melalui website ini atau langsung datang ke kantor kami. 
                    Proses pemesanan online sangat mudah dan cepat.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">Berapa lama proses konfirmasi pembayaran?</h3>
                  <p className="text-sm text-gray-600">
                    Setelah transfer, konfirmasi pembayaran biasanya diproses dalam 1-2 jam pada jam kerja. 
                    E-tiket akan dikirim via WhatsApp.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">Apakah bisa refund tiket?</h3>
                  <p className="text-sm text-gray-600">
                    Refund dapat dilakukan maksimal 24 jam sebelum keberangkatan dengan biaya administrasi. 
                    Hubungi customer service untuk proses refund.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Bagaimana jika bus terlambat?</h3>
                  <p className="text-sm text-gray-600">
                    ALS berkomitmen pada ketepatan waktu. Jika terjadi keterlambatan lebih dari 30 menit, 
                    kami akan memberikan kompensasi sesuai ketentuan.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">Apakah ada program loyalitas?</h3>
                  <p className="text-sm text-gray-600">
                    Ya! Setiap 10 perjalanan dengan ALS, Anda akan mendapat diskon 20% untuk perjalanan berikutnya. 
                    Tanyakan detail program loyalitas kepada admin.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">Bagaimana dengan bagasi?</h3>
                  <p className="text-sm text-gray-600">
                    Setiap penumpang berhak membawa bagasi gratis hingga 20kg. 
                    Kelebihan bagasi akan dikenakan biaya tambahan.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactPage