studie.controller('profileCtrl', ["$scope", "$firebaseArray", "Auth", "$timeout", function($scope, $firebaseArray, Auth, $timeout) {

	var authData = Auth.$getAuth();
	var ref = new Firebase("https://studie.firebaseio.com/")
	var courseRef = ref.child('users/' + authData.facebook.id + '/courses');
	var userGroupRef = ref.child('/users/' + authData.facebook.id + '/groups');
	var groupRef = ref.child('/groups')
	$scope.courses = $firebaseArray(courseRef);

	userGroupRef.on('value', function(allUserGroups) {
		$scope.groups = [];
		console.log(allUserGroups.val());
		allUserGroups.forEach(function(eachUserGroup) {
			console.log(eachUserGroup.val());
			groupRef.child(eachUserGroup.val()).once('value', function(snap) {
				$timeout(function() {
					$scope.groups.push(snap.val());
					console.log(snap.val());
				});
			});
		})
	});

	$scope.dropClass = function(course) {
		$scope.courses.$remove(course);
	};

	$scope.dropGroup = function(group) {
		var groupRef = userGroupRef.child(group.id);
		console.log(group)
		groupRef.remove(function(error) {
			if (error) {
				console.log("remove failed");
			} else {
				console.log("Whew need to update");
			}
		});
	}

}]);