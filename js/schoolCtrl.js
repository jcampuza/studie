studie.controller('schoolCtrl', ["$scope", "$location", "Auth", "$timeout", function($scope, $location, Auth, $timeout) {
    
    authData = Auth.$getAuth();
    userRef = new Firebase("https://studie.firebaseio.com/users/" + authData.facebook.id);
    console.log(authData.facebook.uid);
    /*if (!$scope.authData) {
        $location.path('/');
    }*/
    
    $scope.fullName = authData.facebook.displayName; 
    $scope.firstName = authData.facebook.cachedUserProfile.first_name;
    $scope.profileImg = authData.facebook.profileImageURL;
    userRef.child('school').on('value', function(data) {
        if (data.exists()) {
            console.log(data.val());
            $timeout(function() {
                $scope.schoolName = data.val();
            });
        } else {
            console.log("Your School");
            $scope.schoolName = "Your School";
        }
    });
    
	
    $scope.setSchoolUCSC = function() {
        console.log($scope.authData);
        userRef.update({school: 'UC Santa Cruz'});
        $timeout(function() {
            $scope.SchoolName = "UC Santa Cruz";    
        });
    };
	
    $scope.profileImg = authData.facebook.profileImageURL;
	

    $scope.logout = function() {
        Auth.$unauth();
        $location.path("/");
    };
        
}]);