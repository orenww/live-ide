vStudio.services.factory('VqlResultsService', function($http){
	var data = {};
	var promise;

	var fetch = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get('mock/vql-debug.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			data = response.data;
		});
		// Return the promise to the controller
		return promise;
	};

	var getData = function () {
		return data;
	};

	fetch();

	return {
		fetch: fetch,
		getData: getData
	}
});