app.controller("cesiumCtrl", function($scope,$http) {
    var viewer = new Cesium.Viewer('cesiumContainer');

	
	$http.get("http://api.openweathermap.org/data/2.5/group?id=3590249,3672521,524901,1273294,1275339,1275004,5115985,1006984,671118,1255364,1816670,1850147,4229546,2657896,292223,6691831&unitsq=metric").success(
	function(response){
		var cityData=response.list;
		var city=[];
		for(var i in cityData){
			var desc='<h2>City :'+cityData[i].name+'</h2><h4>Coord : lon -'+cityData[i].coord.lon+', lat -'+cityData[i].coord.lat+ '</h4><h4>Sunrise :'+cityData[i].sys.sunrise+'</h4><h4>Sunset :'+cityData[i].sys.sunset+'</h4><h4>Weather :'+cityData[i].weather.description+'</h4><h4>Temp :'+cityData[i].main.temp+'</h4><h4>Pressure :'+cityData[i].main.pressure+'</h4>\
			<h4>Humidity :'+cityData[i].main.humidity+'</h4>';
			city[i] = viewer.entities.add({
			name : cityData[i].name,
			description : desc,
			position : Cesium.Cartesian3.fromDegrees(cityData[i].coord.lon, cityData[i].coord.lat),
				point : {
					pixelSize : 4,
					color : Cesium.Color.BLUE,
					outlineColor : Cesium.Color.YELLOW,
					outlineWidth : 2
					},
				label : {
					text : cityData[i].name,
					font : '14pt monospace',
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(0, -9)
				}
			});
		}
	});
});
