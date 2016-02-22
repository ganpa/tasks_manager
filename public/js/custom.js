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

app.controller('NewEmployeeController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.init = function(){
    $scope.positions = ['Collector', 'SubCollector', 'Tashildar', 'Zonal Deputy Tashildar', 'Revenue Inspector', 'VAO'];
    $scope.position = 'Tashildar';
  };

  $scope.create = function(){
    data = {
      "name" : $scope.name,
      "position": $scope.position,
      "location": "Cheranmahadevi"
    };

    $http.post("/employees", data).then(function(){
      console.log("post success");
    });

    //$location.path("/employees/");
  };

  $scope.position_select = function(position){
    $scope.position_num = $scope.positions.indexOf(position);
  };

}]);

app.controller('NewLocationController', 
  ['$scope', '$http', '$location', 'Upload', function($scope, $http, $location, Upload){

  $scope.get_location_types = function(){
    $http.get("/locations/types").then(function(response){
      $scope.location_types = response.data["location_types"];
      $scope.location_type = $scope.location_types[0];
      $scope.location_type_num = 0;
      $scope.location_types_value = [];
      console.log($scope.location_types);
    }, 
    function(response){
      console.log("Error");
    });
  };

  $scope.get_location_by_type = function(location_type){
    queryParams = {
      "location_type" : location_type
    };
    var result = ["test"+location_type, "hello_"+location_type];
    $http.get("/locations", {params : queryParams}).then(function(response){
      //result = response.data["locations"];
      //$scope.locations = response.data["locations"];
    });
    return result;
  };
    
  $scope.init = function(){
    $scope.get_location_types();
    $scope.input_type = "Default";
    $scope.input_bulk = false;
    $scope.input_types = ["Default", "File Upload"];
  };

  $scope.input_type_select = function(input_type){
    if(input_type != "Default"){
      $scope.input_bulk = true;
    }
    else{
      $scope.input_bulk = false;
    }
  };

  $scope.select_location_type = function(){
    console.log("Select");
    console.log($scope.location_type);
    $scope.locations = [];
    $scope.location_type_num = $scope.location_types.indexOf($scope.location_type);
    for(i=0; i < $scope.location_type_num; i++){
      $scope.locations[i] = $scope.get_location_by_type($scope.location_types[i]);
    }
    $scope.location_types_value = [];
    $scope.location_types_file = [];
    console.log($scope.locations);
  };

  $scope.upload = function (file) {
    Upload.upload({
      url: '/locations/',
      method: 'POST',
      data: {file: file}
    }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.create = function(){
    //console.log($scope.district);
    if($scope.input_bulk == true)
      $scope.upload($scope.file);
    else{
      // console.log($scope.locations);
      console.log($scope.location_types_value);
      data = {};
      for(i=0; i<$scope.location_types_value.length; i++){
        data[$scope.location_types[i]] = $scope.location_types_value[i];
      }
      // data["location"] = location;
      data["input_type"] = $scope.input_type;
      console.log(data);
      $http.post("/locations", data).then(function(){
        console.log("post success");
      });

    }
  };

  
  
}]);

app.controller('NewTaskController', ['$scope', '$http', '$location', function($scope, $http, $location){
  
  console.log("init");
  $scope.staff = 'A1';
  $scope.staffs = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];
  $scope.add_user = false;
  $scope.task = {};
  $scope.task.file_nums = [];
  $scope.num_files = [{"show":true}];

  $scope.add_file = function(){
    $scope.num_files[$scope.num_files.length -1 ].show = false;
    $scope.num_files.push({"show":true});
  }

  $scope.remove_file = function(index){
    $scope.num_files.splice(index, 1);
    $scope.task.file_nums.splice(index, 1);
  }

  $scope.create = function(task){
    console.log(task);
  }

  $scope.remove_employee = function(){
    $scope.add_user = false;
    $scope.task.employee = {};
  }



  var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// $('#the-basics .typeahead').typeahead({
//   hint: true,
//   highlight: true,
//   minLength: 1
// },
// {
//   name: 'states',
//   source: substringMatcher(states)
// });


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