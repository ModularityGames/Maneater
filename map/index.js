/* global L */
;(function (window) {
  function init (mapid) {
    var minZoom = 0
    var maxZoom = 5
    var img = [
      8192, // original width of image `karta.jpg`
      8192  // original height of image
    ]

	// Thanks to Project Reality Game team for figuring this out
	// 256 / mapsize (in pixels) = the factor
	var factorx = 0.03125;
	var factory = 0.03125;

	L.CRS.maneater = L.extend({}, L.CRS.Simple, {
	  projection: L.Projection.LonLat,
	  transformation: new L.Transformation(factorx, 0, -factory, 0),

	  scale: function(zoom) {
	  return Math.pow(2, zoom);
	  },

	  zoom: function(scale) {
	  return Math.log(scale) / Math.LN2;
	  },

	  distance: function(latlng1, latlng2) {
	  var dx = latlng2.lng - latlng1.lng,
		dy = latlng2.lat - latlng1.lat;

	  return Math.sqrt(dx * dx + dy * dy);
	  },

	  infinite: true
	});

    // create the map
    var map = L.map(mapid, {
      minZoom: minZoom,
      maxZoom: maxZoom,
	  crs: L.CRS.maneater
    })

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)
	var mapBounds = new L.LatLngBounds(rc.unproject([0, 8192]), rc.unproject([8192, 0]));

    // set the view on a marker ...
    map.setView(rc.unproject([4096, 4096]), 3)

	// add a scale to the map
	L.control.scale().addTo(map)

    // add layer control object
    L.control.layers({}, {
      'Areas': layerAreas(map, rc),
	  'Locations': layerLocations(map, rc),
      'Clicks': layerClicks(map, rc, img),
	  'Points': layerPoints(map, rc)
    }).addTo(map)


    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      noWrap: true,
	  bounds: mapBounds,
      attribution: 'Maneater Game <a href="https://maneatergame.com">World Map</a>',
	  noWrap: true,
	  tms: false
    }).addTo(map)

	// don't allow scrolling past the boundary
	map.on('drag', function() {
		map.panInsideBounds(mapBounds, { animate: false });
	});
  }

  /**
   * layer drawing a polygon
   */
  function layerAreas (map, rc) {
    var points = window.polygon.map(function (point) {
      return rc.unproject([point.x, point.y])
    })
    var layerAreas = L.polygon([points])
    //map.addLayer(layerAreas)
    return layerAreas
  }

  /**
   * layer with red markers
   */
  function layerLocations (map, rc) {
    var imgDir = 'images/'
    var redMarker = L.icon({
      iconUrl: imgDir + 'marker-icon-red.png',
      iconRetinaUrl: imgDir + 'marker-icon-red-2x.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-0, -31],
      shadowUrl: imgDir + 'marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [14, 41]
  })
    var layerLocations = L.geoJson(window.geoInfo, {
      // correctly map the geojson coordinates on the image
      coordsToLatLng: function (coords) {
        return rc.unproject(coords)
      },
      // add a popup content to the marker
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name)
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: redMarker
	  })
      }
    })
    map.addLayer(layerLocations)
    return layerLocations
  }

  /**
   * layer with markers
   */
  function layerClicks (map, rc, img) {
    // set marker at the image bound edges
    var layerClicks = L.layerGroup()
    map.addLayer(layerClicks)

    // set markers on click events in the map
    map.on('click', function (event) {
      // to obtain raster coordinates from the map use `project`
      var coord = rc.project(event.latlng)
      // to set a marker, ... in raster coordinates in the map use `unproject`
      var marker = L.marker(rc.unproject(coord)).addTo(layerClicks)
      marker.bindPopup('[' + Math.floor(coord.x) + ',' + Math.floor(coord.y) + ']').openPopup().on("popupclose", function(e) {
		map.removeLayer(this);
	  })
    })

    return layerClicks
  }

  /**
   * layer using geoJson data for countries adding a circle marker
   */
  function layerPoints (map, rc) {
    var layerPoints = L.geoJson(window.countries, {
      // correctly map the geojson coordinates on the image
      coordsToLatLng: function (coords) {
        return rc.unproject(coords)
      },
      // add a popup content to the marker
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name)
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 14,
          fillColor: '#800000',
          color: '#d10707',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })
      }
    })
    map.addLayer(layerPoints)
    return layerPoints
  }

  init('map')
}(window))
