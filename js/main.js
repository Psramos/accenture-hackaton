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
    var latSants = [
        [41.37097960505264, 2.177181243896485],
        [41.374232293915455, 2.175850868225098],
        [41.37494077882888, 2.1490287780761723],
        [41.38047957669266, 2.1425056457519536],
        [41.385373935688804, 2.1423339843750004],
        [41.38534173716234, 2.14259147644043],
        [41.37841868375214, 2.127785682678223],
        [41.37539162884692, 2.1224641799926762],
        [41.347948493443546, 2.1467971801757817],
        [41.335318187288294, 2.109031677246094],
        [41.293027507682005, 2.148857116699219],
        [41.315207748938164, 2.1742630004882817],
        [41.36933709640469, 2.177696228027344],
    ];

    var latLesCorts = [
        [41.385373935688804, 2.142419815063477],
        [41.3925216138863, 2.144565582275391],
        [41.39084745343243, 2.1383857727050786],
        [41.392135272992924, 2.129888534545899],
        [41.38930203628459, 2.1197605133056645],
        [41.39136258431803, 2.1170139312744145],
        [41.39342306704174, 2.118473052978516],
        [41.39503277372669, 2.1179580688476567],
        [41.39702875465492, 2.113409042358399],
        [41.39722191084679, 2.1128940582275395],
        [41.381703200976695, 2.101821899414063],
        [41.37667975453644, 2.0962429046630864],
        [41.37545603573724, 2.122421264648438],
    ];

    var latStG = [
        [41.39258600381198, 2.1446514129638676],
        [41.39091184501634, 2.138299942016602],
        [41.392199663301255, 2.130060195922852],
        [41.38943082245005, 2.1199321746826176],
        [41.39136258431803, 2.1171855926513676],
        [41.39348745607449, 2.118473052978516],
        [41.395097161164934, 2.1180438995361333],
        [41.39728629611651, 2.1128940582275395],
        [41.402565671186714, 2.106542587280274],
        [41.40990457761007, 2.1081733703613286],
        [41.41299439548096, 2.1156406402587895],
        [41.41518292755651, 2.1366691589355473],
        [41.41125639101154, 2.1421623229980473],
        [41.410226440495144, 2.1460247039794926],
        [41.406299604354466, 2.1495437622070317],
        [41.40217938999209, 2.150659561157227],
        [41.39529032309705, 2.1558952331542973],
    ]
    var latGracia = [
        [41.395354710280166, 2.1559381484985356],
        [41.39651366867027, 2.1598863601684575],
        [41.40159996389484, 2.1664094924926762],
        [41.40095615106086, 2.1676540374755864],
        [41.40414296223411, 2.1722459793090825],
        [41.41132076237664, 2.1631050109863286],
        [41.413638089039786, 2.1611309051513676],
        [41.41569786556419, 2.157955169677735],
        [41.41550476428971, 2.154607772827149],
        [41.417628846735006, 2.1511745452880864],
        [41.41968849670774, 2.151603698730469],
        [41.42097574477149, 2.149715423583985],
        [41.42387195962574, 2.1515178680419926],
        [41.42560962653633, 2.151603698730469],
        [41.430114472333806, 2.15108871459961],
        [41.43474770191721, 2.147140502929688],
        [41.42895611326789, 2.143964767456055],
        [41.429406588693865, 2.1364116668701176],
        [41.429342235252946, 2.1290302276611333],
        [41.42457990361012, 2.1342658996582036],
        [41.42001031111568, 2.1385574340820317],
        [41.415247295030724, 2.1366691589355473],
        [41.41132076237664, 2.1421623229980473],
        [41.410290812880795, 2.1460247039794926],
        [41.40636398063092, 2.1495437622070317],
        [41.40211500956974, 2.1507453918457036],
        [41.395354710280166, 2.155981063842774],
    ]

    var latHorta = [
        [41.406943364248924, 2.1685981750488286],
        [41.41550476428971, 2.1805286407470708],
        [41.419559770498026, 2.180871963500977],
        [41.42509476711446, 2.176580429077149],
        [41.427475957717974, 2.1640491485595708],
        [41.430371882652814, 2.1674823760986333],
        [41.43313897912216, 2.1632766723632817],
        [41.43725722986595, 2.1649074554443364],
        [41.44034574645146, 2.162590026855469],
        [41.437514611861786, 2.150487899780274],
        [41.43481204999971, 2.1470546722412114],
        [41.429857060994145, 2.1513462066650395],
        [41.42393631848872, 2.151603698730469],
        [41.42123319132246, 2.1495437622070317],
        [41.41968849670774, 2.151603698730469],
        [41.41782194169466, 2.1511745452880864],
        [41.41550476428971, 2.1545219421386723],
        [41.41576223252812, 2.1580410003662114],
        [41.413638089039786, 2.161216735839844],
        [41.40707211546243, 2.168684005737305],
    ]

    var latNouBarris = [
        [41.41952758890576, 2.180871963500977],
        [41.417693211785334, 2.1833610534667973],
        [41.420428667462, 2.1870088577270512],
        [41.42705764677288, 2.1852493286132817],
        [41.431015403985036, 2.183017730712891],
        [41.44195429062897, 2.1864509582519536],
        [41.44825939932073, 2.1880817413330083],
        [41.45166904976739, 2.1888542175292973],
        [41.45334164295885, 2.1832752227783208],
        [41.450511075371644, 2.1757221221923833],
        [41.44825939932073, 2.1699714660644536],
        [41.44710136406431, 2.166538238525391],
        [41.443498455529024, 2.162847518920899],
        [41.440410088984066, 2.162590026855469],
        [41.437321575460594, 2.164993286132813],
        [41.43326767841296, 2.163448333740235],
        [41.43050058742958, 2.1674823760986333],
        [41.42754031300878, 2.1641349792480473],
        [41.42509476711446, 2.1764945983886723],
        [41.419559770498026, 2.1809148788452153]
    ]

    var latStAndreu = [
        [41.45173338107218, 2.188682556152344],
        [41.455464487596075, 2.188682556152344],
        [41.45430658095197, 2.19503402709961],
        [41.44941741390759, 2.1998405456542973],
        [41.443498455529024, 2.206363677978516],
        [41.43745026645851, 2.2097969055175786],
        [41.433074629381096, 2.2111701965332036],
        [41.432045024848236, 2.2070503234863286],
        [41.42535219733572, 2.206192016601563],
        [41.41466798546655, 2.2003555297851567],
        [41.414153039294305, 2.19503402709961],
        [41.42033212392897, 2.187137603759766],
        [41.42702546889623, 2.185420989990235],
        [41.43088670022892, 2.183189392089844],
        [41.45186204349045, 2.1888542175292973],
    ]

    var latEixample = [
        [41.37445772177038, 2.1682548522949223],
        [41.37857969336484, 2.163147926330567],
        [41.385148545668805, 2.1640062332153325],
        [41.38585691167223, 2.1650362014770512],
        [41.38543833269385, 2.170014381408692],
        [41.38865810163064, 2.1732759475708012],
        [41.389012266479575, 2.1760654449462895],
        [41.391909906411456, 2.1814298629760747],
        [41.391330388757254, 2.182416915893555],
        [41.394485477926374, 2.1868801116943364],
        [41.40217938999209, 2.186837196350098],
        [41.40385325858542, 2.186365127563477],
        [41.411900101792305, 2.175507545471192],
        [41.40710430322591, 2.168684005737305],
        [41.404239529829994, 2.1722459793090825],
        [41.40095615106086, 2.1676540374755864],
        [41.40156777340462, 2.1664094924926762],
        [41.39648147566068, 2.1598863601684575],
        [41.39245722389687, 2.1446084976196294],
        [41.38540613419931, 2.142419815063477],
        [41.38060838033305, 2.1424627304077153],
        [41.37494077882888, 2.1489000320434575]
    ];

    var latCvella = [
        [41.374296701953725, 2.1758937835693364],
        [41.374554333469085, 2.1681690216064458],
        [41.37867629894112, 2.1632766723632817],
        [41.385180744290935, 2.1641349792480473],
        [41.386017902869476, 2.164993286132813],
        [41.3856315233264, 2.17005729675293],
        [41.38859370781446, 2.1733188629150395],
        [41.38910885655809, 2.176151275634766],
        [41.39187771112176, 2.18130111694336],
        [41.39142697539171, 2.1825027465820317],
        [41.39258600381198, 2.183618545532227],
        [41.39033231846498, 2.1856784820556645],
        [41.39104062799287, 2.1870517730712895],
        [41.386661863672394, 2.1933174133300786],
        [41.38872249538305, 2.197351455688477],
        [41.3856315233264, 2.2027587890625004],
        [41.37584247574001, 2.1922016143798833],
        [41.369208270443245, 2.19228744506836],
        [41.3543915834576, 2.184562683105469],
        [41.35593783017404, 2.1770095825195317],
        [41.369530334868536, 2.177696228027344],
        [41.374296701953725, 2.1758937835693364],
    ]

    var latStMarti = [
        [41.38569592007635, 2.2029304504394536],
        [41.388915676257554, 2.1976089477539067],
        [41.386983841682195, 2.1931457519531254],
        [41.39102453013475, 2.187094688415528],
        [41.39038061254157, 2.1856999397277836],
        [41.39245722389687, 2.1838760375976567],
        [41.39451767192453, 2.1869015693664555],
        [41.40250129114707, 2.18679428100586],
        [41.403982015922075, 2.186365127563477],
        [41.41202884318303, 2.1757221221923833],
        [41.41582659942825, 2.1806144714355473],
        [41.419559770498026, 2.1811294555664067],
        [41.41801503608024, 2.1835327148437504],
        [41.42071829719994, 2.18679428100586],
        [41.414410512890704, 2.1948623657226567],
        [41.414925457021816, 2.2000122070312504],
        [41.425480912063605, 2.206192016601563],
        [41.432045024848236, 2.2068786621093754],
        [41.43333202796266, 2.2111701965332036],
        [41.425738340753924, 2.2176933288574223],
        [41.42033212392897, 2.224044799804688],
        [41.414925457021816, 2.2288513183593754],
        [41.40913210017994, 2.2302246093750004],
    ];

    L.polygon(latStMarti,{color:'green'}).addTo(map)
    L.polygon(latCvella,{color:'red'}).addTo(map);
    L.polygon(latEixample, {color: 'red'}).addTo(map);
    L.polygon(latStAndreu, {color: 'red'}).addTo(map);
    L.polygon(latNouBarris, {color: 'red'}).addTo(map);
    L.polygon(latHorta, {color: 'red'}).addTo(map);

    L.polygon(latGracia, {color: 'red'}).addTo(map);
    L.polygon(latSants, {color: 'red'}).addTo(map);
    L.polygon(latLesCorts, {color: 'red'}).addTo(map);
    L.polygon(latStG, {color: 'red'}).addTo(map);


    map.on('click', function (e) {
        console.log("[" + e.latlng.lat + ", " + e.latlng.lng + "],");
    });

// zoom the map to the polygon
    // map.fitBounds(polygon.getBounds());

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
            //    addMarker(item);
        });
    });
    // setTimeout(startMap, 1000);
}
function removeMarkers() {
    markers.forEach(function (item, index) {
        console.log(item);
        console.log(item.id);
        map.removeLayer(markers[index]);
    })
}

var markers = [];







