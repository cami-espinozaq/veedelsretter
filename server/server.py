from flask import Flask, jsonify, request
from flask_cors import CORS
from data import Retailers
import requests

app = Flask(__name__)
CORS(app)

def init_data():
    response = requests.request('GET', 'https://takehomedata.dokku.railslabs.com/companies.json')
    json = response.json()
    return Retailers(json)

retailers = init_data()

@app.route('/')
def main():
    return 'Hello, world!'

@app.route('/names-list')
def raw_data():
    return jsonify(
        retailers.names_list()
    )

@app.route('/overview')
def overview():
    return jsonify(
        retailers.totals_overview()
    )

@app.route('/overview/<int:id>')
def retailer_overview(id):
    result = retailers.overview_by_id(id) or {'msg': 'id does not exist'}
    return jsonify(result)

@app.route('/compare')
def compare():
    id = request.args.get('id')
    average = retailers.compare_to_average(id)
    ranking = retailers.retailer_ranking(id) if id else None
    return jsonify({
        'revenueGraph': average['revenue'],
        'countGraph': average['counting'],
        'ranking': ranking
    })