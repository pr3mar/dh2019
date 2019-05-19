import json
from flask_cors import CORS, cross_origin
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
        "name": "eco-miner-usa",
        "demand": [50, 40, 20, 12, 30, 15],
        "desired_pods": 11,
        "actual_pods": 11
    },
    {
        "region": "Frankfurt",
        "name": "eco-miner-ger",
        "demand": [50, 60, 70, 70, 60, 90],
        "desired_pods": 11,
        "actual_pods": 11
    },
    {
        "region": "Ljubljana",
        "name": "eco-miner-slo",
        "demand": [50, 40, 60, 70, 80, 80],
        "desired_pods": 5,
        "actual_pods": 5
    },
    {
        "region": "Cape Town",
        "name": "eco-miner-sa",
        "demand": [0, 40, 50, 50, 30, 65],
        "desired_pods": 5,
        "actual_pods": 5
    },
    {
        "region": "Bangalore",
        "name": "eco-miner-ind",
        "demand": [40, 30, 20, 40, 50, 50],
        "desired_pods": 7,
        "actual_pods": 7
    },
    {
        "region": "Nagasaki",
        "name": "eco-miner-jpn",
        "demand": [30, 40, 20, 40, 30, 30],
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
@cross_origin()
def home():
    for region in regions:
        deployments = get_deployments("app=" + region["name"])
        region["actual_pods"] = deployments.items[0].status.ready_replicas

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

        optimized = optimize([region["demand"][-1] for region in regions], 50, debug=True)
        print(optimized)

        for i, region in enumerate(regions):
            region["desired_pods"] = optimized[i]
            deployment = get_deployment(region["name"])
            update_deployment(deployment, region["name"], optimized[i])

        return jsonify({"message": "demand added to {}".format(region)})
    except Exception as e:
        return jsonify({"error": str(e)})


app.run(host='0.0.0.0')
