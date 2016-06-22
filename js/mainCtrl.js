studie.controller('loginCtrl', ["$scope", "$location", "Auth", function($scope, $location, Auth) {
	var ref = new Firebase("https://studie.firebaseio.com");
	$scope.authorized = function() {
		return Auth.$getAuth();
	}
	//Once a user is authenticated, we check if they are in the db already, if not then insert them
	//and redirect them to choosing what school they want to be a part of (for now only ucsc)
	Auth.$onAuth(function(authData) {
		$scope.authData = authData;
		console.log(authData);
		if (authData) {
			
			//If user doesn't exist in db, then insert, otherwise just redirect
			ref.child('users').child(authData.facebook.id).once('value', function(snapshot) {
				if (snapshot.exists()) {
					console.log('Coolio you\'re all good');
				} else {
					ref.child('users/' + authData.facebook.id).set({
							email: null,
							image: "https://graph.facebook.com/" + authData.facebook.id + "/picture?width=400&height=400",
							name: authData.facebook.displayName	
					});
				}
			});
			
			if($scope.schoolName == 'Your School'){
				$location.path("/school");
				console.log("got authdata");
			} else{
			    $location.path("/user");
			    console.log("got authdata");
			}
		} /*else {
			$location.path('/');
		}*/
	});

    $scope.login = function() {
    	Auth.$authWithOAuthPopup("facebook").catch(function(error) {
    			console.error(error);
    	});
    };
}]);
