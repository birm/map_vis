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
  valueField: '_show_data'
};

var heatmapLayer = new HeatmapOverlay(cfg);

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

var mapData = []


function changeData(){
  // get which field to show
  field = document.getElementById("field_selector").value
  for (let i=0; i<mapData.length; i++){
    let v = mapData[i][field]
    if (v == "No"){
      v = 0
    }
    else if (v== "Yes"){
      v = 100
    }
    mapData[i]['_show_data'] = v
  }
  heatmapLayer.setData({data:mapData});
}

// data preproc
d3.csv("data.csv").then(data=>{
  mapData = data
  let selector = document.getElementById("field_selector")
  // !may be issue if user changes selector before this finishes
  selector.onchange = changeData;
  // populate the selector
  for(let i of Object.keys(mapData[0])){
    let opt = document.createElement("option")
    opt.value = i
    opt.innerHTML = i
    selector.appendChild(opt)
  }
  // handle data
  changeData()
});
