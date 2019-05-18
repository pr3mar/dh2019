import json

import flask
from flask import request, jsonify
from scheduler import optimize

app = flask.Flask(__name__)
app.config["DEBUG"] = True


regions = {
    "San Francisco": {
        "demand": [2, 3, 4, 5, 9, 6, 11],
        "nodes": ["1", "2", "3", "4"],
    },
    "London": {
        "demand": [5, 3, 8, 5, 5, 5, 5],
        "nodes": ["5", "6", "7"]
    },

    "Tokyo": {
        "demand": [5, 3, 8, 5, 3, 2, 1, 1],
        "nodes": ["9", "10", "11"]
    }
}


@app.route('/', methods=['GET'])
def home():
    return jsonify(regions)


@app.route('/demand/', methods=['POST'])
def demand_update():
    data = json.loads(request.data)

    region = data["region"]
    value = data["value"]

    regions[region]["demand"].append(value)
    optimized = optimize([regions[region]["demand"][-1] for region in regions], 30, debug=True)

    return jsonify({"message": "demand added to {}".format(region)})


app.run()
