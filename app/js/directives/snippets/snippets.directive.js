(function ( angular ) {
	'use strict';

	var app = angular.module( 'snippets', [] );
	
	app.directive('snippet', function(AceSnippetsExtensionService){
	   
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            data: '=item'
	        },
	        
			templateUrl:'js/directives/snippets/snippetTemplate.html',
	   
	        link: function ( scope, element, attrs ) {	       		
	       	},

	       	controller: function($scope) {
	       		$scope.data.orgContent = $scope.data.content;
	   		
	       		var content = $scope.data.content;
	       		var contentArray = content.split("\n\t");
	       		$scope.data.content = contentArray[1];
	       		

	       		if($scope.data.description != undefined){
	       			$scope.isDescription = true;	       			
	       		}else{
	       			$scope.isDescription = false;	       			
	       		}


	       		//Read write mode
	       		$scope.mode = "read";
	       		$scope.isReadMode = true;
	       		$scope.changeMode = function(){
                	if($scope.isReadMode){
            			$scope.isReadMode = false;
						$scope.mode = "edit";            			
                	}else{
						$scope.isReadMode = true;
						$scope.mode = "read";
                	}
  				}

  				//Expand Collapse Snippet
	       		$scope.snippetExpandClass = "";
	       		$scope.iconExpandClass = "";
                $scope.expandCollapseSnippet = function(){
                	if($scope.iconExpandClass == ""){
						$scope.iconExpandClass = "icon-rotate-90";
						$scope.snippetExpandClass = "snippet-expand";
                	}else{
                		$scope.iconExpandClass = "";
                		$scope.snippetExpandClass = "";
                	}
  				}

  				//Update
  				$scope.update = function(){  					
  					$scope.changeMode();
  					AceSnippetsExtensionService.editSnippet($scope.data.name,$scope.data.description,$scope.data.content);
  				}  				

  				//Delete
  				$scope.delete = function(){
  					$scope.changeMode();
  					AceSnippetsExtensionService.deleteSnippet($scope.data.name);
  				}
  				
	       		return $scope;
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