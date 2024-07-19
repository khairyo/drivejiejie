# webscrapes fuel prices from motorist.sg and returns as JSON

from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/api/fuel-prices', methods=['GET'])
def get_fuel_prices():
  url = 'https://www.motorist.sg/petrol-prices'
  response = requests.get(url)
  if response.status_code != 200:
    return jsonify({'error': 'Failed to retrieve the page'}), response.status_code

  soup = BeautifulSoup(response.content, 'html.parser')

  table = soup.find('table')

  headers = [th.text.strip() for th in table.find_all('th')]
  rows = []
  for tr in table.find_all('tr')[1:]:
    cells = [td.text.strip() for td in tr.find_all('td')]
    rows.append(cells)

  return jsonify({'headers': headers, 'rows': rows})

if __name__ == '__main__':
  app.run(port=5002, debug=True)
