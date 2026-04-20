import { useEffect, useState } from 'react'
import HomeHero from '../../components/home/HomeHero'
import HomeNewsSection from '../../components/home/HomeNewsSection'
import HomeParallax from '../../components/home/HomeParallax'
import HomeRealmGrid from '../../components/home/HomeRealmGrid'
import data from '../../assets/data.json'
import './HomePage.css'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page">
      <HomeParallax scrollY={scrollY} />

      <div className="container relative-content">
        <HomeHero />
        <HomeRealmGrid />
        <HomeNewsSection news={data.news?.slice(0, 3) || []} />
      </div>
    </div>
  )
}

export default HomePage
