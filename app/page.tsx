import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Location from './components/Location';
import Community from './components/Community';
import Units from './components/Units';
import Sales from './components/Sales';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Overview />
      <Location />
      <Community />
      <Units />
      <Sales />
      <Contact />
      <Footer />
    </main>
  );
}
