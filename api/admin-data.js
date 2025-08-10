// API endpoint untuk mendapatkan data admin (routes, prices, etc)
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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { type } = req.query

    switch (type) {
      case 'routes':
        const routes = readData('routes')
        return res.status(200).json({ success: true, data: routes })

      case 'prices':
        const prices = readData('prices')
        return res.status(200).json({ success: true, data: prices })

      case 'facilities':
        const facilities = readData('facilities')
        return res.status(200).json({ success: true, data: facilities })

      case 'schedules':
        const schedules = readData('schedules')
        return res.status(200).json({ success: true, data: schedules })

      case 'settings':
        const settings = readData('settings')[0] || {}
        return res.status(200).json({ success: true, data: settings })

      case 'orders':
        const orders = readData('orders')
        return res.status(200).json({ success: true, data: orders })

      case 'all':
        const allData = {
          routes: readData('routes'),
          prices: readData('prices'),
          facilities: readData('facilities'),
          schedules: readData('schedules'),
          settings: readData('settings')[0] || {},
          orders: readData('orders')
        }
        return res.status(200).json({ success: true, data: allData })

      default:
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid type. Use: routes, prices, facilities, schedules, settings, orders, or all' 
        })
    }
  } catch (error) {
    console.error('API error:', error)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
}