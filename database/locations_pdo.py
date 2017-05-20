import psycopg2

from utils.parameters import Parameters

parameters = Parameters()

user     = parameters.get_parameter('database_user')
password = parameters.get_parameter('database_password')
host     = parameters.get_parameter('database_host')
name     = parameters.get_parameter('database_name')

con    = psycopg2.connect(
    dbname=name,
                                  host=config['host'],
                                  port=config['port'],
                                  user=config['user'],
                                  password=config['pwd'])