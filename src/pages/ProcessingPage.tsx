import { useEffect, useState } from 'react'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CheckCircle, MessageCircle, Clock } from 'lucide-react'

console.log('⚙️ ProcessingPage component loaded')

const ProcessingPage = () => {
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('currentBooking')
    if (stored) {
      const data = JSON.parse(stored)
      console.log('📊 Processing booking:', data.bookingId)
      setBookingData(data)
    }
  }, [])

  const handleWhatsAppContact = () => {
    const adminNumber = '+6281818657594'
    const message = bookingData 
      ? `Halo Admin ALS, saya telah melakukan transfer untuk pemesanan tiket:\n\nID Booking: ${bookingData.bookingId}\nRute: ${bookingData.departure} - ${bookingData.destination}\nTanggal: ${new Date(bookingData.date).toLocaleDateString('id-ID')}\nNama: ${bookingData.passenger.name}\nKelas: ${bookingData.className}\nTotal: Rp ${(bookingData.price * bookingData.passengers).toLocaleString('id-ID')}\n\nMohon konfirmasi pembayaran. Terima kasih.`
      : 'Halo Admin ALS, saya ingin konfirmasi pembayaran tiket bus.'
    
    const whatsappUrl = `https://wa.me/${adminNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    console.log('📱 Opening WhatsApp with admin')
    window.open(whatsappUrl, '_blank')
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Tiket Sedang Diproses
            </h1>
            <p className="text-gray-600">
              Terima kasih telah memesan tiket bus ALS
            </p>
          </div>

          {/* Processing Info */}
          <Card className="p-8 mb-8 text-left">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Status Pemesanan</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Data pemesanan diterima</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse-slow"></div>
                <span className="text-yellow-600 font-medium">Menunggu konfirmasi pembayaran</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">Tiket akan dikirim via WhatsApp</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">ID Booking Anda:</h3>
              <p className="text-2xl font-mono font-bold text-blue-600">{bookingData.bookingId}</p>
              <p className="text-sm text-blue-600 mt-2">
                Simpan ID ini untuk referensi pembayaran
              </p>
            </div>
          </Card>

          {/* Contact Admin */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Pembayaran</h2>
            <p className="text-gray-600 mb-6">
              Setelah melakukan transfer, silakan hubungi admin kami untuk konfirmasi pembayaran. 
              Tim kami akan memproses tiket Anda dalam waktu 1-2 jam.
            </p>
            
            <Button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
              size="lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Hubungi Admin via WhatsApp
            </Button>
          </Card>

          {/* Instructions */}
          <Card className="p-6 text-left">
            <h3 className="font-semibold mb-4">Petunjuk Selanjutnya:</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Transfer sesuai total pembayaran ke rekening yang telah diberikan</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Klik tombol "Hubungi Admin" di atas untuk konfirmasi pembayaran</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Admin akan memverifikasi pembayaran dan mengirim e-tiket via WhatsApp</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Tunjukkan e-tiket saat keberangkatan</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProcessingPage