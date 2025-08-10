import { Card } from '../components/ui/card'
import { CreditCard, Smartphone, Building2, Copy } from 'lucide-react'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'

console.log('💳 PaymentMethodPage component loaded')

const PaymentMethodPage = () => {
  const paymentMethods = [
    {
      id: 'bri',
      name: 'Bank BRI / BRIVA',
      icon: <Building2 className="h-8 w-8" />,
      account: '100451242831953',
      holder: 'Lintas Sumatra',
      color: 'bg-blue-600',
      description: 'Transfer bank paling populer dengan biaya admin rendah'
    }
  ]

  const copyAccountNumber = (number: string, bankName: string) => {
    navigator.clipboard.writeText(number).then(() => {
      toast.success(`Nomor rekening ${bankName} berhasil disalin!`)
      console.log(`📋 ${bankName} account number copied: ${number}`)
    }).catch(() => {
      toast.error('Gagal menyalin nomor rekening')
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Metode Pembayaran
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih metode pembayaran yang mudah dan aman untuk pemesanan tiket bus ALS
            </p>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className={`${method.color} text-white p-4 rounded-lg mb-4 flex items-center justify-center`}>
                  {method.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nomor Rekening</p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="font-mono font-bold text-lg">{method.account}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyAccountNumber(method.account, method.name)}
                        className="p-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Atas Nama</p>
                    <p className="font-semibold">{method.holder}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Instructions */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <span>Cara Pembayaran</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Bank Transfer */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  Transfer Bank
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Login ke mobile banking atau kunjungi ATM terdekat</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Pilih menu transfer ke bank lain</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Masukkan nomor rekening dan nominal sesuai total pemesanan</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Konfirm transfer dan simpan bukti pembayaran</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Hubungi admin via WhatsApp untuk konfirmasi</span>
                  </li>
                </ol>
              </div>

              {/* BRIVA */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  BRIVA (Virtual Account)
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Buka aplikasi BRImo atau kunjungi ATM BRI</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Pilih menu Pembayaran/Transfer</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Pilih Virtual Account/BRIVA</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Masukkan nomor Virtual Account yang diberikan</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Konfirm pembayaran dan simpan bukti transaksi</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Penting untuk Diperhatikan:</h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Transfer harus sesuai dengan total yang tertera di pemesanan</li>
                <li>• Simpan bukti transfer untuk konfirmasi pembayaran</li>
                <li>• Setelah transfer, segera hubungi admin untuk konfirmasi</li>
                <li>• Pembayaran akan diverifikasi dalam waktu 1-2 jam kerja</li>
                <li>• E-tiket akan dikirim via WhatsApp setelah pembayaran dikonfirmasi</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Butuh bantuan dengan pembayaran?
              </p>
              <Button
                onClick={() => window.open('https://wa.me/6281818657594', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Hubungi Admin WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodPage