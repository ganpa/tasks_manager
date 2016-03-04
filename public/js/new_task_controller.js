app.controller('NewTaskController', ['$rootScope', '$scope', '$state', '$http', '$controller', 
  '$location', 'EmployeeService', 'AlertService', 'SigninService',
  function($rootScope, $scope, $state, $http, $controller, $location, EmployeeService, AlertService, SigninService){
  
  $scope.init = function(){
    SigninService.is_signed_in();

    $controller('AlertController', {$scope: $scope});
    $scope.alert_init();

    console.log("init");
    // $rootScope.alert_message = null;
    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

    $scope.staff = 'A1';
    $scope.staffs = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];
    $scope.add_user = false;
    $scope.task = {};
    $scope.task.file_nums = [];
    $scope.task.employee = {}
    $scope.task.location = {};
    $scope.num_files = [{"show":true}];
  }

  $scope.select_level = function(){
    $scope.select_location_type();
    queryParams = {
      "location_type" : $scope.location_type
    };
    $http.get('/employees/positions', { params : queryParams}).then(function(response){
      $scope.task.employee = {};
      $scope.task.employee.position = response.data["position"];
    });

  };

  $scope.task_location_type_value_select = function(index){
    $scope.location_type_value_select(index, function(){
      console.log("task callback");
      console.log("locations", $scope.locations[index]);
      console.log("locations_ids", $scope.location_ids[index]);
      if(index == $scope.location_type_num){
        var location_id = $scope.get_location_id(index);
        $http.get("/employees", {params : {"location_id" : location_id}}).then(function(response){
          console.log("data", response.data);
          if(response.data["employee"] != null){
            $scope.task.employee.name = response.data["employee"].name;
          }
        });
      }
    });
  };

  $scope.create = function(task){
    index = $scope.location_type_num;
    task.location.id = $scope.get_location_id(index);
    console.log("location_id", task.location.id);
    console.log(task);
    $http.post("/tasks", task).then(function(response){
      console.log("task post done");
      //$rootScope.alert_message = "Successfully created task with id #" + response.data["id"];
      console.log("task respnose", response);
      //AlertService.clearMessage();
      //AlertService.setMessage("Successfully created with tasks with id " + response.data.id);
      $scope.alert("Successfully created task with id " + response.data.id + " ! ", true);
      $state.transitionTo("alert");
      //$location.path("/tasks");
    }, function(response){
        console.log("respnose", response);
        $scope.alert("Failed to create task !", false);
        $state.transitionTo("alert");
    });
  }

  $scope.goto_create_location = function(){
    $location.path("/locations/new");
  };

  $scope.goto_tasks = function(){
    $location.path("/tasks");
  };

  $scope.add_file = function(){
    $scope.num_files[$scope.num_files.length -1 ].show = false;
    $scope.num_files.push({"show":true});
  };

  $scope.remove_file = function(index){
    $scope.num_files.splice(index, 1);
    $scope.task.file_nums.splice(index, 1);
  };
}]);