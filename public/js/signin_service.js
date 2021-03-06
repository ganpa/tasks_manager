app.service('SigninService', ['$http', '$state',
  function($http, $state){
    var signin_service = {};

    signin_service.is_signed_in = function(success, error){
      $http.get('/is_signed_in').then(function(response){
        if(!(response.data.sign_in)){
          $state.transitionTo('signin');
        }
        if(success != null){
          success(response);
        }
      }, function(response){
          if(error != null){
            error(response);
          }
      });
    };

    signin_service.signin = function(credentials, success, error){
      $http.post('/signin', data).then(function(response){
        console.log("done");
        success(response);
      }, function(response){
        // console.log("error signin", response);
        error(response);
      });
    };

    return signin_service;

}]);