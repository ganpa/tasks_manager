app.controller('SigninController', ['$scope', '$state', 'SigninService', function($scope, $state, SigninService){
  $scope.remember_me = false;

  $scope.signin = function(){
    data = {
      "name" : $scope.name,
      "password" : $scope.password,
      "remember_me" : $scope.remember_me
    };

    SigninService.signin(data, function(response){
      console.log("response", response);
      $state.transitionTo("dashboard");
    });
  };
}]);