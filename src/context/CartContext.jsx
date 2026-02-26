import { useState } from 'react'
import { getProductById } from '../data/products'
import CartContext from './cartContextObject'

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(productId) {
    setCartItems(prevCartItems => {
      const existing = prevCartItems.find(item => item.id === productId)

      if (existing) {
        return prevCartItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...prevCartItems, { id: productId, quantity: 1 }]
    })
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map(item => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter(item => item.product)
  }

  function removeFromCart(productId) {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
