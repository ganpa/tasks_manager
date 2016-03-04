app.controller('LocationSelectController', ['$scope', '$rootScope', 'LocationService', 
  function($scope, $rootScope, LocationService){
  
  $scope.init_location_select = function(){
    $scope.locations = [];
    $scope.location_ids = [];
    $scope.location_maps = [];
    LocationService.get_location_types(function(location_types){
      $scope.location_types = location_types;
      //$scope.location_type = $scope.location_types[0];
      $scope.location_type_num = -1;
      $scope.location_types_value = [];
      console.log("location_types", $scope.location_types);
    });
  };

  $scope.get_location_id = function(index){
    if(index >= 0){
      location_id = $scope.location_maps[index][$scope.location_types_value[index]];
      return location_id;
    }
    return -1;
  };

  $scope.location_type_value_select = function(index, call_back){
    if(($scope.location_type_num == index+1 && $scope.name == "location") || 
        $scope.location_type_num == index){
      console.log("return");
      if(call_back != undefined){
        console.log("callback is defined");
        call_back();
      }
      return;
    }
    
    console.log("index", index);
    parent_location_type = $scope.location_types[index];
    parent_location_type_value = $scope.location_types_value[index];
    console.log("location_type", parent_location_type);
    console.log("location_type_value", parent_location_type_value);
    
    location_id = $scope.get_location_id(index);
    for(i=index+1; i<$scope.location_type_num; i++){
      $scope.locations[i] = ["--Select--"];
    }
    // location_id = $scope.location_maps[index][$scope.location_types_value[index]];
    //LocationService.get_location_by_type_and_parent(index, 
    //  parent_location_type, parent_location_type_value, $scope.location_types[index+1], 
    LocationService.get_sublocations(location_id, function(response){
        result = response.data[$scope.location_types[index+1]];
        console.log("result", result);
        result_names = [];
        result_ids = [];
        location_map = {};
        for(i=0; i<result.length; i++){
          result_names[i] = result[i].name;
          result_ids[i] = result[i].id;
          location_map[result[i].name] = result[i].id
        }

        $scope.locations[index+1] = result_names;
        $scope.locations[index+1].unshift("--Select--");
        $scope.location_types_value[index+1] = "--Select--";
        $scope.location_ids[index+1] = result_ids;
        $scope.location_maps[index+1] = location_map;
        console.log("location_maps", $scope.location_maps);

        console.log($scope.locations[index+1]);

        if($scope.locations[index+1].length == 0){
          $scope.location_type_num = index+1;
          $scope.location_type = $scope.location_types[index+1];
        }
    });

    // for(i=index+2; i<$scope.location_type_num; i++){
    //   $scope.locations[i] = [];
    // }
  };

  $scope.select_location_type = function(){
    console.log("Select");
    console.log($scope.location_type);
    $scope.location_type_num = $scope.location_types.indexOf($scope.location_type);
    if(($scope.location_type_num > 0 && $scope.name=="location") || $scope.location_type_num >= 0){
      // LocationService.get_location_by_type($scope.location_types[0], function(result){
      LocationService.get_sublocations($rootScope.account.location_id, function(response){
        result = response.data[$scope.location_types[0]];

        result_names = [];
        result_ids = [];
        location_map = {};

        for(i=0; i<result.length; i++){
          result_names[i] = result[i].name;
          result_ids[i] = result[i].id;
          location_map[result[i].name] = result[i].id

        }
        $scope.locations[0] = result_names;  
        $scope.locations[0].unshift("--Select--");
        $scope.location_types_value[0] = "--Select--";

        $scope.location_ids[0] = result_ids;
        $scope.location_maps[0] = location_map;
        console.log("location_maps", $scope.location_maps);
      });
    }
    $scope.location_types_value = [];
    $scope.location_types_file = [];
  };


}]);