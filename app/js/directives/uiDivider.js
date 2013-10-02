vStudio.directives.directive('uiDivider', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {
		// 	resizeEnd: '&'
		// },
		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, element, attrs) {
			var options = {};

			if (attrs.uiDividerFixed){

				var fixed = attrs.uiDividerFixed.split(',');

				angular.forEach(fixed, function(value, key){
					options[value] = {
					    enableCursorHotkey: false,
					    closable: false,
					    resizable: false,
					    spacing_open: 0,
					    spacing_closed: 0
					}
				});
			}


			if(attrs.uiDividerWidth){
				var sidesWidth = scope.$eval(attrs.uiDividerWidth);

				angular.forEach(sidesWidth, function(value, key){					
					options[key + "__size"] = value;
				});
			}
			
			options.onresize_end = function(paneName, paneElement, paneState, paneOptions, layoutName) {
				if (attrs.resizeEnd && scope[attrs.resizeEnd]) {

					// prepare real array from arguments
					var args = Array.prototype.slice.call(arguments);

					// invoke the callback function in relevant context 
					scope[attrs.resizeEnd].apply(scope, args);
				}
			};

			$timeout(function(){

				element.layout(options);
			}, 100);
		}
	};
});