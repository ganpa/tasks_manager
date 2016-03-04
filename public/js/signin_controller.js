app.controller('SigninController', ['$scope', '$rootScope', '$state', '$controller', 'SigninService', 'AlertService',
  function($scope, $rootScope, $state, $controller, SigninService, AlertService){
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
      $rootScope.account = response.data.account;
      $state.transitionTo("dashboard");
    }, function(response){
        //alert("hee");
        $scope.is_alert = true;
        $scope.alert("Signin Failed. Please try again", false);
        // $state.transitionTo("alert");
        console.log(response);
    });
  };
}]);