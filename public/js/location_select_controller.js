app.controller('LocationSelectController', ['$scope', 'LocationService', function($scope, LocationService){
  
  $scope.init_location_select = function(){

    LocationService.get_location_types(function(location_types){
      $scope.location_types = location_types;
      $scope.location_type = $scope.location_types[0];
      $scope.location_type_num = 0;
      $scope.location_types_value = [];
      console.log("location_types", $scope.location_types);
    });
  };

  $scope.location_type_value_select = function(index){
    if(($scope.location_type_num == index+1 && $scope.name == "location") || 
        $scope.location_type_num == index){
      console.log("return");
      return;
    }
    
    console.log("index", index);
    parent_location_type = $scope.location_types[index];
    parent_location_type_value = $scope.location_types_value[index];
    console.log("location_type", parent_location_type);
    console.log("location_type_value", parent_location_type_value);
    
    LocationService.get_location_by_type_and_parent(index, 
      parent_location_type, parent_location_type_value, $scope.location_types[index+1], 
      function(result){
        $scope.locations[index+1] = result;
        console.log($scope.locations[index+1]);

        if($scope.locations[index+1].length == 0){
          $scope.location_type_num = index+1;
          $scope.location_type = $scope.location_types[index+1];
        }
    });

    for(i=index+2; i<$scope.location_type_num; i++){
      $scope.locations[i] = [];
    }
  };

}]);