import json
import os


class LocationService:
    def __init__(self):
        pass

    def get_all_locations(self, lat, lon, distance):
        return json.dumps(
           [
                {
                    "id": "paraguay",
                    "lat":"41.4172754",
                    "lon":"2.206039",
                    "score": 50
                },
                {
                    "id": "bburguer",
                    "lat":"41.3807892",
                    "lon":"2.1478704",
                    "score": 100
                }
            ]
        )

    def get_location(self, id):
        return "Location with id %s" % id