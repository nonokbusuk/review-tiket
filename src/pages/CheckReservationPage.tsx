import { useState } from 'react'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Search, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

console.log('🔍 CheckReservationPage component loaded')

interface ReservationStatus {
  id: string
  passenger: string
  route: string
  date: string
  class: string
  price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  whatsapp: string
}

const CheckReservationPage = () => {
  const [bookingId, setBookingId] = useState('')
  const [reservation, setReservation] = useState<ReservationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration
  const mockReservations: ReservationStatus[] = [
    {
      id: '12345678',
      passenger: 'John Doe',
      route: 'Medan → Pekanbaru',
      date: '2025-01-20',
      class: 'Executive',
      price: 590000,
      status: 'confirmed',
      whatsapp: '+62812345678'
    },
    {
      id: '87654321',
      passenger: 'Jane Smith',
      route: 'Pekanbaru → Padang',
      date: '2025-01-22',
      class: 'Bisnis',
      price: 450000,
      status: 'pending',
      whatsapp: '+62887654321'
    }
  ]

  const handleSearch = async () => {
    if (!bookingId.trim()) {
      toast.error('Mohon masukkan ID booking')
      return
    }

    console.log('🔍 Searching for booking ID:', bookingId)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const found = mockReservations.find(r => r.id === bookingId)
      
      if (found) {
        setReservation(found)
        toast.success('Reservasi ditemukan!')
        console.log('✅ Reservation found:', found)
      } else {
        setReservation(null)
        toast.error('ID booking tidak ditemukan')
        console.log('❌ Reservation not found for ID:', bookingId)
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Dikonfirmasi'
      case 'pending':
        return 'Menunggu Konfirmasi'
      case 'cancelled':
        return 'Dibatalkan'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Cek Reservasi
            </h1>
            <p className="text-xl text-gray-600">
              Masukkan ID booking untuk melihat status reservasi Anda
            </p>
          </div>

          {/* Search Form */}
          <Card className="p-8 mb-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bookingId" className="text-lg font-medium">
                  ID Booking
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="bookingId"
                    type="text"
                    placeholder="Contoh: 12345678"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="text-lg py-6"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">💡 Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• ID booking terdiri dari 8 digit angka</li>
                  <li>• ID booking dikirimkan saat melakukan pemesanan</li>
                  <li>• Periksa WhatsApp Anda untuk menemukan ID booking</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Reservation Details */}
          {reservation && (
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                {getStatusIcon(reservation.status)}
                <h2 className="text-2xl font-bold">Detail Reservasi</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">ID Booking:</span>
                  <span className="font-mono font-bold text-lg">{reservation.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Status:</span>
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Nama Penumpang:</span>
                  <span className="font-medium">{reservation.passenger}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Rute:</span>
                  <span className="font-medium">{reservation.route}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Tanggal Keberangkatan:</span>
                  <span className="font-medium">
                    {new Date(reservation.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Kelas:</span>
                  <span className="font-medium">{reservation.class}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">WhatsApp:</span>
                  <span className="font-medium">{reservation.whatsapp}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Total Harga:</span>
                  <span className="text-2xl font-bold text-primary">
                    Rp {reservation.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  onClick={() => window.open(`https://wa.me/6281818657594?text=Halo Admin, saya ingin menanyakan tentang reservasi dengan ID: ${reservation.id}`, '_blank')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  Hubungi Admin
                </Button>
                
                {reservation.status === 'pending' && (
                  <Button
                    variant="outline"
                    className="flex-1 py-3"
                    onClick={() => toast.info('Fitur pembatalan sedang dalam pengembangan')}
                  >
                    Batalkan Reservasi
                  </Button>
                )}
              </div>

              {/* Status Information */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Informasi Status:</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  {reservation.status === 'pending' && (
                    <>
                      <p>• Reservasi Anda sedang menunggu konfirmasi pembayaran</p>
                      <p>• Silakan hubungi admin untuk mempercepat proses verifikasi</p>
                      <p>• E-tiket akan dikirim setelah pembayaran dikonfirmasi</p>
                    </>
                  )}
                  {reservation.status === 'confirmed' && (
                    <>
                      <p>• Pembayaran telah dikonfirmasi</p>
                      <p>• E-tiket telah dikirim ke WhatsApp Anda</p>
                      <p>• Datang 30 menit sebelum keberangkatan</p>
                    </>
                  )}
                  {reservation.status === 'cancelled' && (
                    <>
                      <p>• Reservasi telah dibatalkan</p>
                      <p>• Hubungi admin untuk informasi pengembalian dana</p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Demo IDs */}
          <Card className="p-6 mt-8 bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">🧪 Demo - Coba ID Booking Ini:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {mockReservations.map((res) => (
                <div key={res.id} className="bg-white p-3 rounded border">
                  <div className="font-mono font-bold">{res.id}</div>
                  <div className="text-gray-600">{res.passenger} - {getStatusText(res.status)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckReservationPage