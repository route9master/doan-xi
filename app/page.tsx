import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Location from './components/Location';
import Community from './components/Community';
import Units from './components/Units';
import Sales from './components/Sales';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VisitPopup from './components/VisitPopup';

export default function Home() {
  return (
    <main>
      <VisitPopup />
      <Header />
      <Hero />
      <Overview />
      <Location />
      <Units />
      <Community />
      <Sales />
      <Contact />
      <Footer />
    </main>
  );
}
