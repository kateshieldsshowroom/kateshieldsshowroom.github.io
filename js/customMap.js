
var katieshieldsshowroom = (function () {
	mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0ZXNoaWVsZHNzaG93cm9vbSIsImEiOiJjamFzd2Q4bDkxcWRqMzNwZjRvZGllaGtsIn0.UK4sIHG0_cPL7IOUqgAWdQ';
	function initMap() {
		var map = new mapboxgl.Map({
    		container: 'map',
    		style: 'mapbox://styles/mapbox/streets-v9'
		});
	};
	
	
	
	
	
	
	var AIRTABLE = AIRTABLE || {};
	//https://api.airtable.com
	//"https://api.airtable.com/v0/appI99pTdQ65gXGFr/tblNzlhxuKCo39dTgd05";
	//AIRTABLE.baseURL = "https://api.airtable.com/v0/appjsGfiMIXTsey7d";
	AIRTABLE.baseURL = "https://api.airtable.com/v0/app5oElIgAfd3YE1U";

	
	AIRTABLE.auth = AIRTABLE.auth || {};
	AIRTABLE.auth.enabled = AIRTABLE.auth.enabled || false;

	AIRTABLE.auth.token = "keygkiPVOSbRk6vll"
	//AIRTABLE.auth.token = "keyLWYCJzvsqf5nwR";

	var setAuthHeader = function(xhr) {
    	xhr.setRequestHeader("Authorization", "Bearer " + AIRTABLE.auth.token);
	};

	var sendAjaxRequest = function(endpoint, method, parameters, requiresAuth, onComplete) {
    	var contentType = "";
    	if(method === 'POST' || method === 'PUT' || method === 'PATCH') {
        	contentType = "application/json";
    	}
    	var beforeSend = function() {};
    	if(AIRTABLE.auth.enabled && requiresAuth) {
        	beforeSend = setAuthHeader;
    	}
    	var req = $.ajax({
        	url: AIRTABLE.baseURL + endpoint,
        	type: method,
        	dataType: 'json',
        	data : parameters,
        	contentType: contentType,
        	beforeSend: beforeSend,
    	});
    	req.always(onComplete);
	};

	/* Send a raw api request on an endpoint.
 	*/
	AIRTABLE.api = function(endpoint, method, parameters, callback) {
    	sendAjaxRequest(endpoint, method, parameters, true, function(jqXHR, textResponse) {
        	var response = {};
        	if(textResponse != 'success') {
            	response.error = { 'HTTPCode' : jqXHR.status };
            	try {
                	var errorJSON = JSON.parse(jqXHR.responseText);
                	$.extend(response.error, errorJSON);
            	} catch(e) {
           	 }
        	} else {
            	response = jqXHR;
        	}
        	if(callback) {
            	callback(response);
        	}
    	});
	};
	
	AIRTABLE.account = AIRTABLE.account || {};
	
	AIRTABLE.account.ApplicantTracking = function(callback) {
    	AIRTABLE.api("/ALL%20ACCOUNTS%20&%20PROSPECTS", 'GET', {api_key: "keygkiPVOSbRk6vll"}, callback);
    	//https://api.airtable.com/v0/app5oElIgAfd3YE1U/tblZ0iLBcKVOf7cLp?maxRecords=28
    	//$ curl https://api.airtable.com/v0/app5oElIgAfd3YE1U/ALL%20ACCOUNTS%20&amp;%20PROSPECTS?api_key=YOUR_API_KEY
    	//$ curl "https://api.airtable.com/v0/app5oElIgAfd3YE1U/ALL%20ACCOUNTS%20%26%20PROSPECTS?maxRecords=3&view=ALL%20ACCOUNTS%20%26%20PROSPECTS" \
	};
	
	AIRTABLE.account.ApplicantTracking2 = function(callback) {
		AIRTABLE.api("/ALL%20ACCOUNTS", "GET", {api_key: "keygkiPVOSbRk6vll", maxRecords: 200}, callback);
	};
	
	// list specific account details
	function getAccount() {
		AIRTABLE.account.ApplicantTracking(function(response) {
			console.log(response);
		});
	};
	
	
	getAccount();
	
	/*
	Here is what I did: (Maybe it is useful for others)
url = "https://api.airtable.com/v0/appI99pTdQ65gXGFr/tblNzlhxuKCo39dTgd05"
querystring = {“fields[]”:[“short_property”,“unit”,“ref”,“short_name_unique_id”]}
headers = {‘authorization’: “Bearer [you need to add your own key here]” }
response = requests.request(“GET”, url, headers=headers, params=querystring)
return {‘Test’: 1234, ‘JsonString’: response.text}
*/
	
	return {
		initMap: initMap
	};
})();

$(document).ready(function() {
	katieshieldsshowroom.initMap();
});




