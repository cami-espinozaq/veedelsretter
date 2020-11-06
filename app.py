from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from data import Retailers
import requests
import os

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

def init_data():
    response = requests.request('GET', 'https://takehomedata.dokku.railslabs.com/companies.json')
    json = response.json()
    return Retailers(json)

retailers = init_data()

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/<path:path>")
def static_proxy(path):
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)


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

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))