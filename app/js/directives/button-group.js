vStudio.directives
  .directive('buttonsRadio', function() {
        return {
            restrict: 'E',
            scope: { 
              model: '='
            },
            controller: function($scope){

                $scope.options = [{"name":"Run","type":"button"},
                                  {"name":"Debug","type":"combo"},
                                  {"name":"Debug1","type":"combo"}];

                $scope.activate = function(option){
                    $scope.model = option;
                };      
            },
            template: "<button ng-repeat='option in options'" +  
                        "type='{{option.type}}' class='btn btn-primary' " +                        
                        "ng-class='{active: option == model}'" +                        
                        "ng-click='activate(option)'>{{option.name}} " +
                      "</button>"
        };
    });