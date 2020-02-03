'use strict';
 
angular.module('myApp', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/characters'
  });
}]);