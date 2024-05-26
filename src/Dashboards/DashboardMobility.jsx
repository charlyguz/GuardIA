import React, { useState } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import { VideoCameraIcon, MegaphoneIcon, CameraIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import Camera from './Camera';

const DashboardMobility = () => {
  const [selected, setSelected] = useState(null);

  const handleSelection = (option) => {
    setSelected(option);
  };

  return (
    <div className="flex">
      <div className="relative w-1/5 h-screen bg-opacity-100 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <nav className="relative z-10 px-4 mt-6">
          <h2 className="text-4xl font-extrabold text-white my-2 h-28">GuardIA Mobility</h2>
          <ul className="space-y-4 text-2xl">
          <li 
              className={`flex items-center space-x-3 cursor-pointer ${selected === 'Cámaras' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Cámaras')}
            > 
              <CameraIcon className={`h-10 w-10 ${selected === 'Cámaras' ? 'text-black' : 'text-white'}`} />
              <span>Cámaras</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Puerta Frente' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Puerta Frente')}
            >
              <span>Puerta Frente</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Puerta Trasera' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Puerta Trasera')}
            >
              <span>Puerta Trasera</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Frontal' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Frontal')}
            >
              <span>Frontal</span>
            </li>
            <li 
              className={`flex items-center space-x-3 cursor-pointer ml-10 ${selected === 'Pasillo' ? 'bg-white text-black rounded-lg' : 'text-white'}`} 
              onClick={() => handleSelection('Pasillo')}
            >
              <span>Pasillo</span>
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
        <h1 className="text-2xl font-bold">Dashboard Mobility</h1>
        <div className="flex-grow p-8">
         <Camera />
      </div>
      </div>
    </div>
  );
};

export default DashboardMobility;
