// let's try a heatmap



var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 48,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": false,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'Stop_Lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'Stop_Lon',
  // which field name in your data represents the data value - default "value"
  valueField: 'Total_Weekly_Avg_Pre_COVID_Boardings'
};

var heatmapLayer = new HeatmapOverlay(cfg);

d3.csv("data.csv").then(data=>{
  console.log(data.length)
  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: 'OSM',
      maxZoom: 18
    }
  );

  var map = new L.Map('map', {
    center: new L.LatLng(33.8366054, -84.3584737),
    zoom: 11,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.setData({data:data});
});
