import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'

console.log('📰 BlogPage component loaded')

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

const BlogPage = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Tips Perjalanan Nyaman dengan Bus Jarak Jauh',
      excerpt: 'Panduan lengkap untuk mempersiapkan perjalanan bus jarak jauh agar lebih nyaman dan menyenangkan. Mulai dari packing, makanan, hingga entertainment.',
      author: 'Tim ALS',
      date: '2025-01-15',
      category: 'Tips Perjalanan',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=300&fit=crop',
      readTime: '5 menit'
    },
    {
      id: '2',
      title: 'Destinasi Wisata Terbaik di Rute ALS',
      excerpt: 'Jelajahi tempat-tempat wisata menakjubkan yang bisa Anda kunjungi di sepanjang rute perjalanan ALS, dari Medan hingga Padang.',
      author: 'Travel Guide ALS',
      date: '2025-01-10',
      category: 'Destinasi',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop',
      readTime: '8 menit'
    },
    {
      id: '3',
      title: 'Protokol Kesehatan dan Keselamatan ALS',
      excerpt: 'Komitmen ALS dalam menjaga kesehatan dan keselamatan penumpang dengan protokol yang ketat dan armada yang selalu terawat.',
      author: 'Manajemen ALS',
      date: '2025-01-05',
      category: 'Keselamatan',
      image: 'https://images.unsplash.com/photo-1586379962821-b9ce39a0e4d7?w=600&h=300&fit=crop',
      readTime: '4 menit'
    },
    {
      id: '4',
      title: 'Kuliner Khas Sumatra di Setiap Kota',
      excerpt: 'Panduan kuliner untuk setiap kota yang dilewati ALS. Dari Rendang Padang hingga Bika Ambon, nikmati cita rasa autentik Sumatra.',
      author: 'Food Explorer',
      date: '2025-01-01',
      category: 'Kuliner',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop',
      readTime: '6 menit'
    },
    {
      id: '5',
      title: 'Cara Hemat Berlibur ke Sumatra dengan ALS',
      excerpt: 'Tips dan trik untuk berlibur hemat ke berbagai destinasi di Sumatra menggunakan layanan ALS. Dapatkan pengalaman maksimal dengan budget minimal.',
      author: 'Budget Traveler',
      date: '2024-12-28',
      category: 'Tips Hemat',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=300&fit=crop',
      readTime: '7 menit'
    },
    {
      id: '6',
      title: 'Sejarah dan Budaya Sumatra dalam Perjalanan',
      excerpt: 'Mengenal lebih dalam sejarah dan kekayaan budaya Sumatra yang dapat Anda temui di setiap perjalanan bersama ALS.',
      author: 'Cultural Guide',
      date: '2024-12-25',
      category: 'Budaya',
      image: 'https://images.unsplash.com/photo-1555400081-c421fe2ed7e2?w=600&h=300&fit=crop',
      readTime: '10 menit'
    }
  ]

  const categories = ['Semua', 'Tips Perjalanan', 'Destinasi', 'Keselamatan', 'Kuliner', 'Tips Hemat', 'Budaya']

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tips Perjalanan':
        return 'bg-blue-100 text-blue-800'
      case 'Destinasi':
        return 'bg-green-100 text-green-800'
      case 'Keselamatan':
        return 'bg-red-100 text-red-800'
      case 'Kuliner':
        return 'bg-orange-100 text-orange-800'
      case 'Tips Hemat':
        return 'bg-purple-100 text-purple-800'
      case 'Budaya':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Blog ALS
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tips perjalanan, destinasi wisata, dan informasi terkini seputar layanan transportasi ALS
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className={`w-fit mb-4 ${getCategoryColor(blogPosts[0].category)}`}>
                  {blogPosts[0].category}
                </Badge>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blogPosts[0].date)}</span>
                    </div>
                  </div>
                  <span>{blogPosts[0].readTime} baca</span>
                </div>
                <button className="flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors text-sm">
                    <span>Baca Artikel</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <Card className="mt-16 p-8 text-center gradient-bg text-white">
            <h2 className="text-2xl font-bold mb-4">
              Berlangganan Newsletter ALS
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Dapatkan tips perjalanan terbaru, promo menarik, dan informasi rute baru langsung di email Anda
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Berlangganan
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BlogPage