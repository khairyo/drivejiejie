from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
import base64
from paddleocr import PaddleOCR
from io import BytesIO
from PIL import Image
import numpy as np
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
socketio = SocketIO(app, cors_allowed_origins="*") 

ocr = PaddleOCR(use_angle_cls=True, lang='ch')  

carpark_availability = {
    "northpoint_city_south_wing": None
}

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data'}), 400
    
    image_data = data['image']
    image_data = image_data.split(",")[1]  
    image = Image.open(BytesIO(base64.b64decode(image_data)))

    image = np.array(image)

    result = ocr.ocr(image, cls=True)
    text_result = [line[1][0] for line in result[0]]
    
    print("Full OCR Result:", text_result)
    
    numbers = [text for text in text_result if re.search(r'\d', text)]
    
    if numbers:
        print("Detected Numbers:", numbers)
        carpark_availability['northpoint_city_south_wing'] = numbers[0]
        socketio.emit('update_availability', carpark_availability)
    else:
        print("No numbers detected.")
    
    return jsonify({'text_result': numbers})

@app.route('/update_carpark_availability', methods=['POST'])
def update_carpark_availability():
    data = request.json
    if 'availability' in data:
        carpark_availability['northpoint_city_south_wing'] = data['availability']
        socketio.emit('update_availability', carpark_availability)
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'No availability provided'}), 400

@app.route('/get_carpark_availability', methods=['GET'])
def get_carpark_availability():
    return jsonify(carpark_availability), 200

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
