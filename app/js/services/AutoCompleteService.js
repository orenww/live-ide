vStudio.services.factory('AutoCompleteService', function($http, $q) {	
	//console.log("AutoCompleteService LOADED!!!!!")
	var data = {};	
	
	var promise;

	var getData = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get('mock/intellisense.rules.json').then(parseIntelliData);
		// Return the promise to the controller
		return promise;
	};

	var parseIntelliData = function(response) {
		// The then function here is an opportunity to modify the response
		data = response.data;

		// if(typeof(Storage)!=="undefined"){

		// 	Storage.prototype.setObject = function(key, value) {
		// 		this.setItem(key, JSON.stringify(value));
		// 	}

		// 	Storage.prototype.getObject = function(key) {
		// 		return JSON.parse(this.getItem(key));
		// 	}				
			
		//   	sessionStorage.setObject('kewords',data.keywords);
		//   	sessionStorage.setObject('tables',data.tables);
		//   	sessionStorage.setObject('snippets',data.snippets);
		  	
		  	
		//   	// sessionStorage.setObject = data.keywords.keyword1;
		//   	// sessionStorage.tables = data.tables.table1;

		// }else{
		//   // Sorry! No web storage support..
		// }

		return data;
	}

	var getInteliData = function(){
		return data;
	}
	getData();

	// expose the service
	return {
		getData: getData,
		getInteliData: getInteliData
	}
});