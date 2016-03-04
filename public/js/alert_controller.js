app.controller('AlertController', ['$scope', '$rootScope', 'AlertService', 
  function($scope, $rootScope, AlertService){

  $scope.alert_init = function(){
    $rootScope.is_alert = false;
    // if (AlertService.hasMessage()){
    //   console.log("hasMessage", AlertService.getMessage());
    //   $scope.alert(AlertService.getMessage(), true);
    //   AlertService.clearMessage();
    // }
  };

  $scope.alert = function(message, is_success){
    console.log("alert  called", message);
    $rootScope.alert_message = message;
    $rootScope.is_alert = true;
    $rootScope.success = is_success;
  };
}]);