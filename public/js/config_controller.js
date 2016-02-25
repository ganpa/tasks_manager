app.controller('ConfigController', ['$scope', '$controller', 
function($scope, $controller){
  $scope.init = function(){
    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();
  };

}]);