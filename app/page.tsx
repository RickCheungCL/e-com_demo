import { getProducts } from '@/lib/products'
import ProductList from '@/components/ProductList'
import GlobeBanner from '@/components/GlobeBanner'
import SalesWorld from '@/components/ForSales'
export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-pink1 text-primary2 p-6">
      <GlobeBanner />
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Classic Shop</h1>
      <ProductList products={products} />
    </main>
  )
}
