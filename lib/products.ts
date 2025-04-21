// lib/products.ts
import { supabase } from './supabaseClient'

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    console.error('Failed to fetch products:', error.message)
    return []
  }

  return data
}
