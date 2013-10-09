(function ( angular ) {
	'use strict';

	var app = angular.module( 'schema', [] );
	
	app.directive('column', function(){	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            col: '=item'
	        },
	        
			templateUrl:'js/directives/schema/colTemplate.html',
	   
	        link: function ( scope, element, attrs ) {	       		
	       	}
	    };
	    
	});

	app.directive('table', function(){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            table: '=item'
	            // onclick: "&onclick"	            
	        },	        
			templateUrl:'js/directives/schema/tableTemplate.html',			
	   
	        link: function ( scope, element, attrs ) {	
	        	//scope.cols = scope.table.cols;
	       	},

	       	controller: function($scope) {

	       		$scope.isShow = false;

                $scope.expandTable = function(){
  					$scope.isShow = !$scope.isShow;
  				}
	       		return $scope;
	       	}
	    };	    
	});


	app.directive('schemaTables', function($parse){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        // require: '^ngModel',
	        scope: {
	            tables: '=items',
	            onShow: '&onShow'	            
	        },
	        
	        templateUrl:'js/directives/schema/tablesTemplate.html',
	        
	       	link: function ( scope, element, attrs ) {
	       	}

	     //   	,
	     //   	controller: function($scope) {

      //           $scope.expandTable = function(tbl){
  				// 	console.log("expandTable",tbl);

  				// 	$scope[tbl.id] = true;  					

  				// }
	     //   		return $scope;
	     //   	}
	    };
	    
	});

})( angular );