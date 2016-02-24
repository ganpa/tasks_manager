var app = angular.module("app", ['ngRoute', 'ngFileUpload']);


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
    .when('/locations/new', {
      templateUrl: 'partials/new_location.html',
      controller: 'NewLocationController'
    })
    .when('/employees/new', {
      templateUrl: 'partials/new_employee.html',
      controller: 'NewEmployeeController'
    })
    .when('/',{
      templateUrl: 'partials/home.html',
    });
}]);