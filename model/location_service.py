import json
import os


class LocationService:
    def __init__(self):
        pass

    def get_all_locations(self, lat, lon, distance):
        return json.dumps(
           [
                {
                    "id": "OrSQGJ8j4eQxyZ9pMtNG4FewGZ",
                    "description":"Aqui de chilling en la hackaton",
                    "name": "Paraguay",
                    "lat":"41.4172754",
                    "lon":"2.206039",
                    "score": 0.5,
                },
                {
                    "id": "OrSQGJ8j4eQxyZ9pMtNG4FewGS",
                    "description":"On es la cambrera sexy?",
                    "name": "Bburguer",
                    "lat":"41.3807892",
                    "lon":"2.1478704",
                    "score": 1
                },
                {
                       "id": "OrSQGJ8j4eQxyZ9pMtNG4FewGE",
                       "description": "On pasa la magia",
                       "name": "Paucueva",
                       "lat": "40.4233873",
                       "lon": "2.1598064",
                       "score": 0.3,
                }
            ]
        )

    def get_location(self, id):
        return "Location with id %s" % id