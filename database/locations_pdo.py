import pandas as pandas
import psycopg2
import sqlalchemy as sal
import pandas

from utils.parameters import Parameters


class LocationsPDO:
    def __init__(self):
        self.__eng = None

        self.__con = None

        pass

    def connect(self):
        parameters = Parameters()

        user = parameters.get_parameter('database_user')
        password = parameters.get_parameter('database_password')
        host = parameters.get_parameter('database_host')
        name = parameters.get_parameter('database_name')
        port = parameters.get_parameter('database_port')

        self.__eng = sal.create_engine("redshift+psycopg2://%s:%s@%s:%s/%s" % (user, password, host, port, name),
                                       encoding='latin1')
        self.__con = self.__eng.connect()

    def get_locations(self):
        result = pandas.read_sql_query("SELECT venue_id as id, venue_name as name, type as description, latitude as lat, longitude as lon, wheelchair_accessible, rating from public.train order by rating_fs", self.__eng)

        return result.to_dict(orient='records')

    def get_districts(self):
        result = pandas.read_sql_query("SELECT * from public.districts", self.__eng)

        return result.to_dict(orient='records')

    def post_location(self, name, lat, lon, wheelchair):
        query  = "INSERT INTO public.train (venue_name, latitude, longitude, wheelchair_accessible) VALUES ('%s', '%s', '%s', '%s')" % (name, lat, lon, wheelchair)

        self.__con.execute(query)
