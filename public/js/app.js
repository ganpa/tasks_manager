var app = angular.module("app", ['ngCookies', 'ui.router', 'ngFileUpload']);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('signup', {
      url: '/signup',
      views : {
        'main' : {templateUrl: 'partials/signup.html', controller: 'SignupController'},
        'navbar' : {templateUrl: 'partials/home_navbar.html'}
      }
    })
    .state('signin', {
      url: '/signin',
      views : {
        'main' : {templateUrl: 'partials/signin.html', controller: 'SigninController'},
        'navbar' : {templateUrl: 'partials/home_navbar.html'}
      }
    })
    .state('signout', {
      url:'/signout',
      views : {
        'navbar' : {templateUrl: 'partials/home_navbar.html'},
        'alert_message' : {templateUrl : 'partials/alert.html', controller: 'SignoutController'},
        'main' : {templateUrl: 'partials/signin.html', controller: 'SigninController'}
      }
    })
    .state('home', {
      url:'/',
      views : {
        'main' : {templateUrl : 'signin.html', controller: 'SigninController'},
        'navbar' : {templateUrl: 'home_navbar.html'}
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      views: {
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'},
        'main' : {template: "Welcome {{name}}", controller: "DashBoardController"}
      }
    })
    .state('config', {
      url: 'config',
      templateUrl: 'partials/config.html',
      controller: 'ConfigController'
    })
    .state('new_task', {
      url: 'tasks/new',
      views: {
        'main' : { templateUrl: 'partials/new_tasks.html', controller: 'NewTaskController'},
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'}
      }
    })
    .state('get_task', {
      url: 'task/:id',
      views: {
        'main' : { templateUrl: 'partials/task_view.html', controller: ''},
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'}
      }
    })
    .state('tasks',{
      url: '/tasks',
      views: {
        'alert_message' : {templateUrl : 'partials/alert.html'},
        'main' : { templateUrl: 'partials/tasks.html', controller: 'TasksController'},
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'}
      }
    })
    .state('new_location', {
      url: '/locations/new',
      views: {
        'main' : { templateUrl: 'partials/new_location.html', controller: 'NewLocationController'},
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'}
      }
    })
    .state('new_employee', {
      url: '/employees/new',
      views: {
        'main' : { templateUrl: 'partials/new_employee.html', controller: 'NewEmployeeController'},
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'}
      }
    });
}]);

app.controller("DashBoardController", ['$scope', '$http', function($scope, $http){
  $http.get("/users").then(function(response){
    $scope.name = response.data["name"];
  });
}]);

app.controller("SignoutController", ['$scope', '$state', '$http', function($scope, $state, $http){
  $http.get('/signout').then(function(response){
    $scope.alert_message = "Successfully Signed Out !";
  });
}]);

app.controller("HomeController", ['$scope', '$cookies', '$state', '$location', 'SigninService',
  function($scope, $cookies, $state, $location, SigninService){
    $scope.init = function(){
    var token = $cookies.get("remember_token");
    console.log("cookie test", token);
    if(token != null){
      //SigninService({"remember_token" : token})
      //$state.transitionTo('signin');
      // $location.path('/signin');
      $state.transitionTo('dashboard');
    }
    else{
      console.log("transitionTo signin");
      $state.transitionTo('signin');
    }
  }
  //$location.path("/signin");
}]);