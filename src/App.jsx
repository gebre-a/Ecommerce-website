import Home from './page/Home'  
import Auth from './page/Auth'
import Checkout from './page/Checkout'
import Navbar from './components/Navbar'
import ProductDetails from './page/ProductDetails'
import CartProvider from './context/CartContext'
import './App.css'
import  AuthContextProvider  from './context/AuthContextProvider'
import { Routes, Route } from 'react-router-dom'
function App() {
 

  return (
  <AuthContextProvider>
    <CartProvider>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/products/:id' element={<ProductDetails />} />
      </Routes>
    </div>
    </CartProvider>
    </AuthContextProvider>
  )
}

export default App
