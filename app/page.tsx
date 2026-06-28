import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import Stats from '@/app/components/Stats';
import Portfolio from '@/app/components/Portfolio';
import Cta from '@/app/components/Cta';
import Footer from '@/app/components/Footer';
import FloatingContact from '@/app/components/FloatingContact';
import BentoGrid from '@/app/components/BentoGrid';

export default function Home() {
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
