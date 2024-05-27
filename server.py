from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import torch
import io
import cv2
import numpy as np
from PIL import Image
import logging

app = Flask(__name__)
CORS(app)

# Cargar el modelo YOLOv5
model_path = 'yolov5s.pt'  # Ajusta esto si tu archivo .pt está en otro lugar
model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)  # Cargar el modelo YOLOv5

@app.route('/')
def index():
    return "Servidor YOLOv5 activo y funcionando correctamente."

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'frame' not in request.files:
        return "No frame provided", 400

    file = request.files['frame']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')  # Convertir a RGB para que sea compatible con YOLOv5

    results = model(img)

    # Convertir resultados a imagen con anotaciones
    img_result = np.squeeze(results.render())

    # Convertir de BGR a RGB
    img_result = cv2.cvtColor(img_result, cv2.COLOR_BGR2RGB)

    # Convertir la imagen de nuevo a jpeg
    _, img_encoded = cv2.imencode('.jpg', img_result)
    return send_file(io.BytesIO(img_encoded.tobytes()), mimetype='image/jpeg')

@app.route('/process_confidence', methods=['POST'])
def process_confidence():
    if 'frame' not in request.files:
        return "No frame provided", 400

    file = request.files['frame']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')  # Convertir a RGB para que sea compatible con YOLOv5

    results = model(img)
    detections = results.xyxy[0].cpu().numpy()

    # Obtener la confianza máxima
    if len(detections) > 0:
        max_confidence = np.max(detections[:, 4])  # La confianza está en la quinta columna
    else:
        max_confidence = 0.0

    # Preparar la respuesta
    response = {
        "max_confidence": int(max_confidence*100)
    }

    return jsonify(response)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    def log_ready():
        logger.info("Server running on port 5000")

    app.before_first_request(log_ready)
    app.run(debug=True, host='0.0.0.0', port=5000)
