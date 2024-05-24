import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

const Dashboard = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');

    const inputVideoRef = useRef(null);
    const outputCanvasRef = useRef(null);
    const processedImageRef = useRef(null);
    const processedCanvasRef = useRef(null);
    const startButtonRef = useRef(null);
    const stopButtonRef = useRef(null);

    const serverUrl = 'http://localhost:5000/process';  // URL del servidor Flask

    let stream;
    let canvasContext;
    let requestAnimationFrameId;
    let sendingFrame = false;

    useEffect(() => {
        canvasContext = outputCanvasRef.current.getContext('2d');

        startButtonRef.current.addEventListener('click', startVideo);
        stopButtonRef.current.addEventListener('click', stopVideo);

        return () => {
            stopVideo();
        };
    }, []);

    const startVideo = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            inputVideoRef.current.srcObject = stream;
            startButtonRef.current.disabled = true;
            stopButtonRef.current.disabled = false;
            drawVideoOnCanvas();
        } catch (error) {
            message.error('Error accessing webcam: ' + error.message);
        }
    };

    const stopVideo = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        cancelAnimationFrame(requestAnimationFrameId);
        startButtonRef.current.disabled = false;
        stopButtonRef.current.disabled = true;
    };

    const drawVideoOnCanvas = () => {
        canvasContext.drawImage(inputVideoRef.current, 0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height);
        if (!sendingFrame) {
            sendingFrame = true;
            sendFrameToServer(outputCanvasRef.current.toDataURL('image/jpeg'));
        }
        requestAnimationFrameId = requestAnimationFrame(drawVideoOnCanvas);
    };

    const sendFrameToServer = async (dataUrl) => {
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
        sendingFrame = false;
    };

    const displayProcessedFrame = (blob) => {
        const url = URL.createObjectURL(blob);
        processedImageRef.current.src = url;

        const img = new Image();
        img.onload = () => {
            const processedCanvasContext = processedCanvasRef.current.getContext('2d');
            processedCanvasContext.clearRect(0, 0, processedCanvasRef.current.width, processedCanvasRef.current.height);
            processedCanvasContext.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">User: {user}</p>
            <div className="flex flex-col items-center">
                <video ref={inputVideoRef} id="inputVideo" autoPlay className="border-2 border-gray-300"></video>
                <canvas ref={outputCanvasRef} id="outputCanvas" width="640" height="480" className="border-2 border-gray-300 mb-4"></canvas>
                <div className="flex space-x-4 mb-4">
                    <button ref={startButtonRef} id="startButton" className="px-4 py-2 bg-blue-500 text-white rounded">Start Video</button>
                    <button ref={stopButtonRef} id="stopButton" className="px-4 py-2 bg-red-500 text-white rounded" disabled>Stop Video</button>
                </div>
                <img ref={processedImageRef} id="processedImage" alt="Processed Frame" className="hidden" />
                <canvas ref={processedCanvasRef} id="processedCanvas" width="640" height="480" className="border-2 border-gray-300"></canvas>
            </div>
        </div>
    );
};

export default Dashboard;
