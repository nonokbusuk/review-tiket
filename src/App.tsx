import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import PaymentMethodPage from './pages/PaymentMethodPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CheckReservationPage from './pages/CheckReservationPage'
import PaymentPage from './pages/PaymentPage'
import ProcessingPage from './pages/ProcessingPage'

console.log('📱 App component loaded')

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/check-reservation" element={<CheckReservationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App