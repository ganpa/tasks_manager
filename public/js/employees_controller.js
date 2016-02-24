app.controller('NewEmployeeController', ['$scope', '$http', '$controller', '$location', 'LocationService', 
  function($scope, $http, $controller, $location, LocationService){

  $scope.init = function(){
    //$scope.positions = ['Collector', 'SubCollector', 'Tashildar', 'Zonal Deputy Tashildar', 'Revenue Inspector', 'VAO'];
    //$scope.position = 'Tashildar';
    $controller('LocationSelectController', {$scope: $scope});

    $http.get('/employees/positions').then(function(response){
      $scope.positions = response.data["positions"];
    });

    LocationService.get_location_types(function(location_types){
      $scope.location_types = location_types;
      $scope.location_type = $scope.location_types[0];
      $scope.location_type_num = 0;
      $scope.location_types_value = [];
      console.log("location_types", $scope.location_types);
    });
    // $http.get('/locations/types').then(function(response){
    //   $scope.location_types = response.data["location_types"];
    //   console.log("location_types", $scope.location_types);
    // });

    $scope.locations = [];

  };

  $scope.create = function(){
    data = {
      "name" : $scope.name,
      "position": $scope.position,
      "location": "Cheranmahadevi"
    };

    $http.post("/employees", data).then(function(){
      console.log("post success");
    });

    //$location.path("/employees/");
  };

  $scope.position_select = function(position){
    $scope.position_num = $scope.positions.indexOf(position);
    queryParams = {
      "employee_type" : position
    };

    $http.get('/locations/types', {params : queryParams}).then(function(response){
      location_type = response.data["location_type"];
      console.log("location_type", location_type);
      $scope.location_type_num = $scope.location_types.indexOf(location_type);
    });

    LocationService.get_location_by_type($scope.location_types[0], function(result){
      $scope.locations[0] = result;  
    });

  };
}]);