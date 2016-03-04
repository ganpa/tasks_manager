app.controller('NewUserController', ['$scope', '$http', '$state', '$controller', 'SigninService', 

  function($scope, $http, $state, $controller, SigninService){

    SigninService.is_signed_in();
    
  $scope.is_alert = false;
    $controller('AlertController', {$scope: $scope});
    $scope.signup = function(){
      $scope.is_alert = false;
      console.log("name", $scope.name);
      data = {
        'name' : $scope.name,
        'password' : $scope.password,
        'password_confirmation' : $scope.password_confirmation
      };
      $http.post('/signup', data).then(function(response){
        console.log("done");
        $scope.alert("Successfully created user " + data.name + "!", true);
        $state.transitionTo("alert");
      }, function(response){
        console.log("response", response);
        //$scope.alert_message = response.data.messages["password"]
        // $scope.alert("password " + response.data.messages["password"][0]);
        $scope.alert("Failed to create user " + $scope.name + "!", false);
        $state.transitionTo("alert");
      });
    };

}]);