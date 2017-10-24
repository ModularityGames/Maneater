;(function (window) {
  // geoJson definitions for country
  window.countries = [{
    type: 'Feature',
    properties: {
      name: 'Beaches are where you can expect to find a hotpot of human activity.<br><br><strong>Size:</strong> Up to 6ft<br><strong>Fight:</strong> Easy Prey<br><strong>Warning:</strong> Will call for help if attacked'
    },
    geometry: {
      type: 'Point',
      coordinates: [2356, 4982]
    }
},{
  type: 'Feature',
  properties: {
	name: 'Swamps are the domain of alligators, not a natural prey of sharks, but will retaliate if provoked.<br><br><strong>Size:</strong> Up to 11ft<br><strong>Fight:</strong> Difficult<br><img src="images/alligator.png" style="max-width: 100%;" alt="Alligator">'
  },
  geometry: {
	type: 'Point',
	coordinates: [5312, 1944]
  }
},{
  type: 'Feature',
  properties: {
	name: 'The dark depths of caves is the ideal place for an elusive eel to lurk.<br><br><strong>Size:</strong> Up to 8ft<br><strong>Fight:</strong> Aggresive<br><strong>Warning:</strong> Will defend their home, and not welcome intruders when they emerge from the shadows'
  },
  geometry: {
	type: 'Point',
	coordinates: [5816, 5376]
  }
},{
  type: 'Feature',
  properties: {
	name: 'Out in the open ocean, you can expect to find schools of fish, swarms of jellyfish, barracuda and creatures far far bigger.'
  },
  geometry: {
	type: 'Point',
	coordinates: [5664, 7232]
  }
}]

  // geoJson definitions
  window.geoInfo = [{
    'type': 'Feature',
    'properties': {
      'name': 'Gulf Coast'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [1589, 1447]
    }
  }, {
    'type': 'Feature',
    'properties': {
      'name': 'Gulf of Mexico'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [4096, 7000]
    }
  }, {
    'type': 'Feature',
    'properties': {
      'name': 'The Swamps'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [3028, 4096]
    }
  }]

  // polygon
  window.polygon = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 5112
  }, {
    x: 1480,
    y: 4320
  }, {
    x: 1496,
    y: 3832
  }, {
    x: 1792,
    y: 3208
  }, {
    x: 2084,
    y: 2364
  }, {
    x: 2840,
    y: 1416
  }, {
    x: 3752,
    y: 1376
  }, {
    x: 3856,
    y: 1200
  }, {
    x: 4152,
    y: 1208
  }, {
    x: 4512,
    y: 1520
  }, {
    x: 4728,
    y: 1440
  }, {
    x: 4872,
    y: 688
  }, {
    x: 5280,
    y: 608
  }, {
    x: 5680,
    y: 152
  }, {
    x: 6576,
    y: 304
  }, {
    x: 7596,
    y: 408
  }, {
    x: 7964,
    y: 968
  }, {
    x: 8192,
    y: 1304
  }, {
    x: 8192,
    y: 0
  }, {
    x: 0,
    y: 0
  }]
}(window))
