import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { CheckCircle, Users, MapPin, Award, Clock, Shield } from 'lucide-react'

console.log('📖 AboutPage component loaded')

const AboutPage = () => {
  const achievements = [
    {
      icon: <Users className="h-8 w-8" />,
      number: '2M+',
      label: 'Penumpang Dilayani',
      color: 'text-blue-600'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      number: '25+',
      label: 'Rute Perjalanan',
      color: 'text-green-600'
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: '35+',
      label: 'Tahun Pengalaman',
      color: 'text-purple-600'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      number: '99%',
      label: 'Tingkat Kepuasan',
      color: 'text-orange-600'
    }
  ]

  const services = [
    {
      title: 'Ekonomi',
      price: 'Rp 350.000',
      features: ['AC Standard', 'Musik Entertainment', 'Kursi Semi Reclining', 'Asuransi Perjalanan'],
      color: 'border-blue-200 bg-blue-50'
    },
    {
      title: 'Bisnis',
      price: 'Rp 450.000', 
      features: ['AC Premium', 'WiFi Gratis', 'Kursi Reclining', 'Snack Box', 'Asuransi Perjalanan'],
      color: 'border-green-200 bg-green-50'
    },
    {
      title: 'Executive',
      price: 'Rp 590.000',
      features: ['AC Premium', 'WiFi Gratis', 'Kursi Full Reclining', 'Toilet Dalam Bus', 'Makanan & Minuman', 'Asuransi Perjalanan Plus'],
      color: 'border-purple-200 bg-purple-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="https://cdn-ai.onspace.ai/onspace/project/image/NLwtqMX6dNpEztzbGbr5Sm/ALS-provinsi.jpg" 
            alt="ALS Logo" 
            className="h-24 w-24 rounded-full object-cover mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tentang ALS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Antar Lintas Sumatra - Menghubungkan kota-kota di Sumatra dengan pelayanan terbaik sejak 1990
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 text-center bg-white shadow-lg">
                <div className={`${achievement.color} mb-4 flex justify-center`}>
                  {achievement.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {achievement.number}
                </h3>
                <p className="text-sm text-gray-600">
                  {achievement.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Cerita Kami</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Perjalanan Dimulai Tahun 1990
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    ALS (Antar Lintas Sumatra) didirikan dengan visi sederhana namun mulia: 
                    menghubungkan seluruh kota di Pulau Sumatra dengan layanan transportasi yang 
                    aman, nyaman, dan terjangkau.
                  </p>
                  <p>
                    Berawal dari satu unit bus kecil yang melayani rute Medan-Pekanbaru, 
                    kini ALS telah berkembang menjadi perusahaan transportasi terpercaya 
                    dengan armada modern dan rute yang menjangkau seluruh Sumatra.
                  </p>
                  <p>
                    Komitmen kami adalah memberikan pengalaman perjalanan terbaik bagi 
                    setiap penumpang, dengan mengutamakan keselamatan, kenyamanan, dan 
                    ketepatan waktu.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-6 rounded-lg text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Tepat Waktu</h4>
                  <p className="text-sm text-gray-600">
                    99% perjalanan on-time performance
                  </p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg text-center">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Keamanan</h4>
                  <p className="text-sm text-gray-600">
                    Armada terawat & driver berpengalaman
                  </p>
                </div>
                <div className="bg-orange-100 p-6 rounded-lg text-center">
                  <Users className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Pelayanan</h4>
                  <p className="text-sm text-gray-600">
                    Customer service 24/7
                  </p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg text-center">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Terpercaya</h4>
                  <p className="text-sm text-gray-600">
                    35+ tahun melayani masyarakat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Kelas Layanan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className={`p-6 border-2 ${service.color}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <div className="text-2xl font-bold text-primary mb-4">
                      {service.price}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Per Penumpang
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <Card className="p-8 border-2 border-primary/20">
                <div className="text-center mb-6">
                  <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Visi Kami</h3>
                </div>
                <p className="text-gray-600 text-center leading-relaxed">
                  Menjadi perusahaan transportasi bus terdepan di Sumatra yang memberikan 
                  pelayanan berkualitas tinggi, aman, dan terpercaya untuk menghubungkan 
                  setiap daerah dengan aksesibilitas yang mudah dan harga yang terjangkau.
                </p>
              </Card>

              <Card className="p-8 border-2 border-green-200">
                <div className="text-center mb-6">
                  <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">Misi Kami</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Memberikan layanan transportasi yang aman dan nyaman</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Menjaga ketepatan waktu keberangkatan dan kedatangan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Memberikan harga yang kompetitif dan terjangkau</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Meningkatkan kualitas pelayanan secara berkelanjutan</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap Memulai Perjalanan Bersama ALS?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Bergabunglah dengan jutaan penumpang yang telah mempercayai ALS 
            untuk perjalanan yang aman, nyaman, dan tepat waktu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Pesan Tiket Sekarang
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage