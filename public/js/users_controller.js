app.controller('UsersController', ['$scope', '$http', '$state', '$controller', 'SigninService',
  function($scope, $http, $state, $controller, SigninService){
    SigninService.is_signed_in();

    $scope.is_alert = false;
    $controller('AlertController', {$scope: $scope});

    $http.get('/users').then(function(response){
        console.log("Success got users", response);
        $scope.users = response.data.users;
    }, function(response){
        console.log("failed to get users", response);
    });
    

}]);