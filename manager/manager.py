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
        "region": "Ljubljana",
        "name": "eco-miner-slo",
        "demand": [2, 3, 4, 5, 9, 6],
        "desired_pods": 5,
        "actual_pods": 5
    },
    {
        "region": "Bangalore",
        "name": "eco-miner-ind",
        "demand": [5, 3, 8, 5, 5, 5],
        "desired_pods": 7,
        "actual_pods": 7
    },
    {
        "region": "Los Angeles",
        "name": "eco-miner-usa",
        "demand": [5, 3, 8, 5, 3, 2],
        "desired_pods": 11,
        "actual_pods": 11
    },
    {
        "region": "Nagasaki",
        "name": "eco-miner-jpn",
        "demand": [6, 7, 8, 9, 10, 9],
        "desired_pods": 11,
        "actual_pods": 11
    },
    {
        "region": "Frankfurt",
        "name": "eco-miner-ger",
        "demand": [11, 10, 11, 9, 8, 7],
        "desired_pods": 11,
        "actual_pods": 11
    }
]


def update_deployment(deployment, name, n_replicas):
    # Update container image
    deployment.spec.replicas = n_replicas
    # Update the deployment
    api_response = extensions_v1beta1.patch_namespaced_deployment(
        name=name,
        namespace="default",
        body=deployment)
    print("Deployment updated. status={}, replica_count={}".format(api_response.status, n_replicas))


def get_deployment(name):
    return extensions_v1beta1.read_namespaced_deployment(name, namespace="default")


def get_deployments(label):
    api_response = extensions_v1beta1.list_namespaced_deployment(namespace="default", label_selector=label)
    return api_response


@app.route('/', methods=['GET'])
def home():
    for region in regions:
        deployments = get_deployments("app=" + region["name"])
        region["desired_pods"] = deployments.items[0].status.ready_replicas

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
            region["actual_pods"] = optimized[i]
            deployment = get_deployment(region["name"])
            update_deployment(deployment, region["name"], optimized[i])

        return jsonify({"message": "demand added to {}".format(region)})
    except Exception as e:
        return jsonify({"error": str(e)})


app.run(host='0.0.0.0')
