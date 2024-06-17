import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Características del Modelo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 text-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Visión Artificial</h3>
              <ul className="list-disc ml-4">
                <li>Detectar armas</li>
                <li>Identificar riñas</li>
                <li>Reconocer situaciones de acoso</li>
                <li>Detectar accidentes, incluyendo señales visuales de sangre y heridas de arma blanca</li>
                <li>Identificar la venta de sustancias prohibidas</li>
                <li>Detectar actos de extorsión</li>
                <li>Reconocer situaciones de corrupción</li>
                <li>Detectar actos de vandalismo</li>
                <li>Detectar choques</li>
                <li>Detectar actos ilegales</li>
              </ul>
            </div>
            <div className="bg-gray-800 text-white text-xl p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4">Audio con Inteligencia Artificial</h3>
              <ul className="list-disc ml-4 ">
                <li>Detectar palabras o frases típicas en asaltos</li>
                <li>Prever el inicio de una riña mediante el análisis de palabras y el tono de las discusiones</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
