app.controller('SignupController', ['$scope', '$location', '$http', '$state', '$controller', 
  function($scope, $location, $http, $state, $controller){

    // host = $location.host();
    // console.log("host", host);
    absUrl = $location.absUrl();
    vals = absUrl.split("//");
    var protocol = vals[0];
    var host = vals[1].split("/")[0];
    console.log("absUrl", $location.absUrl(), absUrl.split("//"), this.protocol, this.host);


    // $controller('LocationSelectController', {$scope: $scope});
    // $scope.init_location_select();
    $controller('AlertController', {$scope: $scope});
    $scope.alert_init();

    $scope.location_type = "Location Type";
    $scope.account = {};
    $scope.user = {};
    $http.get("/accounts/location_types").then(function(response){
      $scope.location_types = response.data["location_types"];
      console.log("location_types", $scope.location_types);
    }, 
    function(response){
      console.log("Error");
      $state.transitionTo("server_error");
    });

    $scope.create_account = function(){
      console.log("account", $scope.account);
      console.log("user", $scope.user);

      data = {
        "account" : $scope.account,
        "user" : $scope.user
      };

    console.log(protocol + "//" + $scope.account.subdomain + "." + host + "/#/" + "dashboard");


      $http.post("/accounts", data).then(function(response){
          console.log("success", response);
          //$state.transitionTo("dashboard");
          // console.log("$location.absUrl()", $location.absUrl());
          // $location.absUrl("http://"+$scope.account.subdomain+"."+$location.host()+":3000"+"/#/dashboard");
          $location.absUrl(protocol + "//" + $scope.account.subdomain + "." + host + "/#/" + "dashboard");
          // console.log(this.protocol + "//" + $scope.account.subdomain + "." + this.host + "/#/" + "dashboard");
        },
        
        function(response){
          console.log("failed", response);
          $scope.alert("Failed to create account " + $scope.account.name);

      });
    };
  
}]);

