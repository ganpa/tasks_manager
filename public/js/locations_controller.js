app.controller('LocationSelectController', ['$scope', 'LocationService', function($scope, LocationService){
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

app.controller('NewLocationController', ['$scope', '$controller', '$location', 'Upload', 'LocationService', 
function($scope, $controller, $location, Upload, LocationService){
    
  $scope.init = function(){
    LocationService.get_location_types(function(location_types){
      $scope.name = "location";
      $scope.location_types = location_types;
      $scope.location_type = $scope.location_types[0];
      $scope.location_type_num = 0;
      $scope.location_types_value = [];

    });

    $controller('LocationSelectController', {$scope: $scope});

    $scope.input_type = "Default";
    $scope.input_bulk = false;
    $scope.input_types = ["Default", "File Upload"];
  };

  $scope.input_type_select = function(input_type){
    if(input_type != "Default"){
      $scope.input_bulk = true;
    }
    else{
      $scope.input_bulk = false;
    }
  };

  $scope.select_location_type = function(){
    console.log("Select");
    console.log($scope.location_type);
    $scope.locations = [];
    $scope.location_type_num = $scope.location_types.indexOf($scope.location_type);
    if($scope.location_type_num > 0){
      LocationService.get_location_by_type($scope.location_types[0], function(result){
        $scope.locations[0] = result;  
      });
    }
    $scope.location_types_value = [];
    $scope.location_types_file = [];
  };

  

  $scope.upload = function (file) {
    Upload.upload({
      url: '/locations/',
      method: 'POST',
      data: {file: file}
    }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.create = function(){
    //console.log($scope.district);
    if($scope.input_bulk == true)
      $scope.upload($scope.file);
    else{
      // console.log($scope.locations);
      console.log("location_types_value");
      console.log($scope.location_types_value);
      data = {};
      for(i=0; i<$scope.location_types_value.length; i++){
        data[$scope.location_types[i]] = $scope.location_types_value[i];
      }
      data["location_type"] = $scope.location_type;
      data["input_type"] = $scope.input_type;
      console.log(data);
      LocationService.create_location(data, function(){
        console.log("create success");
      });
      

    }
  };
  
}]);