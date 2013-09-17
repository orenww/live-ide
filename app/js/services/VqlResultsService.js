vStudio.services.factory('VqlResultsService', function($http){
	var data = {};	
	var promise;
	var debugResultData = {};
	var runResultData = {};

	var fetch = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get('mock/vql-run.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			data = response.data;
		});
		// Return the promise to the controller
		return promise;
	};

	var getData = function () {
		return data;
	};

	var debug = function(vql,step) {
		promise = $http.get('mock/vql-debug.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			debugResultData = response.data;
		});
		// Return the promise to the controller
		return promise;
	};

	var getDebugData = function () {
		return debugResultData;
	};

	var run = function() {
		promise = $http.get('mock/vql-run.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			runResultData = response.data;
		});
		// Return the promise to the controller
		return promise;
	};

	var getRunData = function () {
		return runResultData;
	};

	fetch();

	return {
		fetch: fetch,
		getData: getData,
		debug: debug,
		getDebugData: getDebugData,
		run:run,
		getRunData: getRunData
	}
});