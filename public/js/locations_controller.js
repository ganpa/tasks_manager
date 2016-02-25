app.controller('NewLocationController', ['$scope', '$controller', '$location', 'Upload', 'LocationService', 
function($scope, $controller, $location, Upload, LocationService){
    
  $scope.init = function(){
    $scope.name = "location";

    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

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