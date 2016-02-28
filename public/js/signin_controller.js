app.controller('SigninController', ['$scope', '$state', '$controller', 'SigninService', 'AlertService',
  function($scope, $state, $controller, SigninService, AlertService){
  $scope.remember_me = false;
  // $scope.is_alert = false;
  $controller("AlertController", {$scope:$scope});
  $scope.alert_init();
  // if (AlertService.hasMessage()){
  //   console.log("hasMessage", AlertService.getMessage());
  //   $scope.alert(AlertService.getMessage());
  //   AlertService.clearMessage();
  // }

  $scope.signin = function(){
    $scope.is_alert = false;
    data = {
      "name" : $scope.name,
      "password" : $scope.password,
      "remember_me" : $scope.remember_me
    };

    SigninService.signin(data, function(response){
      console.log("response", response);
      $state.transitionTo("dashboard");
    }, function(response){
        //alert("hee");
        $scope.alert(response.data.messages[0]);
        console.log(response);
    });
  };
}]);