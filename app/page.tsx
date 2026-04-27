import About from "@/components/About"
import Features from "@/components/Features"
import Footer from "@/components/footer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <About />
      <Features />
      <Footer />
    </div>
  )
}

export default Home