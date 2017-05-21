var map;

var greenIcon = L.icon({
    iconUrl: '/images/Verde.png',

    iconSize: [50, 70], // size of the icon
    iconAnchor: [25, 65], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -70] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
    iconUrl: '/images/Rojo.png',
    iconSize: [50, 70], // size of the icon
    iconAnchor: [25, 65], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -70] // point from which the popup should open relative to the iconAnchor
});

var yellowIcon = L.icon({
    iconUrl: '/images/Amarillo.png',

    iconSize: [50, 70], // size of the icon
    iconAnchor: [25, 65], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -70] // point from which the popup should open relative to the iconAnchor
});

function addDistrict(item) {
    json = JSON.parse(item.poly)
    color1 = 'white';
    switch (true) {
        case item.score > 0.75:
            color1 = '#55db3d';
            break;
        case item.score > 0.6:
            color1 = '#2a9172';
            break;
        case item.score > 0.50:
            color1 = '#c48819';
            break;
        default:
            color1 = '#c43b19';
    }
    var itemName = "";
    switch (item.district) {
        case "latHorta":
            itemName = "Horta";
            break;
        case "latStAndreu":
            itemName = "Sant Andreu";
            break;
        case "latStMarti":
            itemName = "Sant Marti";
            break;
        case "latCvella":
            itemName = "Ciutat Vella";
            break;
        case "latSants":
            itemName = "Sants";
            break;
        case "latLesCorts":
            itemName = "Les Corts";
            break;
        case "latStG":
            itemName = "Sant Gervasi";
            break;
        case "latGracia":
            itemName = "Gracia";
            break;
        case "latEixample":
            itemName = "Eixample";
            break;
        case "latNouBarris":
            itemName = "Nou Barris";
            break;

    }
    var html = itemName + "<hr>";
    html += "Score = " + (parseFloat((item.score * 100)).toFixed(2)) + "%<br>";
    html += "Total Venues = " + item.total;
    var districtLayer = new L.polygon(json, {color: color1})
        .bindPopup(html);

    markers.push(districtLayer);
    map.addLayer(districtLayer);
}

function drawDistricts() {
    jQuery.ajax({
        url: "/districts",
        context: document.body
    }).done(function (response) {
        var json = JSON.parse(response);

        removeMarkers();

        json.forEach(function (item) {
            addDistrict(item)
            //    addMarker(item);
        });
    });

}

function calculateWheelChair(lat, lon) {
    var point = L.latLng(lat, lon);
    var total = 0;
    var totalItems = 0;
    jQuery.ajax({
        url: "/locations",
        context: document.body
    }).done(function (response) {
        var json = JSON.parse(response);
        var total = 0;
        var totalItems = 0;
        json.forEach(function (item) {
            var latlng = L.latLng(item.lat, item.lon);
            if (distance(point, latlng) < 250) {
                if (!isNaN(parseFloat(item.wheelchair_accessible))) {
                    total += parseFloat(item.wheelchair_accessible);
                    totalItems += 1;
                }
            }

        });
        var wheelchair = false;
        if (total / totalItems > 0.55) wheelchair = true;
        jQuery.ajax({
            url: "/locations?lat=" + lat + '&lon=' + lon + '&wheelchair=' + parseFloat(parseInt(total) / parseInt(totalItems)) + '&name=Google_API_NAME',
            context: document.body
        }).done(function (response) {
            var item = {
                'name': 'Google_API_NAME',
                'lat' : lat,
                'lon' : lon,
                'rating' : 0,
                'wheelchair_accessible' : parseFloat(parseInt(total) / parseInt(totalItems)),
            };
            addMarker(item);
        });

    });


}
function initmap() {
    map = new L.Map('map');
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 18, attribution: osmAttrib});
    map.setView(new L.LatLng(41.3807852, 2.1478704), 17);
    map.addLayer(osm);

    map.on("moveend", function () {
        if (venues == 1) drawMarkers(500);
    });

    map.on('click', function (e) {
        lat = e.latlng.lat;
        lon = e.latlng.lng;
        if (addMode == 1) {
            calculateWheelChair(lat, lon);
        }
    });

}

function addMarker(item) {
    var icon;
    switch (true) {
        case (item.wheelchair_accessible > 0.7):
            icon = greenIcon;
            break;
        case (item.wheelchair_accessible > 0.5):
            icon = yellowIcon;
            break;
        default:
            icon = redIcon;
    }


    html = item.name + "<hr>";
    //html += "Keywords: " + item.description + "<br>";
    //html += "Rating: " + item.rating;

    numStars = Math.floor(item.rating);
    if (numStars > 0) html += "Rating: ";
    var i = 0;
    while (i < numStars) {
        html += "<img style='width:15px;height:15px;' src='images/star_full.png'/>"
        ++i;
    }
    if ((item.rating) % 1 > 0.5) html += "<img style='width:15px;height:15px;' src='images/star1.png'/>";
    html += "Accuracy wheelchair: " + item.wheelchair_accessible;
    var id = item.id;
    var markerLayer = new L.marker([item.lat, item.lon], {icon: icon})
        .bindPopup(html);
    markers.push(markerLayer);
    map.addLayer(markerLayer);
}

function drawMarkers(dist) {
    jQuery.ajax({
        url: "/locations",
        context: document.body
    }).done(function (response) {
        var json = JSON.parse(response);

        removeMarkers();

        json.forEach(function (item) {
            var latlng = L.latLng(item.lat, item.lon);
            if (distance(map.getCenter(), latlng) < dist)
                addMarker(item);
        });
    });
    // setTimeout(startMap, 1000);
}
function removeMarkers() {
    markers.forEach(function (item, index) {
        map.removeLayer(markers[index]);
    })
}

var markers = [];


function distance(item1, item2) {
    var R = 6371e3; // metres
    var φ1 = (item1.lat).toRadians();
    var φ2 = (item2.lat).toRadians();
    var Δφ = ((item2.lat) - (item1.lat)).toRadians();
    var Δλ = ((item2.lng) - (item1.lng)).toRadians();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}


/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function () {
        return this * Math.PI / 180;
    };
}

/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function () {
        return this * 180 / Math.PI;
    };
}
var district = 0;
var venues = 0;
var addMode = 0;
function setDistrict() {
    district = 1;
    venues = 0;
    addMode = 0;
    drawDistricts();
}
function setVenues() {
    venues = 1;
    district = 0;
    addMode = 0;
    drawMarkers(1000)
}
function setAddMode() {
    district = 0;
    addMode = 1;
}