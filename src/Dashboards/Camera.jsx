import { useState, useRef, useEffect } from "react";
import { message } from "antd";

const Camera = ({ onDetection }) => {
  const inputVideoRef = useRef(null);
  const processedCanvasRef = useRef(null);
  const startButtonRef = useRef(null);
  const stopButtonRef = useRef(null);

  const serverUrl = "http://localhost:5001/process"; // URL del servidor Flask
  const probabilityUrl = "http://localhost:5001/probability"; // URL del endpoint de probabilidad

  let stream;
  let requestAnimationFrameId;
  let sendingFrame = false;
  let checkProbabilityInterval;

  useEffect(() => {
    startButtonRef.current.addEventListener("click", startVideo);
    stopButtonRef.current.addEventListener("click", stopVideo);

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
      sendFrameToServer();
      checkProbability();
      checkProbabilityInterval = setInterval(checkProbability, 2000); // Checar cada 2 segundos
    } catch (error) {
      message.error("Error accessing webcam: " + error.message);
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    cancelAnimationFrame(requestAnimationFrameId);
    clearInterval(checkProbabilityInterval);
    startButtonRef.current.disabled = false;
    stopButtonRef.current.disabled = true;
  };

  const sendFrameToServer = async () => {
    if (inputVideoRef.current && inputVideoRef.current.readyState === 4) {
      const canvas = document.createElement("canvas");
      canvas.width = inputVideoRef.current.videoWidth;
      canvas.height = inputVideoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(
        inputVideoRef.current,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataUrl = canvas.toDataURL("image/jpeg");
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");

      try {
        const response = await fetch(serverUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const processedBlob = await response.blob();
          displayProcessedFrame(processedBlob);
        } else {
          message.error("Error processing frame: " + response.statusText);
        }
      } catch (error) {
        message.error("Error sending frame to server: " + error.message);
      }
    }

    sendingFrame = false;
    requestAnimationFrameId = requestAnimationFrame(sendFrameToServer);
  };

  const checkProbability = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = inputVideoRef.current.videoWidth;
      canvas.height = inputVideoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(
        inputVideoRef.current,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataUrl = canvas.toDataURL("image/jpeg");
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");

      const response = await fetch(probabilityUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.target_detected) {
          onDetection(result.probabilities);
        }
      } else {
        message.error("Error checking probability: " + response.statusText);
      }
    } catch (error) {}
  };

  const displayProcessedFrame = (blob) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const processedCanvasContext =
        processedCanvasRef.current.getContext("2d");
      processedCanvasContext.clearRect(
        0,
        0,
        processedCanvasRef.current.width,
        processedCanvasRef.current.height
      );
      processedCanvasContext.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cámara</h1>
      <div className="flex flex-col items-center">
        <video
          ref={inputVideoRef}
          id="inputVideo"
          autoPlay
          className="border-2 border-gray-300 mb-4 rounded-xl"
        ></video>
        <div className="flex space-x-4 mb-4">
          <button
            ref={startButtonRef}
            id="startButton"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Video
          </button>
          <button
            ref={stopButtonRef}
            id="stopButton"
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled
          >
            Stop Video
          </button>
        </div>
        <canvas
          ref={processedCanvasRef}
          id="processedCanvas"
          width="640"
          height="480"
          className="border-2 border-gray-300 rounded-xl"
        ></canvas>
      </div>
    </div>
  );
};

export default Camera;
