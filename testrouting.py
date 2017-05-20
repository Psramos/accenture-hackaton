#usage: python testrouting.py, naveagodr: http://127.0.0.1:8080/

import os
import cherrypy
import json
import subprocess


def get_ip_address():
   # output = subprocess.check_output(['awk','END{print $1}', '/etc/hosts']).strip()
   # print "========== IP =========== :/ " + output
    return "127.0.0.1"

class DashboardSEO(object):

    def index(self):

        return "<html><body><div>Soc una teta</div></body></html>"

    def admin(self):
       # return file("src/Dashboard/admin.html");
        return "<html><body><div>Soc un test admin</div></body></html>"

    def mapa(self):
        return file("test/mapa.html")
    index.exposed = True
    admin.exposed = True
    mapa.exposed = True


static_handler = cherrypy.tools.staticdir.handler(section="/", dir="/leaflet/")
cherrypy.tree.mount(static_handler, '/leaflet/')

cherrypy.server.socket_host = get_ip_address()
cherrypy.quickstart(DashboardSEO())
