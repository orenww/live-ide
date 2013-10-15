vStudio.services.factory('AutoCompleteService', function($http, $q, Constants) {	
	//console.log("AutoCompleteService LOADED!!!!!")
	var dbData = {};
	var snippetsData = {};
	
	var dbPromise;
	var snippetsPromise;	

	var dbUrl = Constants.DB_STRUCTURE_URL;
	var snippetsUrl = Constants.SNIPPETS_URL;

	var getSchemaData = function() {
		if (!jQuery.isEmptyObject(dbPromise)){
			return dbPromise;
		}

		dbPromise = $http.get(dbUrl).then(parseDBData);
		
		// Return the dbPromise to the controller
		return dbPromise;
	};

	var getSnippetsData = function() {
		if (!jQuery.isEmptyObject(snippetsPromise)){
			return snippetsPromise;
		}

		snippetsPromise = $http.get(snippetsUrl).then(parseSnippetsData);
		
		// Return the schemaPromise to the controller
		return snippetsPromise;
	};


	var parseDBData = function(response) {
		// The then function here is an opportunity to modify the response
		dbData = response.data;		
		return dbData;
	}

	var parseSnippetsData = function(response) {
		// The then function here is an opportunity to modify the response
		snippetsData = response.data;		
		return snippetsData;
	}

	var getDBData = function(){
		return dbData;
	}

	var getSnippets = function () {
		return snippetsData.snippets;
	}

	var getSchema = function () {
		return dbData[Constants.TABLES];
	}
	
	getSchemaData();
	getSnippetsData();

	// expose the service
	return {
		getSchemaData: getSchemaData,
		getSnippetsData:getSnippetsData,
		getDBData: getDBData,
		getSnippets: getSnippets,
		getSchema: getSchema
	}
});