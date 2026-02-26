import { getProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const products = getProducts()

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className='home-title'>Welcome to Shopping Hubs እንኳን ደህና መጡ ደንበኛችን </h1>
        <p className='home-subtitle'>Discover the best deals on electronics, fashion, home essentials, and more. Shop with confidence and enjoy a seamless online shopping experience.</p>
      </div>
      <div className="container">
        <h2 className='page-title'>Our Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
