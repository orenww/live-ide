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

	        },
	        
			templateUrl:'js/directives/schema/tableTemplate.html',
			// template: '<div>{{table.id}}</div>' + 
			// '<ul class="unstyled"  item="col">' + 
			// 	'<li>{{col.name}}</li>' + 
			// '</ul>',
	   
	        link: function ( scope, element, attrs ) {	
	        	scope.cols = scope.table.cols;
	       	},

	       	controller: function($scope) {
	       		$scope.isShow = false;
                $scope.expandTable = function(){
  					console.log("expandTable");

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
	        require: '^ngModel',
	        scope: {
	            tables: '=ngModel',
	            onShow: '&onShow'	            
	        },
	        
	        templateUrl:'js/directives/schema/tablesTemplate.html',
	        
	       	link: function ( scope, element, attrs ) {
	       		// var getTable = $parse(attrs.onShow);
	       		// var showGetTable = getTable.assign;

	       		scope.showTable = function(t){
	       			scope.onShow(t);
	       			//showGetTable(scope.$parent, t,a);

	       			scope.expandTable(t);
	       		}
	       	},

	       	controller: function($scope) {

                $scope.expandTable = function(tbl){
  					console.log("expandTable",tbl);

  					$scope.tblId = true;
  					
  					// console.log("expandTable", ev);
  				}
	       		return $scope;
	       	}
	    };
	    
	});

})( angular );