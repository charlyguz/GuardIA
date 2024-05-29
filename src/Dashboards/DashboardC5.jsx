import { useState, useEffect } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import {
  VideoCameraIcon,
  MegaphoneIcon,
  CameraIcon,
  CpuChipIcon,
} from '@heroicons/react/24/solid';
import Camera from './Camera';
import { Button, Modal, notification } from 'antd';

export const DashboardC5 = () => {
  const [selected, setSelected] = useState(null);
  const [danger_prob, setDanger_prob] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelection = (option) => {
    if (option === 'SOS') showModal();
    setSelected(option);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNotification = (probability) => {
    setDanger_prob(probability);

    if (probability >= 30 && probability <= 60) {
      notification.info({
        message: 'Posible Situación Detectada',
        description: `La probabilidad de que algo esté ocurriendo es del ${probability}%. Debería dar un vistazo.`,
        style: {
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
        },
      });
    } else if (probability >= 61 && probability <= 80) {
      notification.warning({
        message: 'Probable Amenaza Detectada',
        description: `La probabilidad de una posible amenaza es del ${probability}%. Es posible que alguien necesite ayuda, Debería estar atento a la situación.`,
        style: {
          backgroundColor: '#FFEB3B',
        },
      });
    } else if (probability >= 81 && probability <= 99) {
      notification.error({
        message: 'Situación de Peligro Detectada',
        description: `La probabilidad de una situación de peligro es del ${probability}%. Actúe inmediatamente.`,
        style: {
          backgroundColor: '#FF0000',
          color: '#FFFFFF',
        },
      });
      showModal();
    }
  };

  const fetchProbability = async (formData) => {
    try {
      const response = await fetch('http://localhost:5001/probability', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const probabilities = data.probabilities;
      if (probabilities.length > 0) {
        const highestProbability = Math.max(...probabilities);
        handleNotification(highestProbability);
      }
    } catch (error) {
      console.error('Error fetching probability:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/5 min-h-screen bg-opacity-100 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <nav className="relative z-10 px-4 mt-6 sticky top-0">
          <h2 className="text-4xl font-extrabold text-white my-2 h-28">GuardIA C5</h2>
          <ul className="space-y-4 text-2xl">
            <li
              className={`flex items-center space-x-3 cursor-pointer ${
                selected === 'Cámaras' ? 'bg-white text-black rounded-lg' : 'text-white'
              }`}
              onClick={() => handleSelection('Cámaras')}
            >
              <CameraIcon
                className={`h-10 w-10 ${selected === 'Cámaras' ? 'text-black' : 'text-white'}`}
              />
              <span>Cámaras</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${
                selected === 'Eje Lazaro Cardenas - Venus'
                  ? 'bg-white text-black rounded-lg'
                  : 'text-white'
              }`}
              onClick={() => handleSelection('Eje Lazaro Cardenas - Venus')}
            >
              <span>Eje Lazaro Cardenas - Venus</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${
                selected === 'Juan de Dios Batiz [1]'
                  ? 'bg-white text-black rounded-lg'
                  : 'text-white'
              }`}
              onClick={() => handleSelection('Juan de Dios Batiz [1]')}
            >
              <span>Juan de Dios Batiz [1]</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${
                selected === 'CIC esq. [1]'
                  ? 'bg-white text-black rounded-lg'
                  : 'text-white'
              }`}
              onClick={() => handleSelection('CIC esq. [1]')}
            >
              <span>CIC esq. [1]</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ${
                selected === 'SOS' ? 'bg-white text-black rounded-lg' : 'text-white'
              }`}
              onClick={() => handleSelection('SOS')}
            >
              <MegaphoneIcon
                className={`h-10 w-10 ${selected === 'SOS' ? 'text-black rounded-lg' : 'text-white'}`}
              />
              <span>Alertar Unidades</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ${
                selected === 'Grabaciones' ? 'bg-white text-black rounded-lg' : 'text-white'
              }`}
              onClick={() => handleSelection('Grabaciones')}
            >
              <VideoCameraIcon
                className={`h-10 w-10 ${selected === 'Grabaciones' ? 'text-black rounded-lg' : 'text-white'}`}
              />
              <span>Grabaciones</span>
            </li>
            <li
              className={`flex items-center space-x-3 cursor-pointer ${
                selected === 'IA' ? 'bg-white text-black rounded-lg' : 'text-white'
              }`}
              onClick={() => handleSelection('IA')}
            >
              <CpuChipIcon
                className={`h-10 w-10 ${selected === 'IA' ? 'text-black rounded-lg' : 'text-white'}`}
              />
              <span>IA</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow p-8 min-h-screen">
        <h1 className="text-2xl font-bold">Dashboard C5</h1>
        <div className="flex-grow p-8">
          <Camera
            label={selected}
            setDanger_prob={setDanger_prob}
            onDetection={(probabilities) => {
              if (probabilities.length > 0) {
                const highestProbability = Math.max(...probabilities);
                handleNotification(highestProbability);
              }
            }}
          />
          <div className="space-y-4">
            <Button onClick={() => handleNotification(45)} type="primary">
              Prueba Alerta Verde (45%)
            </Button>
            <Button onClick={() => handleNotification(70)} type="primary">
              Prueba Alerta Amarilla (70%)
            </Button>
            <Button onClick={() => handleNotification(90)} type="primary" danger>
              Prueba Alerta Roja (90%)
            </Button>
          </div>
        </div>
        <Modal
          title="Alertar Unidades"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          footer={[
            <Button key="police" type="primary" onClick={() => alert('Policía alertada!')}>
              Policía
            </Button>,
            <Button key="firefighters" type="primary" onClick={() => alert('Bomberos alertados!')}>
              Bomberos
            </Button>,
            <Button key="paramedics" type="primary" onClick={() => alert('Paramédicos alertados!')}>
              Paramédicos
            </Button>,
          ]}
          styles={{         
            content: {
              background: '#FF0000',
              color: 'white'
            },
            header: {
                background: 'transparent'
              },
              
            }}
          className="rounded-lg w-[700px] bg-red-700 text-white"
        >
          <div className="bg-#FF0000 text-white p-4 rounded-lg text-xl">
            <p>¿Desea alertar a las unidades de emergencia?</p>
            <p>Probabilidad de riesgo: {danger_prob}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardC5;
