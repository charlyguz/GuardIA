import Header from './Header';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import UseCases from './UseCases';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <UseCases />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
