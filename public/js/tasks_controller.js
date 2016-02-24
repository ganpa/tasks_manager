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