from math import floor
from random import randint, random

def optimize(regionDemands, numServicesRunning, debug=True):
    """
    Function optimize,
    :param regionDemands: [demand1, demand2, demand3, ...]
    :param numServicesRunning: 0 < numServices < 1000
    :return newState: [region1Running, region2Running, ...]
    """
    if debug: print("region demands", regionDemands, "sum", sum(regionDemands))
    dataRange = max(regionDemands) - min(regionDemands) + 1
    optimized = [floor(numServicesRunning * ((1 - ((regionDemand - min(regionDemands))/dataRange)) * (1 - (regionDemand/sum(regionDemands))) / 2)) for regionDemand in regionDemands]
    if debug: print("optimzed:", optimized, sum(optimized))
    if sum(optimized) < numServicesRunning:
        while (numServicesRunning - sum(optimized)) != 0:
            rand = random()
            if rand < 0.25:
                optimized[randint(0, len(optimized) - 1)] += 1
            else:
                optimized[optimized.index(max(optimized))] += 1
    else:
        while (sum(optimized) - numServicesRunning) != 0:
            rand = random()
            if rand < 0.25:
                randInt = randint(0, len(optimized) - 1)
                optimized[randInt] = optimized[randInt] - 1 if optimized[randInt] > 0 else 0
            else:
                optimized[optimized.index(max(optimized))] -= 1
    if debug: print("optimized", optimized, sum(optimized), sum(optimized) == numServicesRunning)
    return optimized
