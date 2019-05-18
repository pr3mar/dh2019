import json

import flask
from flask import request, jsonify
from scheduler import optimize
from utils import getRegionIdByName

app = flask.Flask(__name__)
app.config["DEBUG"] = True


regions = [
    {
        "region": "San Francisco",
        "demand": [2, 3, 4, 5, 9, 6, 11],
        "pods": 5,
    },
    {
        "region": "London",
        "demand": [5, 3, 8, 5, 5, 5, 5],
        "pods": 7
    },
    {
        "region": "Tokyo",
        "demand": [5, 3, 8, 5, 3, 2, 1, 1],
        "pods": 11
    }
]


@app.route('/', methods=['GET'])
def home():
    return jsonify(regions)


@app.route('/demand/', methods=['POST'])
def demand_update():
    data = json.loads(request.data)

    region = data["region"]
    value = data["value"]
    try:
        regionId = getRegionIdByName(regions, region)
        regions[regionId]["demand"].append(value)
        optimized = optimize([region["demand"][-1] for region in regions], 30, debug=True)
        return jsonify({"message": "demand added to {}".format(region)})
    except Exception as e:
        return jsonify({"error": str(e)})

app.run()
