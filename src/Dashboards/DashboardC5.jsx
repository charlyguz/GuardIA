import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/images/bg-c5.jpg';
import { VideoCameraIcon, MegaphoneIcon, CameraIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import Camera from './Camera';
import { MultiCameras } from '../components/MultiCameras';
import { Button, Modal } from 'antd';
import { useFetcher } from 'react-router-dom';


export const DashboardC5 = () => {
  const [selected, setSelected] = useState('Cámaras');

  const [modalesState, setModalesState] = useState(0);

  const [danger_prob, setDanger_prob] = useState(0);

  const url = "/";

  useEffect(() => {
    if(danger_prob > 30 && danger_prob<70)
      setModalesState(1)
    else if(danger_prob > 70)
      setModalesState(2)
    else
      setModalesState(0)

      
      
  }, [danger_prob])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDanger_prob(data.valor);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    const interval = setInterval(fetchData, 500); // Realiza la solicitud cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);
  

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
    <div className="flex">
      <div className="relative w-1/5 h-screen bg-opacity-100 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <nav className="relative z-10 px-4 mt-6">
          <h2 className="text-4xl font-extrabold text-white my-2 h-28">GuardIA C5</h2>
          <ul className="space-y-4 text-2xl">
          <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Cámaras' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cámaras')}
            > 
              <CameraIcon className={`h-10 w-10 ${selected === 'Cámaras' ? 'text-black' : 'text-white'}`} />
              <span>Cámaras</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Eje Lazaro Cardenas - Venus' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Eje Lazaro Cardenas - Venus')}
            >
              <span>Eje Lazaro Cardenas - Venus</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Eje Lazaro Cardenas - Neptuno' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Eje Lazaro Cardenas - Neptuno')}
            >
              <span>Eje Lazaro Cardenas - Neptuno</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Juan de Dios Batiz [1]' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Juan de Dios Batiz [1]')}
            >
              <span>Juan de Dios Batiz [1]</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Juan de Dios Batiz [2]' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Juan de Dios Batiz [2]')}
            >
              <span>Juan de Dios Batiz [2]</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Juan de Dios Batiz [3]' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Juan de Dios Batiz [3]')}
            >
              <span>Juan de Dios Batiz [3]</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'CIC esq. [1]' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('CIC esq. [1]')}
            >
              <span>CIC esq. [1]</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'CIC esq. [2]' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('CIC esq. [2]')}
            >
              <span>CIC esq. [2]</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'SOS' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('SOS')}
            > 
              <MegaphoneIcon className={`h-10 w-10 ${selected === 'SOS' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>Alertar Unidades</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Grabaciones' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Grabaciones')}
            > 
              <VideoCameraIcon className={`h-10 w-10 ${selected === 'Grabaciones' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>Grabaciones</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'IA' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('IA')}
            > 
              <CpuChipIcon className={`h-10 w-10 ${selected === 'IA' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>IA</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Dashboard Home</h1>
        <div className="flex-grow p-8">
          {
            selected === 'Cámaras' ? <MultiCameras/> : <Camera label = { selected } setDanger_prob = {setDanger_prob} />

          }
      </div>
      <Modal
                title={<span className='text-2xl font-bold text-white'>Alertar Unidades</span>}
                visible={isModalVisible}
                onCancel={handleCancel}
                cancelText='Cancelar'
                okText={' '}
                okButtonProps={{
                  hidden: true
                }}
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(182, 43, 43, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <div className="flex flex-col items-center justify-center  ">
        <span className="text-xl font-normal text-white mb-8 ">¿A qué unidad desea alertar?</span>
        <div className="flex space-x-4">
        <Button className="flex flex-col items-center justify-center bg-sky-300">
          <span className="text-xl font-normal text-center">Policía</span>
        </Button>
        <Button className="flex flex-col items-center justify-center bg-red-500">
          <span className="text-xl font-normal text-center text-black">Bomberos</span>
        </Button>
        <Button className="flex flex-col items-center justify-center bg-amber-300">
          <span className="text-xl font-normal text-center">Paramédicos</span>
        </Button>
        </div>
      </div>

      </Modal>
      {/* Modal Alerta */}
      <Modal
                title={<span className='text-2xl font-bold text-white'>Actividad Sopechosa</span>}
                visible={modalesState === 1}
                onOk={handleOk}
                onCancel={() => setModalesState(0)}
                okText={'Revisar'}
                cancelText='Cerrar'
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(212, 191, 35, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <span  className='text-xl font-normal text-white'>Se ha detectado posible actividad sospechosa!</span>

      </Modal>

      <Modal
                title={<span className='text-2xl font-bold text-white'>Alerta de Peligro</span>}
                visible={modalesState === 2}
                onOk={handleOk}
                onCancel={() => setModalesState(0)}
                okText={'Alertar a las unidades!'}
                cancelText='Cerrar'
                centered={true}

                styles={{
                 
                  
                  content: {
                    background: 'rgba(206, 26, 26, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent'
                  },
                  
                }}
      >
      <span  className='text-xl font-normal text-white'>Se ha detectado una situacion de peligro!</span>

      </Modal>
      <Button type="primary" onClick={() => setModalesState(1)}>
                Open Modal
        </Button>
      </div>
    </div>
  );
};

