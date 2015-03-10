app.controller("cesiumCtrl", function($scope,$http) {

	getLocation();

    window.viewer = new Cesium.Viewer('cesiumContainer', {
        sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
    });

	
	//for list of city
	$http.get("http://api.openweathermap.org/data/2.5/group?id=3590249,3672521,524901,1273294,1275339,1275004,5115985,1006984,671118,1255364,1816670,1850147,4229546,2657896,292223,6691831&unitsq=metric").success(
	function(response){
		var cityData=response.list;
		var city=[];
		for(var i in cityData){
		console.log(cityData[i].weather[0].main);
			var desc='<h2>City :'+cityData[i].name+'</h2><h4>Coord : lon -'+cityData[i].coord.lon+', lat -'+cityData[i].coord.lat+ '</h4><h4>Sunrise :'+cityData[i].sys.sunrise+'</h4><h4>Sunset :'+cityData[i].sys.sunset+'</h4><h4>Weather :'+cityData[i].weather[0].description+'</h4><h4>Temp :'+cityData[i].main.temp+'</h4><h4>Pressure :'+cityData[i].main.pressure+'</h4>\
			<h4>Humidity :'+cityData[i].main.humidity+'</h4>';
			
			city[i] = window.viewer.entities.add({
			name : cityData[i].name,
			description : desc,
			position : Cesium.Cartesian3.fromDegrees(cityData[i].coord.lon, cityData[i].coord.lat),
				point : {
					pixelSize : 4,
					color : Cesium.Color.BLUE,
					outlineColor : Cesium.Color.YELLOW,
					outlineWidth : 2
					},
				billboard : {
						image : './icons/'+cityData[i].weather[0].main+'.png',
						width : 24,
						height : 24
				},
				label : {
					text : cityData[i].name,
					font : '12pt monospace',
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(0, -9)
				}
			});
		}
	});
});

function getLocation() {
    if (navigator.geolocation) {
        var position=navigator.geolocation.getCurrentPosition(showPosition);
		window.cposition = position;
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
	window.cposition=position;
	console.log("current location :"+window.cposition);
	forCurrentCity();
}

function forCurrentCity(){
	var xmlhttp = new XMLHttpRequest();
	var lat=window.cposition.coords.latitude;
	var log=window.cposition.coords.longitude;
	var currentLocationURL="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+log;
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var CcityData = JSON.parse(xmlhttp.responseText);
			console.log("current city data :"+CcityData);
						var desc='<h2>City :'+CcityData.name+'</h2><h4>Coord : lon -'+CcityData.coord.lon+', lat -'+CcityData.coord.lat+ '</h4><h4>Sunrise :'+CcityData.sys.sunrise+'</h4><h4>Sunset :'+CcityData.sys.sunset+'</h4><h4>Weather :'+CcityData.weather.description+'</h4><h4>Temp :'+CcityData.main.temp+'</h4><h4>Pressure :'+CcityData.main.pressure+'</h4>\
			<h4>Humidity :'+CcityData.main.humidity+'</h4>';
			var ccity = window.viewer.entities.add({
			name : CcityData.name,
			description : desc,
			position : Cesium.Cartesian3.fromDegrees(CcityData.coord.lon, CcityData.coord.lat),
				point : {
					pixelSize : 4,
					color : Cesium.Color.RED,
					outlineColor : Cesium.Color.BLACK,
					outlineWidth : 2
					},
				billboard : {
					image : './icons/'+CcityData.weather[0].main+'.png',
					width : 24,
					height : 24
				},
				label : {
					text : CcityData.name+" (Current Location)",
					font : '16pt monospace',
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(0, -9)
				}
			});

		}
	}
	xmlhttp.open("GET", currentLocationURL, true);
	xmlhttp.send();
}
