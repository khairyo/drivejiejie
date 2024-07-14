from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from paddleocr import PaddleOCR
from io import BytesIO
from PIL import Image
import numpy as np
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
ocr = PaddleOCR(use_angle_cls=True, lang='ch')  # Initialize PaddleOCR

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data'}), 400
    
    image_data = data['image']
    image_data = image_data.split(",")[1]  # Remove the "data:image/jpeg;base64," part
    image = Image.open(BytesIO(base64.b64decode(image_data)))

    # Convert PIL Image to numpy array
    image = np.array(image)

    result = ocr.ocr(image, cls=True)
    text_result = [line[1][0] for line in result[0]]
    
    # Print the full OCR result to the console for debugging
    print("Full OCR Result:", text_result)
    
    # Filter out numbers
    numbers = [text for text in text_result if re.search(r'\d', text)]
    
    # Print the numbers to the console
    if numbers:
        print("Detected Numbers:", numbers)
    else:
        print("No numbers detected.")
    
    return jsonify({'text_result': numbers})

if __name__ == '__main__':
    app.run(debug=True)
