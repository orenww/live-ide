vStudio.services.service('VqlService', [function() {
	
	var data = [{
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

	var map = {};

	function createMap(item){

		if(item.children.length == 0){
			map[item.id] = item;
			return map;
		}

		for(var i = 0; i < item.children.length; i++){
			createMap(item.children[i]);
		}		
	};


	var getData = function() {		
		return data;
	};

	var getMap = function() {
		for(var i = 0; i < data.length; i++){
			createMap(data[i]);
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

	// expose the service
	return {
		getData: getData,
		getById: getById,
		getMap:getMap
	}
}]);