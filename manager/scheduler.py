from math import floor


def optimize(regionDemands, numServicesRunning):
    """
    Function optimize,
    :param regionDemands: [demand1, demand2, demand3, ...]
    :param numServicesRunning: 0 < numServices < 1000
    :return newState: [region1Running, region2Running, ...]
    """

    # print([round(regionDemand/sum(regionDemands), 2) for regionDemand in regionDemands])
    # print([1 - round(regionDemand/sum(regionDemands), 2) for regionDemand in regionDemands])
    # todo: this is one possible solution
    # ret = [floor(numServicesRunning * (1 - (regionDemand/sum(regionDemands))) / 2) for regionDemand in regionDemands]
    inversePercents = [1.0/regionDemand for regionDemand in regionDemands]
    inversePercents = [floor(numServicesRunning * inversePercent/sum(inversePercents)) for inversePercent in inversePercents]
    for i in range(numServicesRunning - sum(inversePercents)):
        inversePercents[inversePercents.index(max(inversePercents))] += 1

    return inversePercents
    # return [round(numServicesRunning * (1 - (regionDemand/sum(regionDemands)))) for regionDemand in regionDemands]


if __name__ == "__main__":
    regionDemands = [5, 33, 60]
    numServicesRunning = 30
    print(regionDemands, sum(regionDemands))
    optimized = optimize(regionDemands, numServicesRunning)
    print(optimized, sum(optimized), sum(optimized) == numServicesRunning)
