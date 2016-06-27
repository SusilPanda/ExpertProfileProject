var app = angular.module('userApp', []);
var data = [ {
  name: 'Rahul',
  skills: 'Java',
  experience: '3.5',
  currentproject: 'Avril',
  profile: 'Developer',
  role: 'SSE'
},
  {
    name: 'Manish',
    skills: 'C++',
    experience: '3.5',
    currentproject: 'Avril',
    profile: 'Developer',
    role: 'SSE'
  },
  {
    name: 'Sumit',
    skills: 'Java',
    experience: '5.0',
    currentproject: 'Avril',
    profile: 'Developer',
    role: 'SSE'
  },
  {
    name: 'Ajay',
    skills: 'Java',
    experience: '2.0',
    currentproject: 'Avril',
    profile: 'Tester',
    role: 'SSE'
  },
  {
    name: 'Piyush',
    skills: 'c++',
    experience: '2.5',
    currentproject: 'Avril',
    profile: 'Tester',
    role: 'SSE'
  },
  {
    name: 'Nisha',
    skills: 'Python',
    experience: '3.5',
    currentproject: 'Avril',
    profile: 'Developer',
    role: 'SSE'
  }
];
app.controller('userCtrl', function($scope, $http) {
  $scope.users = data;
  $http.get("http://localhost:3033/profiles").success(function (response) {
    //$scope.message = response;
    console.log("profiles retrieved")
    $scope.users = response;
    //getImage();
  });
});
