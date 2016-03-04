app.controller('TasksController', ['$rootScope', '$scope', '$state', 
  '$http', '$controller', 'AlertService', 'SigninService',
  function($rootScope, $scope, $state, $http, $controller, AlertService, SigninService){

  const ANY = "Any";

  $scope.init = function(){

    SigninService.is_signed_in();
    console.log("tasksController init");
    $controller('LocationSelectController', {$scope: $scope});
    $scope.init_location_select();

    $controller('AlertController', {$scope: $scope});
    $scope.alert_init();
    // $scope.is_alert = false;
    console.log("is_alert", $scope.is_alert);

    $scope.employee = 'All';
    // $scope.status = 'Any';
    $scope.statuses = [ANY, 'Open', 'Closed'];
    // $scope.tasks = [];
    //console.log("alert_message", $rootScope.alert_message);

    //$rootScope.alert_message = null;

    // if (AlertService.hasMessage()){
    //   $scope.alert(AlertService.getMessage());
    //   AlertService.clearMessage();
    // }

    $http.get("/tasks").then(function(response){
      $scope.tasks = response.data["tasks"];
      // console.log("response", response);
      console.log("tasks", $scope.tasks);
    }, function(response){
         console.log("tasks response", response);
         $state.transitionTo("server_error");
        // if(response.status == 307){
        //   AlertService.setMessage(response.data.message);
        //   $state.transitionTo("signin")
        // }
    });

    $http.get("tasks/topics").then(function(response){
      $scope.topics = response.data["topics"]
      $scope.topics.unshift(ANY);
    }, function(response){
        $state.transitionTo("server_error");
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

  $scope.setCompleted = function(task, index){
    console.log("marked as completed");
    $http.put("/tasks/"+ task.id, {completed: true}).then(function(){
      console.log("task updated successfully");
      $scope.tasks[index].is_completed = true;
    }, function(response){
        console.log("Failed to update task");
        if(response.data.containsKey("message")){
          console.log(response.data.message);
        }
        else if(response.data.containsKey("messages")){
          console.log(response.data.messages);
        }
    });
  };

  $scope.task_location_type_value_select = function(index){
    $scope.location_type_value_select(index, function(){
    });
  };

}]);