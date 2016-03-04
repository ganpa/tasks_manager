var app = angular.module("app", ['ngCookies', 'ui.router', 'ngFileUpload']);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  // $urlRouterProvider.otherwise('/signin');
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
        'navbar' : {templateUrl: 'partials/home_navbar.html', controller: 'SignoutController'},
        // 'alert_message' : {templateUrl : 'partials/alert.html', controller: 'SignoutController'},
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
        'main' : {templateUrl: 'partials/dashboard.html', controller: "DashBoardController"}
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
        // 'alert_message' : {templateUrl : 'partials/alert.html'},
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
    })
    .state('users', {
      url: '/users',
      views: {
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'},
        'main' : {templateUrl: 'partials/users.html', controler: 'UsersController'}
      }
    })
    .state('new_user', {
      url: '/users/new',
      views: {
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'},
        'main' : { templateUrl: 'partials/new_user.html', controller: 'NewUserController'}
      }
    })
    .state('alert', {
      url: '/alert',
      views: {
        'navbar' : {templateUrl: 'partials/signedin_navbar.html'},
        'main' : { templateUrl: 'partials/alert.html', controller: 'AlertController'}
      }
    })
    .state('not_found', {
      url:'/page_not_found',
      views: {
        'navbar' : {templateUrl: 'partials/home_navbar.html'},
        'main' : {templateUrl: 'partials/page_not_found.html'}
      }
    })
    .state('server_error', {
      url: '/server_error',
      views: {
        'navbar' : {templateUrl: 'partials/home_navbar.html'},
        'main' : {templateUrl: 'partials/server_error.html'}
      }
    });
}]);

app.controller("DashBoardController", ['$scope', '$state', '$http', 'SigninService', 
  function($scope, $state, $http, SigninService){
   SigninService.is_signed_in();//function(response){ 
    $http.get("/current_user").then(function(response){
      console.log("dashboard get users response", response);
      $scope.name = response.data["user"];
    });
}]);

app.controller("SignoutController", ['$scope', '$state', '$http', function($scope, $state, $http){
  $http.get('/signout').then(function(response){
    $scope.alert_message = "Successfully Signed Out !";
    $scope.is_success = true;
    $scope.is_alert = true;
  });
}]);

app.controller("HomeController", ['$scope','$rootScope', '$cookies', '$state', '$location', '$http', 'SigninService',
  function($scope, $rootScope, $cookies, $state, $location, $http, SigninService){
    $scope.init = function(){
      console.log("host", $location.host());
      var subdomains = $location.host().split(".");
      console.log("subdomains", subdomains);
      if(subdomains.length == 3){
        $state.transitionTo("signup");
        return;
      }
      $http.get("/accounts/account_exists").then(function(response){
            console.log("acount exists", response);
            $http.get("/accounts", {params: {"subdomain" : subdomains[0]}}).then(function(response){
                console.log("account", response);
                $rootScope.account = response.data.account;
            }, function(response){
                $state.transitionTo("server_error");
            });
        }, function(response){
            console.log("account doesnt exists", response);

      });
      var token = $cookies.get("remember_token");
      console.log("cookie test", token);
      if(token != null){
          SigninService.is_signed_in(function(response){
          console.log("signin success", response);
          if(response.data.sign_in == true){
            $state.transitionTo('dashboard');
          }
          else{
            $state.transitionTo('signin');
          }
        }, function(response){
            console.log("signin failed", response);
            if(response.status == 400){
              $state.transitionTo("not_found");
            }
            else{
              $state.transitionTo("server_error");
            }
        });
      }
      else{
        $http.get('/accounts/account_exists').then(function(response){
          console.log("transitionTo signin");
          console.log("account exists", response);
          $state.transitionTo('signin');
        }, 
          function(response){
            console.log("account doesnt exists", response);
            if(response.status == 400){
              $state.transitionTo("not_found");
            }
            else if(response.status == 500){
              $state.transitionTo("server_error");
            }
        });

      }
  }
}]);