app.controller('NewEmployeeController', ['$scope', '$http', '$controller', '$location', 'LocationService', 
  function($scope, $http, $controller, $location, LocationService){

  $scope.init = function(){
    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

    $http.get('/employees/positions').then(function(response){
      $scope.positions = response.data["positions"];
    });

    $scope.locations = [];

  };

  $scope.create = function(){
    data = {
      "name" : $scope.name,
      "position": $scope.position,
      "location_id": $scope.get_location_id($scope.location_type_num)
    };

    $http.post("/employees", data).then(function(){
      console.log("post success");
    });

  };

  $scope.position_select = function(position){
    console.log("position_select");
    $scope.position_num = $scope.positions.indexOf(position);
    queryParams = {
      "employee_type" : position
    };

    $http.get('/locations/types', {params : queryParams}).then(function(response){
      location_type = response.data["location_type"];
      console.log("location_type", location_type);
      $scope.location_type = location_type;
      $scope.select_location_type();
    });



    // LocationService.get_location_by_type($scope.location_types[0], function(result){
    //   result_names = [];
    //   result_ids = [];
    //   $scope.locations = [];
    //   $scope.location_ids = [];
    //   for(i=0; i<result.length; i++){
    //     result_names[i] = result[i].name;
    //     result_ids[i] = result[i].id;
    //   }
    //   $scope.locations[0] = result_names;  
    //   $scope.location_ids[0] = result_ids;

    //   $scope.location_types_value = [];

    // });

  };
}]);