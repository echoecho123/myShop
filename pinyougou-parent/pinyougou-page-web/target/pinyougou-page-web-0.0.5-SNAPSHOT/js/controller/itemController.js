app.controller('itemController',function ($scope) {
  $scope.addNum=function(x){
	  $scope.num += x;
	  if($scope.num < 1){
		  $scope.num = 1;
	  }
  }


});