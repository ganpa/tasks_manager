app.controller('AlertController', ['$scope', 'AlertService', function($scope, AlertService){

  $scope.alert_init = function(){
    $scope.is_alert = false;
    if (AlertService.hasMessage()){
      console.log("hasMessage", AlertService.getMessage());
      $scope.alert(AlertService.getMessage());
      AlertService.clearMessage();
    }
  };

  $scope.alert = function(message){
    console.log("alert  called", message);
    $scope.alert_message = message;
    $scope.is_alert = true;

  };
}]);