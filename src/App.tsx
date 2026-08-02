import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Workflow from '@/components/Workflow';
import Workspace from '@/components/Workspace';
import Statistics from '@/components/Statistics';
import Trust from '@/components/Trust';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-ink antialiased">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <Workspace />
        <Statistics />
        <Trust />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
