import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

OLLAMA_API_ENDPOINT = 'http://localhost:11434/api/generate'

@app.route('/api/ollama', methods=['POST'])
def get_response():
    data = request.json
    query = data.get('query')

    headers = {
        'Content-Type': 'application/json',
    }

    prompt = f"{query}\nMake your response as brief as possible; limit it to 400 characters and avoid using any bold or italic formatting."

    payload = {
        "model": "llama3:8b",
        "prompt": prompt,
        "stream": False,
    }

    try:
        response = requests.post(OLLAMA_API_ENDPOINT, headers=headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            response_data = response.json()
            answer = response_data.get("response", "No response from AI.")
            print(f"AI response: {answer}")
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': response.status_code, 'message': response.text}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5001, debug=True)
