mapboxgl.accessToken = 'pk.eyJ1Ijoic2NpZ3V5bWptIiwiYSI6ImNqYzg1dW54dDJ0eXgyeHBmbTIxcHRqNHMifQ.dWm_32Y_Tl0phVQGm5C98Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 3,
    center: [-90, 35]
});


var names = [
    'A123 Systems',
    'Boston Power',
    '24M Technologies',
    'StoreDot',
    'Seeo',
    'Amprius',
    'Ambri',
    'Aquion Energy',
    'SolidEnergy Systems',
    'Baseload Renewables'
]

var coordinates = [
    [42.392997, -71.269165],
    [42.278813, -71.568619],
    [42.360651, -71.104579],
    [32.160575, 34.809902],
    [37.904578, -122.166951],
    [37.379410, -122.030990],
    [42.363567, -71.114344],
    [42.311780, -71.391023],
    [42.511835, -71.137385],
    [42.364521, -71.101517]
]


function generateGeoJSON() {
    var geojson = {
        type: 'FeatureCollection',
        features: []
    };

    for (var x = 0; x < names.length; x++) {
        geojson['features'].push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [coordinates[x][1], coordinates[x][0]]
            },
            properties: {
                title: names[x]
            }
        });
    }

    return geojson;
}

var geojson = generateGeoJSON();

// add markers to map
i = 0;
geojson.features.forEach(function (marker) {

    // create a HTML element for each feature
    var el = $('<div />').addClass('marker').attr('data-index', i)[0];
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates).setPopup(new mapboxgl.Popup({
                offset: 25
            }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3>'))
        .addTo(map);
    i++;
});


$.each($('section'), function (i, sec) {
    $(sec).attr('data-index', names.indexOf($(sec).data('name')));
});

// On every scroll event, check which element is on screen
$('#features').scroll(function () {
    console.log('scroll');

    var markerNames = names;
    for (var i = 0; i < markerNames.length; i++) {
        var markerName = markerNames[i];
        if (isElementOnScreen(markerName)) {
            console.log(markerName);
            setActiveMarker(markerName);
            break;
        }
    }
});

var activeMarkerIndex = -1;
function setActiveMarker(markerName) {
    markerIndex = names.indexOf(markerName);
    if (markerIndex < 0) {
        return;
    }
    if (markerIndex === activeMarkerIndex) return;

    map.flyTo({center: [coordinates[markerIndex][1], coordinates[markerIndex][0]], zoom: 9});

    $(`section[data-index="${markerIndex}"]`).addClass('active');
    $(`section[data-index="${activeMarkerIndex}"]`).removeClass('active');

    activeMarkerIndex = markerIndex;
}

// FUNCTIONS
function isElementOnScreen(id) {
    markerIndex = names.indexOf(id);
    var element = $(`section[data-index="${markerIndex}"]`)[0];
    var bounds = element.getBoundingClientRect();
    console.log(bounds.top, bounds.bottom);
    return bounds.top < (window.innerHeight + 100) && bounds.bottom > 100;
}
