import json

import flask
from flask import request, jsonify
from scheduler import optimize
from utils import getRegionIdByName
from kubernetes import client, config

app = flask.Flask(__name__)
app.config["DEBUG"] = True

config.load_incluster_config()
extensions_v1beta1 = client.ExtensionsV1beta1Api()

regions = [
    {
        "region": "Los Angeles",
        "name": "eco-miner-la",
        "demand": [2, 3, 4, 5, 9, 6],
        "pods": 5,
    },
    {
        "region": "London",
        "name": "eco-miner-lo",
        "demand": [5, 3, 8, 5, 5, 5],
        "pods": 7
    },
    {
        "region": "Tokyo",
        "name": "eco-miner-to",
        "demand": [5, 3, 8, 5, 3, 2],
        "pods": 11
    }
]


def update_deployment(api_instance, deployment, name, n_replicas):
    # Update container image
    deployment.spec.replicas = n_replicas
    # Update the deployment
    api_response = api_instance.patch_namespaced_deployment(
        name=name,
        namespace="default",
        body=deployment)
    print("Deployment updated. status={}, replica_count={}".format(api_response.status, n_replicas))


def get_deployment(api_instance, name):
    return api_instance.read_namespaced_deployment(name, namespace="default")


@app.route('/', methods=['GET'])
def home():
    return jsonify(regions)


@app.route('/demand/', methods=['POST'])
def demand_update():
    data = json.loads(request.data)

    region = data["region"]
    value = data["value"]

    try:
        region_id = getRegionIdByName(regions, region)
        regions[region_id]["demand"] = regions[region_id]["demand"][1:]
        regions[region_id]["demand"].append(value)

        optimized = optimize([region["demand"][-1] for region in regions], 30, debug=True)

        for i, region in enumerate(regions):
            region["pods"] = optimized[i]
            deployment = get_deployment(extensions_v1beta1, region["name"])
            update_deployment(extensions_v1beta1, deployment, region["name"], optimized[i])

        return jsonify({"message": "demand added to {}".format(region)})
    except Exception as e:
        return jsonify({"error": str(e)})


app.run(host='0.0.0.0')
