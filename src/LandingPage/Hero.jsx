import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/assets/images/gun.png')" }}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white"
      >
        <h1 className="text-4xl font-bold mb-4">GuardIA: IA para la Seguridad</h1>
        <p className="mb-8 text-xl">Detectando anomalías de seguridad y reportando incidentes automáticamente</p>
        <a href="#about" className="bg-blue-500 py-2 px-4 rounded-full text-white">Más Información</a>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 w-full max-w-4xl"
      >
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe 
            className="absolute top-0 left-0 w-full h-full" 
            src="https://www.youtube.com/embed/7zBNfzcnTxc" 
            title="GuardIA Project Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
