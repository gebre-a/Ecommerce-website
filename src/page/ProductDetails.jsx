import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/useCart'

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart, cartItems } = useCart()

  const product = useMemo(() => getProductById(id), [id])

  if (!product) {
    return <Navigate to='/' replace />
  }

  const productInCart = cartItems.find(item => item.id === product.id)
  const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : ''

  return (
    <div className='page'>
      <div className='container'>
        <div className='product-details'>
          <div className='product-detail-image'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className='product-detail-content'>
            <h2 className='product-detail-name'>{product.name}</h2>
            <p className='product-detail-price'>${product.price.toFixed(2)}</p>
            <p className='product-detail-description'>{product.description}</p>
            <button className='btn btn-primary' onClick={() => addToCart(product.id)}>
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
