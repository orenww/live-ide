// vStudio.controllers.controller('ParamsCtrl', function($scope, VqlService){

angular.module('params', ['vStudio.services'])

.controller('ParamsCtrl', function($scope, VqlService){

	$scope.params = '';

	VqlService.getData().then(function(){
		$scope.params = VqlService.getParams();
	});
});