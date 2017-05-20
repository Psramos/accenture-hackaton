import cherrypy

from model.location_service import LocationService


def get_ip_address():
    return "127.0.0.1"


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

cherrypy.server.socket_host = get_ip_address()

cherrypy.quickstart(Locations())
