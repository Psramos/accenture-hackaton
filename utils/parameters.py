import os
import yaml
import sys


class Parameters:
    _parameters_file = None

    def __init__(self):
        self._file_path = os.path.dirname(os.path.realpath(sys.argv[0])) + '/parameters.yml'

        stream = open(self._file_path, 'r')

        self._parameters_file = yaml.load(stream)

    def get_parameter(self, parameter):
        for key, value in self._parameters_file.iteritems():
            if key == parameter:
                return value

        raise Exception('Key %s not found' % parameter)