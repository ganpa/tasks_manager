app.controller('NewLocationController', ['$scope', '$controller', '$location', 
    'Upload', 'LocationService', 'SigninService',
function($scope, $controller, $location, Upload, LocationService, SigninService){
    
  $scope.init = function(){
    SigninService.is_signed_in();

    $scope.name = "location";

    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

    $controller('AlertController', {$scope: $scope});
    $scope.alert_init();

    $scope.input_type = "Default";
    $scope.input_bulk = false;
    $scope.input_types = ["Default", "File Upload"];
  };

  $scope.input_type_select = function(input_type){
    $scope.input_type = input_type;
    if(input_type != "Default"){
      $scope.input_bulk = true;
    }
    else{
      $scope.input_bulk = false;
    }
  };

  $scope.upload = function (data) {
    Upload.upload({
      url: '/locations/',
      method: 'POST',
      data: data
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
    data = {};
    data["location_type"] = $scope.location_type;

    console.log("location_type_num", $scope.location_type_num);

    if($scope.location_type_num > 0)
      data["parent_id"] = $scope.get_location_id($scope.location_type_num-1);
    else
      data["parent_id"] = -1;

    if(!($scope.input_type == "Default")){
      data["input_type"] = "file";
      data["file"] = $scope.location_types_file[$scope.location_type_num];
      $scope.upload(data);
    }
    else{
      data["input_type"] = "simple";
      data["location_name"] = $scope.location_types_value[$scope.location_type_num];
      LocationService.create_location(data, function(){
        console.log("create success");
        $scope.alert("Successfully created location " + data["location_name"]);
      }, function(response){
          //console.log("failed to create location");
          $scope.alert("Failed to create location");
      });
    }
    console.log("data", data);

  };
  
}]);