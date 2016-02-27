app.controller('SignupController', ['$scope', '$http', '$state', '$controller', 
  function($scope, $http, $state, $controller){
    $scope.signup = function(){
      console.log("name", $scope.name);
      data = {
        'name' : $scope.name,
        'password' : $scope.password,
        'password_confirmation' : $scope.password_confirmation
      };
      $http.post('/signup', data).then(function(response){
        console.log("done");
      });
    };

}]);