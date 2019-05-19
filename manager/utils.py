def getRegionIdByName(regions, regionName):
    for id, region in enumerate(regions):
        if region["region"] == regionName:
            return id
    raise Exception("Invalid region name")
