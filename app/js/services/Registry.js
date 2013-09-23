vStudio.services.factory('Registry', function($http, $q) {
	var data = {
		layout: ''
	};

	var getAppSettings = function() {
		return data;
	};

	var setLayout = function(layout) {
		data.layout = layout;
	};

	var getLayout = function () {
		return data.layout;
	}

	return {
		getAppSettings: getAppSettings,
		setLayout: setLayout,
		getLayout: getLayout
	};
});