studie.controller('newGroupCtrl', ["$scope", "Auth", "$timeout", "$firebaseArray", function($scope, Auth, $timeout, $firebaseArray) {
	var authData = Auth.$getAuth();
	var ref = new Firebase("https://studie.firebaseio.com/")

	$scope.test = [
	{$id: "hello"},
	{$id: "goodbye"}
	];
	$scope.groupClass = $scope.test[0];


	$scope.change = function(option) {
		console.log(option);
	};

	setTimeout(function(){ 
		$(document).ready(function() {
    		$('select').material_select();
		});

	}, 1000);

}]);