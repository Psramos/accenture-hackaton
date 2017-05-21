import json

from database.locations_pdo import LocationsPDO
from model.distance_calculator import DistanceCalculator


class LocationService:
    def __init__(self):
        self.__pdo = LocationsPDO()
        pass

    def get_all_locations(self):
        self.__pdo.connect()

        locations = self.__pdo.get_locations()

        return json.dumps(locations)

    def get_all_districts_score(self):
        self.__pdo.connect()

        districts = self.__pdo.get_districts()

        locations = self.__pdo.get_locations()

        for location in locations:
            for district in districts:
                json_poly = json.loads(district['poly'])

                lat = location['lat']
                lon = location['lon']

                if lat and lon:
                    is_inside = DistanceCalculator.is_inside(float(lat), float(lon), json_poly)

                    if is_inside:
                        try:
                            score = int(location['wheelchair_accessible']) if location['wheelchair_accessible'] else 0

                            if 'score' in district:
                               district['score'] += score
                               district['total'] += 1
                            else:
                               district['score'] = score
                               district['total'] = 1

                        except ValueError:
                            continue

        for district in districts:
            if 'score' in district:
                district['score'] = (float(district['score']) / float(district['total']))

        return json.dumps(districts)

    def post_location(self, name, lat, lon, wheelchair):
        self.__pdo.connect()

        self.__pdo.post_location(name, lat, lon, wheelchair)