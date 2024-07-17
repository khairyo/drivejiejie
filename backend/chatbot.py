from flask import Flask, request, jsonify
from flask_cors import CORS
import os, requests
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
OLLAMA_API_KEY = os.getenv('OLLAMA_API_KEY')

app = Flask(__name__)
CORS(app)

API_URL = 'http://localhost:11434/api/chat'  # Local URL for Ollama

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')

    payload = {
        'model': 'llama3',  # Adjust the model name as per your requirements
        'messages': [
            {'role': 'user', 'content': message}
        ],
        'stream': False  # Set to True if you want streaming responses
    }

    try:
        response = requests.post(API_URL, json=payload, headers={'Content-Type': 'application/json'})
        response_data = response.json()
        reply = response_data['message']['content'] if 'message' in response_data else 'Sorry, I could not process your request.'
        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
