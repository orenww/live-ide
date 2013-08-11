'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function($scope) {
  	var editor = ace.edit("editor");
  }])
  .controller('MyCtrl2', [function() {

  }]);