// Vercel Serverless Function untuk Telegram Bot Webhook
import { createHash, createHmac } from 'crypto'
import fs from 'fs'
import path from 'path'

// Konfigurasi Bot
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ADMIN_IDS = process.env.ADMIN_TELEGRAM_IDS?.split(',') || []

// Database sederhana menggunakan JSON files
const DATA_DIR = '/tmp'

// Fungsi helper untuk database
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

// Fungsi untuk mengirim pesan ke Telegram
const sendMessage = async (chatId, text, options = {}) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        ...options
      })
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending message:', error)
    return null
  }
}

// Handler untuk berbagai command
const handleCommands = async (message) => {
  const { chat: { id: chatId }, from: { id: userId }, text } = message
  
  // Check if user is admin
  if (!ADMIN_IDS.includes(userId.toString())) {
    await sendMessage(chatId, '❌ Anda tidak memiliki akses admin!')
    return
  }

  const [command, ...args] = text.split(' ')
  
  console.log(`Admin ${userId} executing command:`, command, args)

  switch (command) {
    case '/start':
      await sendMessage(chatId, `
🚌 <b>ALS Admin Bot</b>

Selamat datang di sistem admin ALS!
Berikut command yang tersedia:

<b>📍 Manajemen Rute:</b>
/addrute [asal] [tujuan] - Tambah rute baru
/delrute [asal] [tujuan] - Hapus rute
/listrutes - Lihat semua rute

<b>💰 Manajemen Harga:</b>
/setprice [asal] [tujuan] [kelas] [harga] - Set harga tiket
/listprices - Lihat semua harga

<b>🎯 Manajemen Fasilitas:</b>
/setfacility [asal] [tujuan] [kelas] [fasilitas] - Set fasilitas
/listfacilities - Lihat semua fasilitas

<b>⏰ Manajemen Jadwal:</b>
/setschedule [asal] [tujuan] [waktu] [durasi] - Set jadwal
/listschedules - Lihat jadwal

<b>🏦 Pengaturan:</b>
/setbank [bank] [nomor] [nama] - Set rekening bank
/setwa [nomor] - Set WhatsApp admin
/getsettings - Lihat pengaturan

<b>📋 Pemesanan:</b>
/listorders - Lihat pemesanan terbaru
/updatestatus [id] [status] - Update status pesanan
      `)
      break

    case '/addrute':
      if (args.length < 2) {
        await sendMessage(chatId, '❌ Format: /addrute [asal] [tujuan]')
        return
      }
      
      const [origin, destination] = args
      const routes = readData('routes')
      const routeExists = routes.find(r => 
        r.origin.toLowerCase() === origin.toLowerCase() && 
        r.destination.toLowerCase() === destination.toLowerCase()
      )
      
      if (routeExists) {
        await sendMessage(chatId, `❌ Rute ${origin} → ${destination} sudah ada!`)
        return
      }
      
      routes.push({
        id: Date.now().toString(),
        origin: origin,
        destination: destination,
        createdAt: new Date().toISOString()
      })
      
      if (writeData('routes', routes)) {
        await sendMessage(chatId, `✅ Rute ${origin} → ${destination} berhasil ditambahkan!`)
      } else {
        await sendMessage(chatId, '❌ Gagal menyimpan rute!')
      }
      break

    case '/delrute':
      if (args.length < 2) {
        await sendMessage(chatId, '❌ Format: /delrute [asal] [tujuan]')
        return
      }
      
      const [delOrigin, delDestination] = args
      let routes2 = readData('routes')
      const beforeLength = routes2.length
      
      routes2 = routes2.filter(r => 
        !(r.origin.toLowerCase() === delOrigin.toLowerCase() && 
          r.destination.toLowerCase() === delDestination.toLowerCase())
      )
      
      if (routes2.length < beforeLength) {
        if (writeData('routes', routes2)) {
          await sendMessage(chatId, `✅ Rute ${delOrigin} → ${delDestination} berhasil dihapus!`)
        } else {
          await sendMessage(chatId, '❌ Gagal menghapus rute!')
        }
      } else {
        await sendMessage(chatId, `❌ Rute ${delOrigin} → ${delDestination} tidak ditemukan!`)
      }
      break

    case '/listrutes':
      const allRoutes = readData('routes')
      if (allRoutes.length === 0) {
        await sendMessage(chatId, '📍 Belum ada rute yang terdaftar.')
        return
      }
      
      let routesList = '<b>📍 Daftar Rute ALS:</b>\n\n'
      allRoutes.forEach((route, index) => {
        routesList += `${index + 1}. ${route.origin} → ${route.destination}\n`
      })
      
      await sendMessage(chatId, routesList)
      break

    case '/setprice':
      if (args.length < 4) {
        await sendMessage(chatId, '❌ Format: /setprice [asal] [tujuan] [kelas] [harga]')
        return
      }
      
      const [priceOrigin, priceDestination, ticketClass, price] = args
      const prices = readData('prices')
      
      const existingPriceIndex = prices.findIndex(p => 
        p.origin.toLowerCase() === priceOrigin.toLowerCase() && 
        p.destination.toLowerCase() === priceDestination.toLowerCase() &&
        p.class.toLowerCase() === ticketClass.toLowerCase()
      )
      
      const priceData = {
        origin: priceOrigin,
        destination: priceDestination,
        class: ticketClass,
        price: parseInt(price),
        updatedAt: new Date().toISOString()
      }
      
      if (existingPriceIndex >= 0) {
        prices[existingPriceIndex] = priceData
      } else {
        priceData.id = Date.now().toString()
        prices.push(priceData)
      }
      
      if (writeData('prices', prices)) {
        await sendMessage(chatId, `✅ Harga ${priceOrigin} → ${priceDestination} kelas ${ticketClass}: Rp ${parseInt(price).toLocaleString('id-ID')}`)
      } else {
        await sendMessage(chatId, '❌ Gagal menyimpan harga!')
      }
      break

    case '/setfacility':
      if (args.length < 4) {
        await sendMessage(chatId, '❌ Format: /setfacility [asal] [tujuan] [kelas] "fasilitas"')
        return
      }
      
      const facilityOrigin = args[0]
      const facilityDestination = args[1]
      const facilityClass = args[2]
      const facilityList = args.slice(3).join(' ').replace(/"/g, '')
      
      const facilities = readData('facilities')
      
      const existingFacilityIndex = facilities.findIndex(f => 
        f.origin.toLowerCase() === facilityOrigin.toLowerCase() && 
        f.destination.toLowerCase() === facilityDestination.toLowerCase() &&
        f.class.toLowerCase() === facilityClass.toLowerCase()
      )
      
      const facilityData = {
        origin: facilityOrigin,
        destination: facilityDestination,
        class: facilityClass,
        facilities: facilityList.split(',').map(f => f.trim()),
        updatedAt: new Date().toISOString()
      }
      
      if (existingFacilityIndex >= 0) {
        facilities[existingFacilityIndex] = facilityData
      } else {
        facilityData.id = Date.now().toString()
        facilities.push(facilityData)
      }
      
      if (writeData('facilities', facilities)) {
        await sendMessage(chatId, `✅ Fasilitas ${facilityOrigin} → ${facilityDestination} kelas ${facilityClass}: ${facilityList}`)
      } else {
        await sendMessage(chatId, '❌ Gagal menyimpan fasilitas!')
      }
      break

    case '/setbank':
      if (args.length < 3) {
        await sendMessage(chatId, '❌ Format: /setbank [bank] [nomor] [nama]')
        return
      }
      
      const bankName = args[0]
      const accountNumber = args[1]
      const accountName = args.slice(2).join(' ').replace(/"/g, '')
      
      const settings = readData('settings')[0] || {}
      settings.bank = {
        name: bankName,
        account: accountNumber,
        holder: accountName,
        updatedAt: new Date().toISOString()
      }
      
      if (writeData('settings', [settings])) {
        await sendMessage(chatId, `✅ Bank diperbarui:\n${bankName}\n${accountNumber}\nA.n ${accountName}`)
      } else {
        await sendMessage(chatId, '❌ Gagal menyimpan pengaturan bank!')
      }
      break

    case '/setwa':
      if (args.length < 1) {
        await sendMessage(chatId, '❌ Format: /setwa [nomor]')
        return
      }
      
      const whatsappNumber = args[0]
      const settings2 = readData('settings')[0] || {}
      settings2.whatsapp = {
        number: whatsappNumber,
        updatedAt: new Date().toISOString()
      }
      
      if (writeData('settings', [settings2])) {
        await sendMessage(chatId, `✅ WhatsApp admin diperbarui: ${whatsappNumber}`)
      } else {
        await sendMessage(chatId, '❌ Gagal menyimpan nomor WhatsApp!')
      }
      break

    case '/listorders':
      const orders = readData('orders')
      if (orders.length === 0) {
        await sendMessage(chatId, '📋 Belum ada pemesanan.')
        return
      }
      
      let ordersList = '<b>📋 Pemesanan Terbaru (10 terakhir):</b>\n\n'
      const recentOrders = orders.slice(-10).reverse()
      
      recentOrders.forEach(order => {
        const status = order.status === 'pending' ? '⏳ Pending' : 
                     order.status === 'confirmed' ? '✅ Confirmed' : '❌ Cancelled'
        ordersList += `<b>ID:</b> ${order.id}\n`
        ordersList += `<b>Status:</b> ${status}\n`
        ordersList += `<b>Rute:</b> ${order.departure} → ${order.destination}\n`
        ordersList += `<b>Penumpang:</b> ${order.passenger.name}\n`
        ordersList += `<b>WA:</b> ${order.passenger.whatsapp}\n`
        ordersList += `<b>Total:</b> Rp ${order.price.toLocaleString('id-ID')}\n`
        ordersList += '─────────────────\n'
      })
      
      await sendMessage(chatId, ordersList)
      break

    case '/updatestatus':
      if (args.length < 2) {
        await sendMessage(chatId, '❌ Format: /updatestatus [id] [status]\nStatus: pending/confirmed/cancelled')
        return
      }
      
      const [orderId, newStatus] = args
      const orders2 = readData('orders')
      const orderIndex = orders2.findIndex(o => o.id === orderId)
      
      if (orderIndex === -1) {
        await sendMessage(chatId, `❌ Pesanan dengan ID ${orderId} tidak ditemukan!`)
        return
      }
      
      if (!['pending', 'confirmed', 'cancelled'].includes(newStatus)) {
        await sendMessage(chatId, '❌ Status harus: pending, confirmed, atau cancelled')
        return
      }
      
      orders2[orderIndex].status = newStatus
      orders2[orderIndex].updatedAt = new Date().toISOString()
      
      if (writeData('orders', orders2)) {
        const statusText = newStatus === 'pending' ? '⏳ Pending' : 
                          newStatus === 'confirmed' ? '✅ Confirmed' : '❌ Cancelled'
        await sendMessage(chatId, `✅ Status pesanan ${orderId} diubah ke: ${statusText}`)
      } else {
        await sendMessage(chatId, '❌ Gagal mengubah status!')
      }
      break

    case '/getsettings':
      const currentSettings = readData('settings')[0] || {}
      let settingsText = '<b>⚙️ Pengaturan ALS:</b>\n\n'
      
      if (currentSettings.bank) {
        settingsText += `<b>🏦 Bank:</b>\n`
        settingsText += `${currentSettings.bank.name}\n`
        settingsText += `${currentSettings.bank.account}\n`
        settingsText += `A.n ${currentSettings.bank.holder}\n\n`
      }
      
      if (currentSettings.whatsapp) {
        settingsText += `<b>📱 WhatsApp Admin:</b>\n${currentSettings.whatsapp.number}\n\n`
      }
      
      await sendMessage(chatId, settingsText)
      break

    default:
      await sendMessage(chatId, '❓ Command tidak dikenal. Ketik /start untuk melihat daftar command.')
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const update = req.body
    console.log('Telegram webhook received:', JSON.stringify(update, null, 2))

    if (update.message && update.message.text && update.message.text.startsWith('/')) {
      await handleCommands(update.message)
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}