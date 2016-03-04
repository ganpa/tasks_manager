app.factory('LocationService', ['$http', function($http){
  var location_service = {};

  location_service.get_location_types = function(call_back){
    $http.get("/locations/types").then(function(response){
      location_types = response.data["location_types"];
      call_back(location_types);
    }, 
    function(response){
      console.log("Error");
    });
  };

  location_service.get_sublocations = function(location_id, success, error){
    $http.get("/locations/" + location_id + "/sublocations").then(function(response){
      success(response);
    }, function(response){
      if(error != null){
        error(response);
      }
    });
  };

  location_service.get_location_by_type = function(location_type, call_back){
    queryParams = {
      "location_type" : location_type
    };
    var result = [];
    $http.get("/locations", {params : queryParams}).then(function(response){
      location_type_objects = response.data[location_type];
      for(i=0; i < location_type_objects.length; i++){
        result[i] = location_type_objects[i];
      }
      console.log("result", result);
      call_back(result);
    });
  };

  var get_location_by_type_and_parent = 
  function(parent_type_num, parent_type, parent_value, location_type, call_back){
    queryParams = {
      "location_type" : location_type,
      "parent_type" : parent_type,
      "parent_value": parent_value
    };
    var result = [];
    $http.get("/locations", {params : queryParams}).then(function(response){
      location_type_objects = response.data[location_type];
      for(i=0; i < location_type_objects.length; i++){
        result[i] = location_type_objects[i];
      }
      call_back(result);
    });
  };

  location_service.create_location = function(data, success, failure){
    $http.post("/locations", data).then(function(){
      success();
    }, function(response){
      console.log("erro response", response);
      failure();
    });
  };

  return location_service;

}]);