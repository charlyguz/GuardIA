import { useState, useRef, useEffect } from 'react';
import { message } from 'antd';

export const MultiCameras = () => {
    const inputVideoRef = useRef(null);
    const processedCanvasRef = useRef(null);
    const startButtonRef = useRef(null);
    const stopButtonRef = useRef(null);

    const serverUrl = 'http://localhost:5000/process';  // URL del servidor Flask

    let stream;
    let requestAnimationFrameId;

    useEffect(() => {
        const startButton = startButtonRef.current;
        const stopButton = stopButtonRef.current;

        if (startButton && stopButton) {
            startButton.addEventListener('click', startVideo);
            stopButton.addEventListener('click', stopVideo);
        }

        return () => {
            if (startButton && stopButton) {
                startButton.removeEventListener('click', startVideo);
                stopButton.removeEventListener('click', stopVideo);
            }
            stopVideo();
        };
    }, []);

    const startVideo = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (inputVideoRef.current) {
                inputVideoRef.current.srcObject = stream;
            }
            if (startButtonRef.current) {
                startButtonRef.current.disabled = true;
            }
            if (stopButtonRef.current) {
                stopButtonRef.current.disabled = false;
            }
            sendFrameToServer();
        } catch (error) {
            message.error('Error accessing webcam: ' + error.message);
        }
    };

    const stopVideo = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (requestAnimationFrameId) {
            cancelAnimationFrame(requestAnimationFrameId);
        }
        if (startButtonRef.current) {
            startButtonRef.current.disabled = false;
        }
        if (stopButtonRef.current) {
            stopButtonRef.current.disabled = true;
        }
    };

    const sendFrameToServer = async () => {
        if (inputVideoRef.current && inputVideoRef.current.readyState === 4) {
            const canvas = document.createElement('canvas');
            canvas.width = inputVideoRef.current.videoWidth;
            canvas.height = inputVideoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(inputVideoRef.current, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL('image/jpeg');
            const blob = await fetch(dataUrl).then(res => res.blob());
            const formData = new FormData();
            formData.append('frame', blob, 'frame.jpg');

            try {
                const response = await fetch(serverUrl, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const processedBlob = await response.blob();
                    displayProcessedFrame(processedBlob);
                } else {
                    message.error('Error processing frame: ' + response.statusText);
                }
            } catch (error) {
                message.error('Error sending frame to server: ' + error.message);
            }
        }

        requestAnimationFrameId = requestAnimationFrame(sendFrameToServer);
    };

    const displayProcessedFrame = (blob) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
            if (processedCanvasRef.current) {
                const processedCanvasContext = processedCanvasRef.current.getContext('2d');
                processedCanvasContext.clearRect(0, 0, processedCanvasRef.current.width, processedCanvasRef.current.height);
                processedCanvasContext.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
            }
        };
        img.src = url;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cámaras</h1>
            <div className="flex flex-col items-center">
                <video ref={inputVideoRef} id="inputVideo" autoPlay className="border-2 border-gray-300 mb-4 rounded-xl"></video>
                <div className="flex space-x-4 mb-4">
                    <button ref={startButtonRef} id="startButton" className="px-4 py-2 bg-blue-500 text-white rounded">Start Video</button>
                    <button ref={stopButtonRef} id="stopButton" className="px-4 py-2 bg-red-500 text-white rounded" disabled>Stop Video</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                    <canvas ref={processedCanvasRef} id="processedCanvas" width="420" height="310" className="border-2 border-gray-300 rounded-xl"></canvas>
                </div>
            </div>
        </div>
    );
};
