app.controller('TasksController', ['$scope', '$http', '$controller', function($scope, $http, $controller){
  const ANY = "Any";

  $scope.init = function(){
    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

    $scope.employee = 'All';
    // $scope.status = 'Any';
    $scope.statuses = [ANY, 'Open', 'Closed'];
    // $scope.tasks = [];

    $http.get("/tasks").then(function(response){
      $scope.tasks = response.data["tasks"];
      console.log("tasks", $scope.tasks);
    });

    $http.get("tasks/topics").then(function(response){
      $scope.topics = response.data["topics"]
      $scope.topics.unshift(ANY);
    });
  };

  $scope.remove_location_filter = function(){
    $scope.location_type = null;
    $scope.location_type_num = -1;
    $scope.filter();
  };

  $scope.filter = function(){
    location_id = null;
    if($scope.status == ANY){
      $scope.status = null;
    }
    if($scope.topic == ANY){
      $scope.topic = null;
    }

    if($scope.location_type_num != -1){
      location_id = $scope.get_location_id($scope.location_type_num);
    }
    console.log($scope.employee);
    console.log($scope.status);

    queryParams = {
      "location_id" : location_id,
      "status" : $scope.status,
      "topic" : $scope.topic
    };
    $http.get("/tasks", {params: queryParams}).then(function(response){
      console.log("get called sucess");
      $scope.tasks = response.data["tasks"];
      console.log("tasks", $scope.tasks);
    });
  };

  $scope.setCompleted = function(task){
    console.log("marked as completed");
    $http.put("/tasks/"+ task.id, {completed: true}).then(function(){
      console.log("task updated successfully");
      task.completed = true;
    });
  };

  $scope.task_location_type_value_select = function(index){
    $scope.location_type_value_select(index, function(){
    });
  };

}]);