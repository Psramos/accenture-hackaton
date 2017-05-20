import cherrypy
import os

from model.location_service import LocationService

class Locations(object):
    def __init__(self):
        self._location_service = LocationService()

    @cherrypy.expose
    def index(self):
        return "It works"

    @cherrypy.expose
    def mapa(self):
        return file("test/mapa.html")

    @cherrypy.expose
    def locations(self, id=None, lat=None, lon=None, distance=None):
        if id is None:
            return self._location_service.get_all_locations(lat, lon, distance)
        else:
            return self._location_service.get_location(id)

cherrypy.config.update({'server.socket_host': '127.0.0.1',
                            'server.socket_port': 8080, })

conf = {'/images': {'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./images/')}}
cherrypy.quickstart(Locations(), '/', config=conf)
