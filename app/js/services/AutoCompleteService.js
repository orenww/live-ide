vStudio.services.factory('AutoCompleteService', function($http, $q, Constants) {	
	//console.log("AutoCompleteService LOADED!!!!!")
	var data = {};	
	
	var promise;

	var snippets;

	var url = Constants.SCHEMA_URL;

	var getData = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		//promise = $http.get('mock/intellisense.rules.json').then(parseIntelliData);
		//promise = $http.get('http://localhost:8080/DbSchemeServlet').then(parseIntelliData);
		promise = $http.get(url).then(parseIntelliData);
		
		// Return the promise to the controller
		return promise;
	};

	var parseIntelliData = function(response) {
		// The then function here is an opportunity to modify the response
		data = response.data;		

		return data;
	}

	var getInteliData = function(){
		return data;
	}

	var getSnippets = function () {
		return data.snippets;
	}

	var getSchema = function () {
		return data[Constants.TABLES];
	}
	
	getData();

	// expose the service
	return {
		getData: getData,
		getInteliData: getInteliData,
		getSnippets: getSnippets,
		getSchema: getSchema
	}
});