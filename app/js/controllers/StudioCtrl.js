vStudio.controllers.controller('StudioCtrl', function($scope, Registry) {
	$scope.onResize = function (paneName, paneElement) {
		console.log("StudioCtrl - " + paneName);
		Registry.setLayout(paneName);
	};
})