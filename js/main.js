var map;

var greenIcon = L.icon({
    iconUrl: '/images/green.png',

    iconSize: [40, 100], // size of the icon
    iconAnchor: [20, 90], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -100] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
    iconUrl: '/images/red.png',


    iconSize: [40, 100], // size of the icon
    iconAnchor: [20, 90], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -100] // point from which the popup should open relative to the iconAnchor
});

var yellowIcon = L.icon({
    iconUrl: '/images/yellow.png',

    iconSize: [40, 100], // size of the icon
    iconAnchor: [20, 90], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -100] // point from which the popup should open relative to the iconAnchor
});

function initmap() {
    map = new L.Map('map');
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 18, attribution: osmAttrib});
    map.setView(new L.LatLng(41.3807852, 2.1478704), 19);
    map.addLayer(osm);


    // create a red polygon from an array of LatLng points
    var latEixample = [
        [41.413491, 2.160156],
        [41.378883, 2.163090],
        [41.385723, 2.164240],
        41.391506, 2.180026
        41.389178, 2.183710
        41.391460, 2.186932
        41.404655, 2.187090
        41.412868, 2.176586
    ];
    var polygon = L.polygon(latEixample, {color: 'green'}).addTo(map);



// zoom the map to the polygon
    map.fitBounds(polygon.getBounds());

}

function addMarker(item) {
    var icon;
    switch (true) {
        case (item.score > 0.9):
            icon = greenIcon;
            break;
        case (item.score > 0.4):
            icon = yellowIcon;
            break;
        default:
            icon = redIcon;
    }


    html = item.name + "<hr>";
    html += item.description;

    var id = item.id;
    var markerLayer = new L.marker([item.lat, item.lon], {icon: icon})
        .bindPopup(html);
    markers.push(markerLayer);
    map.addLayer(markerLayer);
}

function startMap() {
    jQuery.ajax({
        url: "/locations",
        context: document.body
    }).done(function (response) {
        var json = JSON.parse(response);
        removeMarkers();

        json.forEach(function (item) {
            addMarker(item);
        });
    });
    setTimeout(startMap, 1000);
}
function removeMarkers() {
    markers.forEach(function (item, index) {
        console.log(item);
        console.log(item.id);
        map.removeLayer(markers[index]);
    })
}

var markers = [];






