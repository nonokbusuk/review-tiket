// API endpoint untuk membuat pesanan baru dari website
import fs from 'fs'
import path from 'path'

const DATA_DIR = '/tmp'

const readData = (filename) => {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`)
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    return []
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return []
  }
}

const writeData = (filename, data) => {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    return false
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const orderData = req.body
    
    // Validasi data yang diperlukan
    if (!orderData.departure || !orderData.destination || !orderData.date || 
        !orderData.className || !orderData.price || !orderData.passenger) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      })
    }

    // Generate booking ID
    const bookingId = Date.now().toString()
    
    // Buat order baru
    const newOrder = {
      id: bookingId,
      departure: orderData.departure,
      destination: orderData.destination,
      date: orderData.date,
      passengers: orderData.passengers || 1,
      className: orderData.className,
      price: orderData.price * (orderData.passengers || 1),
      passenger: {
        name: orderData.passenger.name,
        whatsapp: orderData.passenger.whatsapp
      },
      scheduleId: orderData.scheduleId || 'ALS001',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Simpan ke database
    const orders = readData('orders')
    orders.push(newOrder)
    
    if (writeData('orders', orders)) {
      console.log('New order created:', bookingId)
      
      // Kirim notifikasi ke Telegram admin (opsional)
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.ADMIN_TELEGRAM_IDS) {
        const adminIds = process.env.ADMIN_TELEGRAM_IDS.split(',')
        const message = `🆕 <b>Pesanan Baru!</b>\n\n` +
                       `<b>ID:</b> ${bookingId}\n` +
                       `<b>Rute:</b> ${newOrder.departure} → ${newOrder.destination}\n` +
                       `<b>Tanggal:</b> ${new Date(newOrder.date).toLocaleDateString('id-ID')}\n` +
                       `<b>Kelas:</b> ${newOrder.className}\n` +
                       `<b>Penumpang:</b> ${newOrder.passenger.name}\n` +
                       `<b>WhatsApp:</b> ${newOrder.passenger.whatsapp}\n` +
                       `<b>Total:</b> Rp ${newOrder.price.toLocaleString('id-ID')}\n\n` +
                       `Gunakan: /updatestatus ${bookingId} confirmed`

        for (const adminId of adminIds) {
          try {
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: adminId.trim(),
                text: message,
                parse_mode: 'HTML'
              })
            })
          } catch (error) {
            console.error('Error sending Telegram notification:', error)
          }
        }
      }

      return res.status(201).json({ 
        success: true, 
        data: { bookingId, order: newOrder }
      })
    } else {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to save order' 
      })
    }
  } catch (error) {
    console.error('Create order error:', error)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
}