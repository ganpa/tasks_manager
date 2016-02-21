var app = angular.module("app", ['ngRoute']);


app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/tasks/new', {
      templateUrl: 'partials/new_tasks.html',
      controller: 'NewTaskController'
    })
    .when('/tasks/:id', {
      templateUrl: 'partials/show_task.html',
      controller: 'ShowTask'
    })
    .when('/tasks',{
      templateUrl: 'partials/tasks.html',
      controller: 'TasksController'

    })
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'TestController'
    });
}]);

app.controller('TestController', ['$scope', function($scope){
 $scope.email = "msgs1991@gmail.com";
 console.log("Test controller");
}]);

app.controller('NewTaskController', ['$scope', '$http', '$location', function($scope, $http, $location){
  
  console.log("init");
  $scope.staff = 'A1';
  $scope.staffs = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];
  $scope.add_user = false;

  $scope.send = function(){
    console.log("hello");
    console.log($scope.staff);
    console.log($scope.attachment);
    data = {
      "staff" : $scope.staff,
      "topic" : $scope.topic,
      "description" : $scope.description,
      "due_by" : $scope.due_by,
      "assigned_to" : $scope.assigned_to
    }

    $http.post("/tasks", data).then(function(){
      console.log("post success");
      redirectTo: "/tasks/";
    });

    $location.path("/tasks/");
  };

}]);


app.controller('TasksController', ['$scope', '$http', function($scope, $http){

  $scope.init = function(){
    $scope.employee = 'All';
    $scope.status = 'Any';
    $scope.employees = ['All', 'gana', 'ganapathy', 'arjun', 'anish'];
    $scope.statuses = ['Any', 'Open', 'Closed']

    $http.get("/tasks").then(function(response){
      $scope.tasks = response.data;
      console.log("Success called");
    });
  }

  $scope.filter = function(){
    console.log($scope.employee);
    console.log($scope.status);

    queryParams = {
      "employee" : $scope.employee,
      "status" : $scope.status
    };
    $http.get("/tasks", {params: queryParams}).then(function(){
      console.log("get called sucess");
    });
  };

  $scope.setCompleted = function(task){
    console.log("marked as completed");
    $http.put("/tasks/"+ task.id, {completed: true}).then(function(){
      console.log("task updated successfully");
      task.completed = true;
    });
  };
}]);