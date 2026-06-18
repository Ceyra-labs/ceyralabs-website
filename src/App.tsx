import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Cta from './components/Cta';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import BentoGrid from './components/BentoGrid';

export default function App() {
  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Services />
        <Stats />
        <Portfolio />
        <Cta />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
