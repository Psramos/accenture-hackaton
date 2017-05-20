from shapely.geometry import Point, Polygon


class DistanceCalculator:
    def __init__(self):
        pass

    @staticmethod
    def is_inside(lat, lon, poly):
        pt = Point(lat, lon)

        poly = Polygon(poly)

        return poly.contains(pt)
