import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ShaderBackground from './components/ShaderBackground'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Cotizar from './pages/Cotizar'

export default function App() {
  const location = useLocation()

  // Al cambiar de ruta, subir al inicio (salvo que haya un hash de sección).
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ShaderBackground />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/cotizar" element={<Cotizar />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
