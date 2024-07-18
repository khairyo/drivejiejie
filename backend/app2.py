# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_socketio import SocketIO, emit
# import os
# import base64
# from paddleocr import PaddleOCR
# from io import BytesIO
# from PIL import Image
# import numpy as np
# import re

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes
# socketio = SocketIO(app, cors_allowed_origins="*")  # Initialize Flask-SocketIO with CORS enabled

# ocr = PaddleOCR(use_angle_cls=True, lang='ch')  # Initialize PaddleOCR

# # In-memory storage for carpark availability
# carpark_availability = {
#     "northpoint_city_south_wing": None
# }

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     data = request.json
#     if 'image' not in data:
#         return jsonify({'error': 'No image data'}), 400
    
#     image_data = data['image']
#     image_data = image_data.split(",")[1]  # Remove the "data:image/jpeg;base64," part
#     image = Image.open(BytesIO(base64.b64decode(image_data)))

#     # Convert PIL Image to numpy array
#     image = np.array(image)

#     result = ocr.ocr(image, cls=True)
#     text_result = [line[1][0] for line in result[0]]
    
#     # Print the full OCR result to the console for debugging
#     print("Full OCR Result:", text_result)
    
#     # Filter out numbers
#     numbers = [text for text in text_result if re.search(r'\d', text)]
    
#     # Print the numbers to the console
#     if numbers:
#         print("Detected Numbers:", numbers)
#         # Update carpark availability
#         carpark_availability['northpoint_city_south_wing'] = numbers[0]
#         # Emit the updated availability to all connected clients
#         socketio.emit('update_availability', carpark_availability)
#     else:
#         print("No numbers detected.")
    
#     return jsonify({'text_result': numbers})

# @app.route('/update_carpark_availability', methods=['POST'])
# def update_carpark_availability():
#     data = request.json
#     if 'availability' in data:
#         carpark_availability['northpoint_city_south_wing'] = data['availability']
#         socketio.emit('update_availability', carpark_availability)
#         return jsonify({'status': 'success'}), 200
#     else:
#         return jsonify({'status': 'error', 'message': 'No availability provided'}), 400

# @app.route('/get_carpark_availability', methods=['GET'])
# def get_carpark_availability():
#     return jsonify(carpark_availability), 200

# if __name__ == '__main__':
#     socketio.run(app, debug=True)
