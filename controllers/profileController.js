var app = angular.module('userApp', ['ngAnimate']);
var data1 = {
  name: 'default',
  skills: 'default',
  experience: 'default',
  currentproject: 'default',
  profile: 'default',
  role: 'default'
};
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
app.controller('userCtrl', function($scope, $http) {// , $rootElement) {
 // $rootElement.data("$$ngAnimateState").running = false;
  $scope.experts = data;
  $scope.init = function(value) {
    if(value == 1) {
      $http.get("http://localhost:3033/profiles").success(function (response) {
        //$scope.message = response;
        console.log("profiles retrieved");
        $scope.experts = response;
        //getAllImage();
      });
    }
    else{
     // $scope.expert = data1;
    }
  };
  // call the mongodb get image function
  var getImage = function(){
    $http.get("http://localhost:3333/getimage").success(function(doc) {
      console.log(doc);
      $scope.imgsource=doc;
    })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };
  $scope.addProfile = function() {
    console.log("Going to call add profile server");
    $http.post('http://localhost:3033/create',$scope.expert).success(function (response) {
      console.log("profile created");
      $scope.profiles = response;
    });
  };

  $scope.edit = function (id) {
   // $scope.expert = data1;
    console.log(id);
    $http.get('http://localhost:3033/getProfile/' + id).success(function (response) {
      $scope.expert = response;
    });

  };

  $scope.updateSkill = function() {
    console.log($scope.expert._id);
    console.log($scope.expert.skills);
    $http.put('http://localhost:3033/updateSkill/' + $scope.expert._id, $scope.expert.skills).success(function (response) {
      console.log("profile updated");
    });
  };
  
  $scope.updateProfile = function() {
    console.log($scope.expert._id);
    $http.put('http://localhost:3033/update/' + $scope.expert._id, $scope.expert).success(function (response) {
      console.log("profile updated");
    });
  };

  var getProfile = function (id) {
    if(typeof id === 'undefined') {
      console.log("id is null while getting profile");
    }else{
      $http.get('http://localhost:3033/getProfile/' + id).success(function (response) {
        console.log(response);
        $scope.expertNew = response;
        console.log("retrieved profile");
      });
    }
  };

  $scope.getId = function () {
    var myParam;
    var currentURL = document.URL;
    var params = currentURL.substring(currentURL.indexOf('?')+1);
    // alert(params);
    var data = params.split(':');
    myParam = data[1];
    return myParam;
  }

  $scope.getData = function () {
    $scope.expert = data1;
    var myParam;
    var currentURL = document.URL;
    var params = currentURL.substring(currentURL.indexOf('?')+1);
    // alert(params);
    var data = params.split(':');
    myParam = data[1];
   // alert(myParam);
    if(typeof myParam === 'undefined') {
      console.log("id is null");
    }else{
      $http.get('http://localhost:3033/getProfile/' + myParam).success(function (response) {
        $scope.expert = response;
      });
      getProfileImage(myParam);
    }
  };
  var request = new XMLHttpRequest();
  //var boundary = this.generateBoundary();

  $scope.uploadImage = function (id) {
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    console.log("Going to upload image to server");
    $http.post('http://localhost:3222/upload?pid='+id).success(function (response) {
      console.log("profile image uploaded");
    });
  };
  var getProfileImage = function (picId) {
    $http.get("http://localhost:3222/getImage/"+ picId).success(function(doc) {
      console.log(doc);
      $scope.imgsource=doc;
    })
        .error(function(data) {
          console.log('Error: ' + data);
        });

  };

  $scope.getImageOnLoad = function (picId) {
    console.log("picId in on load image : ",picId);
    getProfileImage(picId);
  };

  var getAllImage = function () {
    $http.get("http://localhost:3222/getAllImages").success(function(doc) {
      console.log(doc);
      $scope.imgsource=doc;
    })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  }
});

app.directive('animateOnLoad',['$animateCss', function($animateCss) {
  return {
    'link': function(scope, element) {
      $animateCss(element, {
        'event': 'enter',
        structural: true
      }).start();
    }
  };
}]);