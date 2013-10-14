(function ( angular ) {
	'use strict';

	var app = angular.module( 'snippets', [] );
	
	app.directive('snippet', function(){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            data: '=item'
	        },
	        
			templateUrl:'js/directives/snippets/snippetTemplate.html',
	   
	        link: function ( scope, element, attrs ) {	       		
	       	}	     
	    };	    
	});


	app.directive('snippetsList', function(){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            snippets: '=items',
				search: '='
	        },
	        
	        templateUrl:'js/directives/snippets/snippetsTemplate.html',
	        
	       	link: function ( scope, element, attrs ) {	       		
	       	}
	    };
	    
	});

})( angular );