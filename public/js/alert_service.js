app.service('AlertService', ['$rootScope', function($rootScope){
  // $scope.alert = function(message){
  //   console.log("alert  called", message);
  //   $scope.alert_message = message;
  //   $scope.is_alert = true;

  // };

  var alert_service = {};

  $rootScope.alert_message = "NONE";

  alert_service.clearMessage = function(){
    $rootScope.alert_message = "NONE";
  };

  alert_service.setMessage = function(message){
    $rootScope.alert_message = message;
  };

  alert_service.getMessage = function(){
    return $rootScope.alert_message;
  };

  alert_service .hasMessage = function(){
    return $rootScope.alert_message != "NONE";
  };

  return alert_service;
}]);