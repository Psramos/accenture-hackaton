import json
import os

from database.locations_pdo import LocationsPDO


class LocationService:
    def __init__(self):
        self.__pdo = LocationsPDO()
        pass

    def get_all_locations(self, lat, lon, distance):
        self.__pdo.connect()

        locations = self.__pdo.get_locations()

        return json.dumps(locations)

    def get_all_districts_score(self):
        self.__pdo.connect()

        districts = self.__pdo.get_districts()

        return json.dumps(districts)

    def get_location(self, id):
        return "Location with id %s" % id
