vStudio.services.factory('IntellisenseService', function($http, $q) {	
	
	var data = {};	
	
	var promise;

	var getData = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get('mock/intellisense.rules.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			data = response.data;

			if(typeof(Storage)!=="undefined"){

				Storage.prototype.setObject = function(key, value) {
    				this.setItem(key, JSON.stringify(value));
				}

				Storage.prototype.getObject = function(key) {
    				return JSON.parse(this.getItem(key));
				}				
				
			  	sessionStorage.setObject('kewords',data.keywords);
			  	sessionStorage.setObject('tables',data.tables);
			  	
			  	// sessionStorage.setObject = data.keywords.keyword1;
			  	// sessionStorage.tables = data.tables.table1;

			}else{
			  // Sorry! No web storage support..
			}

			return data;
		});
		// Return the promise to the controller
		return promise;
	};

	
	// expose the service
	return {
		getData: getData		
	}
});