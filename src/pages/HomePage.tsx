import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Calendar, MapPin, Users, Clock, Wifi, Coffee, AirVent, Toilet } from 'lucide-react'
import { toast } from 'sonner'

console.log('🏠 HomePage component loaded')

interface BookingForm {
  departure: string
  destination: string
  date: string
  passengers: number
}

interface TicketClass {
  name: string
  price: number
  facilities: string[]
  color: string
}

interface BusSchedule {
  id: string
  time: string
  duration: string
  classes: TicketClass[]
}

const HomePage = () => {
  const navigate = useNavigate()
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    departure: '',
    destination: '',
    date: '',
    passengers: 1
  })
  const [showSchedules, setShowSchedules] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<{
    scheduleId: string
    className: string
    price: number
  } | null>(null)
  const [passengerData, setPassengerData] = useState({
    name: '',
    whatsapp: ''
  })

  // Mock data for routes and schedules
  const routes = [
    'Medan', 'Pekanbaru', 'Padang', 'Jambi', 'Palembang', 'Bengkulu'
  ]

  const mockSchedules: BusSchedule[] = [
    {
      id: 'ALS001',
      time: '13:15',
      duration: '7 jam',
      classes: [
        {
          name: 'Ekonomi',
          price: 350000,
          facilities: ['AC', 'Musik'],
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        },
        {
          name: 'Bisnis',
          price: 450000,
          facilities: ['AC', 'WiFi', 'Snack'],
          color: 'bg-green-100 text-green-800 border-green-200'
        },
        {
          name: 'Executive',
          price: 590000,
          facilities: ['AC', 'WiFi', 'Toilet', 'Makanan'],
          color: 'bg-purple-100 text-purple-800 border-purple-200'
        }
      ]
    },
    {
      id: 'ALS002',
      time: '20:00',
      duration: '7 jam',
      classes: [
        {
          name: 'Ekonomi',
          price: 350000,
          facilities: ['AC', 'Musik'],
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        },
        {
          name: 'Bisnis',
          price: 450000,
          facilities: ['AC', 'WiFi', 'Snack'],
          color: 'bg-green-100 text-green-800 border-green-200'
        },
        {
          name: 'Executive',
          price: 590000,
          facilities: ['AC', 'WiFi', 'Toilet', 'Makanan'],
          color: 'bg-purple-100 text-purple-800 border-purple-200'
        }
      ]
    }
  ]

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'ac':
        return <AirVent className="h-4 w-4" />
      case 'wifi':
        return <Wifi className="h-4 w-4" />
      case 'toilet':
        return <Toilet className="h-4 w-4" />
      case 'snack':
      case 'makanan':
        return <Coffee className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSearch = () => {
    console.log('🔍 Searching tickets with:', bookingForm)
    
    if (!bookingForm.departure || !bookingForm.destination || !bookingForm.date) {
      toast.error('Mohon lengkapi semua field pencarian')
      return
    }

    if (bookingForm.departure === bookingForm.destination) {
      toast.error('Kota keberangkatan dan tujuan tidak boleh sama')
      return
    }

    setShowSchedules(true)
    toast.success(`Menampilkan jadwal ${bookingForm.departure} - ${bookingForm.destination}`)
  }

  const handleTicketSelect = (scheduleId: string, className: string, price: number) => {
    console.log('🎫 Ticket selected:', { scheduleId, className, price })
    setSelectedTicket({ scheduleId, className, price })
    
    // Scroll to passenger form
    setTimeout(() => {
      document.getElementById('passenger-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }, 100)
  }

  const handleBooking = () => {
    console.log('📝 Processing booking with passenger data:', passengerData)
    
    if (!passengerData.name || !passengerData.whatsapp) {
      toast.error('Mohon lengkapi data penumpang')
      return
    }

    if (!selectedTicket) {
      toast.error('Mohon pilih tiket terlebih dahulu')
      return
    }

    // Validate phone number format
    const phoneRegex = /^(\+?62|0)[0-9]{8,13}$/
    if (!phoneRegex.test(passengerData.whatsapp)) {
      toast.error('Format nomor WhatsApp tidak valid')
      return
    }

    // Store booking data in localStorage
    const bookingData = {
      ...bookingForm,
      ...selectedTicket,
      passenger: passengerData,
      bookingId: Date.now().toString()
    }
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData))
    console.log('💾 Booking data stored:', bookingData)
    
    toast.success('Data berhasil disimpan! Mengarahkan ke halaman pembayaran...')
    setTimeout(() => {
      navigate('/payment')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Perjalanan Nyaman
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Antar Lintas Sumatra - Terpercaya Sejak 1990
          </p>
          <div className="flex justify-center space-x-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-full">🚀</div>
              <span>Cepat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-full">⏰</div>
              <span>Tepat Waktu</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-full">💰</div>
              <span>Murah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Cari & Pesan Tiket Bus
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="departure" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Keberangkatan</span>
                </Label>
                <Select value={bookingForm.departure} onValueChange={(value) => 
                  setBookingForm(prev => ({ ...prev, departure: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Tujuan</span>
                </Label>
                <Select value={bookingForm.destination} onValueChange={(value) => 
                  setBookingForm(prev => ({ ...prev, destination: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Tanggal</span>
                </Label>
                <Input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers" className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Penumpang</span>
                </Label>
                <Select value={bookingForm.passengers.toString()} onValueChange={(value) => 
                  setBookingForm(prev => ({ ...prev, passengers: parseInt(value) }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Orang</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
              size="lg"
            >
              🔍 Cari Jadwal Bus
            </Button>
          </Card>
        </div>
      </section>

      {/* Bus Schedules */}
      {showSchedules && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Jadwal Bus {bookingForm.departure} - {bookingForm.destination}
            </h3>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {mockSchedules.map((schedule) => (
                <Card key={schedule.id} className="p-6 bus-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary text-white p-3 rounded-lg">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{schedule.time}</h4>
                        <p className="text-gray-600">Durasi: {schedule.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Kode Bus</p>
                      <p className="font-semibold text-primary">{schedule.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {schedule.classes.map((ticketClass) => (
                      <div 
                        key={ticketClass.name}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTicket?.scheduleId === schedule.id && 
                          selectedTicket?.className === ticketClass.name
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => handleTicketSelect(schedule.id, ticketClass.name, ticketClass.price)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${ticketClass.color}`}>
                            {ticketClass.name}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            Rp {ticketClass.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Fasilitas:</p>
                          <div className="flex flex-wrap gap-2">
                            {ticketClass.facilities.map((facility) => (
                              <div key={facility} className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded">
                                {getFacilityIcon(facility)}
                                <span>{facility}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Passenger Form */}
      {selectedTicket && (
        <section id="passenger-form" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto p-6 md:p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Data Penumpang
              </h3>
              
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Tiket Dipilih:</strong> {selectedTicket.className} - 
                  Rp {selectedTicket.price.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={passengerData.name}
                    onChange={(e) => setPassengerData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="08xxxxxxxxxx atau +62xxxxxxxxxx"
                    value={passengerData.whatsapp}
                    onChange={(e) => setPassengerData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                  <p className="text-xs text-gray-600">
                    Nomor ini akan digunakan untuk konfirmasi pembayaran
                  </p>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg font-semibold"
                  size="lg"
                >
                  📋 Lanjut ke Pembayaran
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage