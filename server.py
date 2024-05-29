from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import torch
import io
import cv2
import numpy as np
from PIL import Image
import logging
import os
import pathlib
from pathlib import Path, PureWindowsPath


app = Flask(__name__)
CORS(app)

# Verificar y configurar dispositivo
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Cargar el modelo YOLOv5
pathlib.PosixPath = pathlib.WindowsPath

# Model

# Intentar cargar el modelo personalizado utilizando torch.hub.load
try:
    model = torch.hub.load('ultralytics/yolov5', 'custom' , path='bestfinal.pt' )
    model.to(device)
    print("Modelo cargado exitosamente.")
except Exception as e:
    print(f"Error al cargar el modelo: {e}")


@app.route('/')
def index():
    device_type = 'GPU' if device.type == 'cuda' else 'CPU'
    return f"Servidor YOLOv5 activo y funcionando correctamente. \n Usando : {device_type} el dispositivo es {device}"

@app.route('/process', methods=['POST'])
def process_frame():
    if 'frame' not in request.files:
        return "No frame provided", 400

    file = request.files['frame']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')  # Convertir a RGB para que sea compatible con YOLOv5

    # Verificar el dispositivo en uso antes de la inferencia
    print(f"Running inference on device: {device}")
    
    results = model(img)

    # Convertir resultados a imagen con anotaciones
    img_result = np.squeeze(results.render())

    # Convertir de BGR a RGB
    img_result = cv2.cvtColor(img_result, cv2.COLOR_BGR2RGB)

    # Convertir la imagen de nuevo a jpeg
    _, img_encoded = cv2.imencode('.jpg', img_result)
    return send_file(io.BytesIO(img_encoded.tobytes()), mimetype='image/jpeg')

@app.route('/probability', methods=['POST'])
def probability():
    if 'frame' not in request.files:
        return jsonify({"error": "No frame provided"}), 400

    file = request.files['frame']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')

    results = model(img)
    
    # Clase objetivo a detectar (por ejemplo, 'arma' )
    target_class = 'arma'
    
    detections = results.pandas().xyxy[0]
    high_confidence_detections = detections[(detections['name'] == target_class) & (detections['confidence'] > 0.5)]
    
    response = {
        "target_detected": not high_confidence_detections.empty,
        "probabilities": high_confidence_detections['confidence'].tolist()
    }
    
    return jsonify(response)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    app.run(debug=True, host='0.0.0.0', port=5001)
