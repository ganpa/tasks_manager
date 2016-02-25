app.factory('EmployeeService', ['$http', function($http){
  var employee_service = {};

  employee_service.get_employee_by_location = 
  function(parent_type, parent_value, location_type, call_back){
    queryParams = {
      "location_type" : location_type,
      "parent_type" : parent_type,
      "parent_value": parent_value
    };
    var result = [];
    $http.get("/locations", {params : queryParams}).then(function(response){
      location_type_objects = response.data[location_type];
      for(i=0; i < location_type_objects.length; i++){
        result[i] = location_type_objects[i]["name"];
      }
      call_back(result);
    });
  };

  return employee_service;
}]);
