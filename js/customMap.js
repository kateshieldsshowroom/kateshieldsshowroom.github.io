
var katieshieldsshowroom = (function () {
	mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0ZXNoaWVsZHNzaG93cm9vbSIsImEiOiJjamFzd2Q4bDkxcWRqMzNwZjRvZGllaGtsIn0.UK4sIHG0_cPL7IOUqgAWdQ';
	function initMap() {
		var map = new mapboxgl.Map({
    		container: 'map',
    		style: 'mapbox://styles/mapbox/streets-v9'
		});
	};
	
	return {
		initMap: initMap
	};
})();

$(document).ready(function() {
	katieshieldsshowroom.initMap();
});




