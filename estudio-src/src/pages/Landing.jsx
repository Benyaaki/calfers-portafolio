import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Statement from '../components/Statement'
import Services from '../components/Services'
import Process from '../components/Process'
import ShowReel from '../components/ShowReel'
import LogoReveal from '../components/LogoReveal'
import WhyUs from '../components/WhyUs'
import Contact from '../components/Contact'

export default function Landing() {
  const location = useLocation()

  // Si llegamos desde otra página pidiendo una sección, scrollear tras la transición.
  useEffect(() => {
    const id = location.state?.section
    if (id) {
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 450)
      return () => clearTimeout(t)
    }
  }, [location.state])

  return (
    <PageShell>
      <Hero />
      <Marquee />
      <Statement />
      <Services />
      <Process />
      <ShowReel />
      <LogoReveal />
      <WhyUs />
      <Contact />
    </PageShell>
  )
}
