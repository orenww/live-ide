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
	       	}
	    };
	    
	});


	app.directive('schemaTables', function(){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            tables: '=items'	           
	        },
	        
	        templateUrl:'js/directives/schema/tablesTemplate.html',
	        
	       	link: function ( scope, element, attrs ) {	       		
	       	}
	    };
	    
	});

})( angular );