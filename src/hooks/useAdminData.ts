import { useQuery, useQueryClient } from '@tanstack/react-query'

console.log('🔧 useAdminData hook loaded')

interface AdminData {
  routes: Array<{
    id: string
    origin: string
    destination: string
    createdAt: string
  }>
  prices: Array<{
    id: string
    origin: string
    destination: string
    class: string
    price: number
    updatedAt: string
  }>
  facilities: Array<{
    id: string
    origin: string
    destination: string
    class: string
    facilities: string[]
    updatedAt: string
  }>
  schedules: Array<{
    id: string
    origin: string
    destination: string
    time: string
    duration: string
    updatedAt: string
  }>
  settings: {
    bank?: {
      name: string
      account: string
      holder: string
      updatedAt: string
    }
    whatsapp?: {
      number: string
      updatedAt: string
    }
  }
  orders: Array<{
    id: string
    departure: string
    destination: string
    date: string
    className: string
    price: number
    passenger: {
      name: string
      whatsapp: string
    }
    status: 'pending' | 'confirmed' | 'cancelled'
    createdAt: string
    updatedAt: string
  }>
}

const API_BASE_URL = '/api/admin-data'

export const useAdminData = (type: string = 'all') => {
  return useQuery({
    queryKey: ['adminData', type],
    queryFn: async (): Promise<AdminData | any> => {
      console.log(`📡 Fetching admin data: ${type}`)
      
      const response = await fetch(`${API_BASE_URL}?type=${type}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} data`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data')
      }
      
      console.log(`✅ Admin data ${type} loaded:`, result.data)
      return result.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  const createOrder = async (orderData: any) => {
    console.log('📝 Creating order:', orderData)
    
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create order')
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create order')
    }

    console.log('✅ Order created:', result.data.bookingId)
    
    // Invalidate and refetch orders
    queryClient.invalidateQueries({ queryKey: ['adminData', 'orders'] })
    queryClient.invalidateQueries({ queryKey: ['adminData', 'all'] })
    
    return result.data
  }

  return { createOrder }
}