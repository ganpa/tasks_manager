app.service('SigninService', ['$http', 
  function($http){
    var signin_service = {};

    signin_service.signin = function(credentials, call_back){
      $http.post('/signin', data).then(function(response){
        console.log("done");
        call_back(response);
      });
    };

    return signin_service;

}]);