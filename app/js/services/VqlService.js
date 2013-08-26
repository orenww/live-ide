vStudio.services.factory('VqlService', function($http, $q) {
	
		var data={};	
		var data111 = [{
		"label": "CVS Caremark",
		"id": "role1",
		"children": [{
				"label": "MMD MEDICAID",
				"id": "role11",
				"vqlId": "vqlId555",
				"vql": "select * from medicines where {p2}",
				"children": []
			},

			{
				"label": "FDS MediSleep",
				"id": "role12",

				"children": [{
					"label": "Day Care",
					"id": "role121",
					"children": [{
						"label": "PLACEBO",
						"id": "role1211",
						"vqlId": "vqlId111",
						"vql": "select * from medicines where [p2]",

						"children": []
					}, {
						"label": "500 mg",
						"id": "role1212",
						"vqlId": "vqlId222",
						"vql": "select * from medicines where {p1}",
						"children": []
					}]
				}]
			}
		]}, 

		{
			"label": "Admin",
			"id": "role2",
			"vqlId": "vqlId333",
			"vql": "select * from medicines where {p5}",
			"children": []
		}, 
		{
			"label": "Guest",
			"id": "role3",
			"vqlId": "vqlId444",
			"vql": "select * from medicines where [p3]",
			"children": []
		}];

	var param;

	var getData = function() {
		// $http returns a promise, which has a then function, which also returns a promise
		var promise = $http.get('mock/app.descriptor.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			console.log(response);
			// The return value gets picked up by the then in the controller.
			var arr = jQuery.map(response.data, function (value, key) {
				if(key == "children"){
					return value;
				}
				if(key == "defaultParams"){
					param = value;		
				}				
			});


			//data = data111;
			data = arr;
			return data;

		});
		// Return the promise to the controller
		return promise;
	};


	var map = {};

	function createMap(item){

		if(!item.hasOwnProperty("children") || item.children.length == 0){
			map[item.id] = item;
			return map;
		}

		for(var i = 0; i < item.children.length; i++){
			createMap(item.children[i]);
		}		
	};


	var getMap = function() {
		if(jQuery.isEmptyObject(map)){
			for(var i = 0; i < data.length; i++){
				createMap(data[i]);
			}			
		}

		return map;
	};

	var getById = function(id) {
		var _map = getMap();
		if (!id) {
			return {};
		}
		return _map[id] || {};
	};

	var getParam = function(){
		return param;
	}

	// expose the service
	return {
		getData: getData
		,getById: getById
		,getMap:getMap
		,getParam:getParam
	}
});