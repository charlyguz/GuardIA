import React, { useState } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import { VideoCameraIcon, MegaphoneIcon, CameraIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import Camera from './Camera';
import { MultiCameras } from '../components/MultiCameras';
import { Button, Modal } from 'antd';


export const DashboardHome = () => {
  const [selected, setSelected] = useState('Cámaras');

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
          <h2 className="text-4xl font-extrabold text-white my-2 h-28">GuardIA Home</h2>
          <ul className="space-y-4 text-2xl">
          <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Cámaras' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cámaras')}
            > 
              <CameraIcon className={`h-10 w-10 ${selected === 'Cámaras' ? 'text-black' : 'text-white'}`} />
              <span>Cámaras</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Entrada' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Entrada')}
            >
              <span>Entrada</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Patio' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Patio')}
            >
              <span>Patio</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Sala' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Sala')}
            >
              <span>Sala</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Cócina' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cócina')}
            >
              <span>Cócina</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Garaje' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Garaje')}
            >
              <span>Garaje</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'SOS' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('SOS')}
            > 
              <MegaphoneIcon className={`h-10 w-10 ${selected === 'SOS' ? 'text-black rounded-lg' : 'text-white'}`} />
              <span>SOS</span>
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
            selected === 'Cámaras' ? <MultiCameras/> : <Camera label = { selected } />

          }
      </div>
      <Modal
                title={<span className='text-lg font-bold text-white'>SOS</span>}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Si'}
                cancelText='Cancelar'

                styles={{
                  
                  content: {
                    background: 'rgba(182, 43, 43, 0.64)',
                    color: 'white'
                  },

                  header: {
                    background: 'transparent',
                    fontSize: 10
                  },
                  
                }}
      >
      <span  className='text-base font-normal text-white'>¿Esta seguro de alertar a las autoridades?</span>

      </Modal>
      <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
      </div>
    </div>
  );
};

