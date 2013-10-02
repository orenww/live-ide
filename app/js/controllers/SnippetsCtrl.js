vStudio.controllers.controller('SnippetsCtrl', function ($scope, AceSnippetsExtensionService) {
  // $scope.todos = [
  //   {text:'learn angular', done:true},
  //   {text:'build an angular app', done:false}];

  $scope.getSnippets = function() {
    var debug  = AceSnippetsExtensionService.getSnippets();
    return AceSnippetsExtensionService.getSnippets();
  };

  // $scope.remaining = function() {
  //   var count = 0;
  //   angular.forEach($scope.todos, function(todo) {
  //     count += todo.done ? 0 : 1;
  //   });
  //   return count;
  // };

  // $scope.archive = function() {
  //   var oldTodos = $scope.todos;
  //   $scope.todos = [];
  //   angular.forEach(oldTodos, function(todo) {
  //     if (!todo.done) $scope.todos.push(todo);
  //   });
  // };
    
  //   $scope.getDisplay = function(){
  //       return "DISPLAY";
  //   }
});