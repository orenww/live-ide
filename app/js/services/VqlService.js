vStudio.services.service('VqlService', [function() {
	
	var data = [{
		"label": "CVS Caremark",
		"id": "role1",
		"vql": "select * from medicines where {p3}",

		"children": [{
				"label": "MMD MEDICAID",
				"id": "role11",

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
						"vql": "select * from medicines where [p2]",

						"children": []
					}, {
						"label": "500 mg",
						"id": "role1212",
						"vql": "select * from medicines where {p1}",
						"children": []
					}]
				}]
			}
		]}, 

		{
			"label": "Admin",
			"id": "role2",
			"vql": "select * from medicines where {p5}",
			"children": []
		}, 
		{
			"label": "Guest",
			"id": "role3",
			"vql": "select * from medicines where [p3]",
			"children": []
		}];

	var getData = function() {
		return data;
	};

	var getById = function(id) {
		return "returned by id";
	};

	// expose the service
	return {
		getData: getData,
		getById: getById
	}
}]);