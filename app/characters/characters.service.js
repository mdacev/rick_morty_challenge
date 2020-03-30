angular.module('charactersService', [])//Declaramos el modulo
.factory('charactersService', function($http) { //declaramos la factory
	return {
        
         getCharactersByApi: function(_path) {
                return $http.get(_path).then(function(response) {
                    return response.data;
                }).catch( error => {
                    return error.data;
                });
            }
    }
});