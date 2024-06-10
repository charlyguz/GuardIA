import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import { VideoCameraIcon, MegaphoneIcon, CameraIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import Camera from './Camera';
import { MultiCameras } from '../components/MultiCameras';
import { Button, Modal, notification } from 'antd';
import { useFetcher } from 'react-router-dom';


export const DashboardC5 = () => {
  const [selected, setSelected] = useState('Cámaras');

  const [modalesState, setModalesState] = useState(0);

  const [danger_prob, setDanger_prob] = useState(0);

  const [dangerState, setdangerState] = useState(0)

  const url = "/";

const showModalDanger = () => {
    setModalesState(dangerState)
}

const handleNotification = (probability) => {
  setDanger_prob(probability);

  if (danger_prob >= 30 && danger_prob <= 60) {
    notification.info({
      message: 'Posible Situación Detectada',
      description: `La probabilidad de que algo esté ocurriendo es del ${probability}%. Debería dar un vistazo.`,
      style: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
      },
    });
  } else if (danger_prob >= 61 && danger_prob <= 70) {
    notification.warning({
      message: 'Probable Amenaza Detectada',
      description: `La probabilidad de una posible amenaza es del ${probability}%. Es posible que alguien necesite ayuda, Debería estar atento a la situación.`,
      style: {
        backgroundColor: '#FFEB3B',
      },
    });
  } else if (danger_prob >= 71 && danger_prob <= 99) {
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

  useEffect(() => {
    handleNotification()
  }, [dangerState])
  

  useEffect(() => {
    let interval
    if(dangerState===0){
      if (danger_prob > 30 && danger_prob < 70) {
        setdangerState(1);
      } else if (danger_prob > 70) {
        setdangerState(2);
      } else {
        setdangerState(0);
      }
      console.log(dangerState);
    }
    else
    {
      interval = setInterval(() => {
        console.log(dangerState);
      if (danger_prob > 30 && danger_prob < 50) {
        setdangerState(1)

      } else if (danger_prob > 60) {
        setdangerState(2)
      } else {
        setdangerState(0);
      }
    }, 1200);
  } // 5000 ms = 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [danger_prob]);
  

  

  const handleSelection = (option) => {
    if(option === "SOS")
      showModal()

    console.log(option)
    setSelected(option);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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

