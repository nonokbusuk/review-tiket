import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Copy, Clock, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

console.log('💳 PaymentPage component loaded')

const PaymentPage = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(60)
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentEnabled, setPaymentEnabled] = useState(false)

  useEffect(() => {
    // Get booking data from localStorage
    const stored = localStorage.getItem('currentBooking')
    if (!stored) {
      toast.error('Data pemesanan tidak ditemukan')
      navigate('/')
      return
    }
    
    const data = JSON.parse(stored)
    console.log('📊 Loaded booking data:', data)
    setBookingData(data)
  }, [navigate])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setPaymentEnabled(true)
      console.log('⏰ Countdown finished, payment enabled')
    }
  }, [countdown])

  const bankAccount = {
    bank: 'BRI / BRIVA',
    number: '100451242831953',
    name: 'Lintas Sumatra'
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankAccount.number).then(() => {
      toast.success('Nomor rekening berhasil disalin!')
      console.log('📋 Account number copied')
    }).catch(() => {
      toast.error('Gagal menyalin nomor rekening')
    })
  }

  const handlePayment = () => {
    if (!paymentEnabled) {
      toast.error('Mohon tunggu hingga countdown selesai')
      return
    }

    console.log('💰 Processing payment for booking:', bookingData?.bookingId)
    toast.success('Mengarahkan ke halaman konfirmasi pembayaran...')
    
    setTimeout(() => {
      navigate('/processing')
    }, 1500)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Pembayaran Tiket
          </h1>

          {/* Booking Summary */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Ringkasan Pemesanan</span>
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rute:</span>
                <span className="font-medium">{bookingData.departure} → {bookingData.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Penumpang:</span>
                <span className="font-medium">{bookingData.passengers} orang</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kelas:</span>
                <span className="font-medium">{bookingData.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nama:</span>
                <span className="font-medium">{bookingData.passenger.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WhatsApp:</span>
                <span className="font-medium">{bookingData.passenger.whatsapp}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">Rp {(bookingData.price * bookingData.passengers).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{bankAccount.bank}</h3>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Transfer Bank
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100 text-sm">Nomor Rekening</p>
                  <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                    <span className="text-xl font-mono font-bold">{bankAccount.number}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyAccountNumber}
                      className="text-white hover:bg-white/20"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Salin
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-blue-100 text-sm">Atas Nama</p>
                  <p className="text-lg font-semibold">{bankAccount.name}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Countdown Timer */}
          <Card className="p-6 mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-gray-700">Tunggu sebelum melanjutkan</span>
            </div>
            
            <div className="countdown-timer inline-block text-2xl mb-4">
              {formatTime(countdown)}
            </div>
            
            <p className="text-sm text-gray-600">
              {countdown > 0 
                ? 'Silakan transfer ke rekening di atas. Tombol akan aktif setelah countdown selesai.'
                : 'Waktu tunggu selesai! Anda dapat melanjutkan proses pembayaran.'
              }
            </p>
          </Card>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={!paymentEnabled}
            className={`w-full py-6 text-lg font-semibold ${
              paymentEnabled 
                ? 'bg-accent hover:bg-accent/90 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            size="lg"
          >
            {paymentEnabled ? '✅ Proses Pembayaran' : '⏳ Menunggu...'}
          </Button>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Setelah transfer, klik tombol di atas untuk konfirmasi pembayaran
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage