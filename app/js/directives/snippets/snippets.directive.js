(function ( angular ) {
	'use strict';

	var app = angular.module( 'snippets', [] );
	
	app.directive('snippet', function(){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            data: '=item',
	            text: '@',
	            display: '&'
	        },
	        
			templateUrl:'js/directives/snippets/snippetTemplate.html',
	    //     template:'<div>' + 
	    //     			'<dl class="frame">' + 
  			// 				'<dt class="name">{{data.name}}</dt>' +
  			// 				'<dd>{{data.content}}</dd>' +
					// 	'</dl>' + 
					// 	// '<button class="btn btn-small btn-primary">Edit</button>' + 
					//  '</div>'
					// ,

	      //   template:	'<li>' + 	            			
							// '<span >{{data.name}} </span>' + 
							// '<span >{{data.content}} </span>' + 
	      //   			'</li>',
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
	            display: '&'
	        },
	        
	        template: '<ul class="unstyled padBottom">' + 
	        			'<snippet ng-repeat="snippet in snippets" item="snippet" text="{{snippet.text}}" display="display()"/>' + 
	        		 '</ul>',
	       	link: function ( scope, element, attrs ) {	       		
	       	}
	    };
	    
	});

})( angular );