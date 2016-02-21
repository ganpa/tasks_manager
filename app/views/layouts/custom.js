var app = angular.module("app", []);


app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/tasks',{
      templateUrl: 'index.html',
      controller: 'TasksController'

    })
    .when('/',{
      templateUrl: 'home.html',
      controller: 'TestController'
    });
}]);

app.controller('TestController', ['$scope', function($scope){
 $scope.email = "msgs1991@gmail.com";
 console.log("Test controller");
}]);

app.controller('TasksController', ['$scope', '$http', function($scope, $http){
  $scope.setCompleted = function(task_id){
    console.log("marked as completed");
    console.log(task_id);
    $http.put("/tasks/"+task_id, { "completed" : true}).success(function(){
      console.log("task updated successfully");
      console.log(task_id);
    });
  };

}]);

app.controller('TaskActionController', ['$scope', function($scope){
  console.log($scope.completed);
  if($scope.status == "Completed"){
   $scope.completed = true;
   console.log("Hello");
  }
  console.log($scope.completed);
}]);