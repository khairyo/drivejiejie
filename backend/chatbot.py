import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

OLLAMA_API_ENDPOINT = 'http://localhost:11434/api/chat'  # Confirm this endpoint is correct
OLLAMA_API_KEY = os.getenv('OLLAMA_API_KEY')

@app.route('/api/ollama', methods=['POST'])
def get_response():
    data = request.json
    query = data.get('query')
    
    # Construct the payload for Ollama API
    payload = {
        "model": "llama3",  # Replace with your model name
        "messages": [
            {
                "role": "user",
                "content": query
            }
        ],
        "stream": False  # We want a single response object
    }
    
    try:
        # Send request to Ollama API
        response = requests.post(OLLAMA_API_ENDPOINT, json=payload, headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {OLLAMA_API_KEY}'  # Include API key in headers
        })
        response_data = response.json()
        
        # Extract the assistant's response
        answer = response_data.get("message", {}).get("content", "No response from AI.")
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)  # Ensure the port matches the one used in React
