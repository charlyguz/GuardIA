import { motion } from 'framer-motion';

const UseCases = () => {
  return (
    <section id="usecases" className="py-20 text-xl">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Casos de Uso</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold">Empresas de Alta Peligrosidad</h3>
              <p>
                Empresas transportistas que requieren monitoreo constante de sus vehículos para prevenir robos y accidentes. Empresas de seguridad privada que buscan mejorar sus servicios mediante alertas automáticas y detección de anomalías.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Particulares</h3>
              <p>
                Propietarios de viviendas que desean proteger su hogar y sus alrededores con un sistema de vigilancia avanzado. Usuarios de transporte público y privado que buscan una mayor seguridad durante sus desplazamientos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Gobierno</h3>
              <p>
                Integración con sistemas de vigilancia ya existentes, como el C5 en la Ciudad de México. Implementación de nuevos sistemas en áreas de alta afluencia para mejorar la seguridad pública. Detección automática de choques, delitos, y situaciones de emergencia, permitiendo una respuesta más rápida y efectiva.
              </p>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
