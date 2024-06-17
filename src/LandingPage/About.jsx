import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Sobre GuardIA</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-center max-w-2xl mx-auto text-xl">
            En un país donde la seguridad es una preocupación constante, GuardIA surge como una solución innovadora. Este modelo de inteligencia artificial detecta anomalías de seguridad y reporta incidentes automáticamente a las autoridades, garantizando una respuesta inmediata ante situaciones de peligro.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-center max-w-2xl mx-auto mt-4 text-xl">
            El objetivo principal de GuardIA es apoyar a las personas en peligro, solicitando ayuda automáticamente cuando no puedan hacerlo por sí mismas. Detecta anomalías y alerta a los encargados de seguridad sobre incidentes específicos.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-center max-w-2xl mx-auto mt-4 text-xl">
            GuardIA es eficiente en entornos de alta afluencia como grandes ciudades, donde la vigilancia constante es difícil. Enfoca la atención en situaciones clave, asegurando una vigilancia precisa y una respuesta rápida y efectiva.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
