app.controller('SignupController', ['$scope', '$http', '$state', '$controller', 
  function($scope, $http, $state, $controller){
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
      }, function(response){
        console.log("response", response);
        //$scope.alert_message = response.data.messages["password"]
        $scope.alert("password " + response.data.messages["password"][0]);
      });
    };

}]);