import Home from './page/Home'  
import Auth from './page/Auth'
import Checkout from './page/Checkout'
import Navbar from './components/Navbar'

import './App.css'
import  AuthContextProvider  from './context/AuthContextProvider'
import { Routes, Route } from 'react-router-dom'
function App() {
 

  return (
  <AuthContextProvider>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
    </AuthContextProvider>
  )
}

export default App
