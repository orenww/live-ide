vStudio.services.factory('Registry', function($http, $q) {
	var settings = {
		app: {}
	};

	var getAppSettings = function() {
		return settings;
	};

	var setLayout = function(layout) {
		settings.app.layout = layout;
	};

	return {
		getAppSettings: getAppSettings,
		setLayout: setLayout
	};
});