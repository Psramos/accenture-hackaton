import json

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
    def locations(self, **kwargs):
        if len(kwargs) == 0:
            return self._location_service.get_all_locations()
        else:
            lat  = kwargs['lat']

            lon  = kwargs['lon']

            name = kwargs['name']

            #print lat

    @cherrypy.expose
    def districts(self):
        return self._location_service.get_all_districts_score()

cherrypy.config.update({'server.socket_host': '127.0.0.1',
                        'server.socket_port': 8080, })

conf = {
    '/images': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./images/')
    },
    '/leaflet':{
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./leaflet/')
    },
    '/js': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': os.path.abspath('./js/')
    }
}
cherrypy.quickstart(Locations(), '/', config=conf)
