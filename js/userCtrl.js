studie.controller('userCtrl', ["$scope", "$location", "Auth", "$timeout", function($scope, $location, Auth, $timeout) {
    
    var authData = Auth.$getAuth();
   
    $scope.fullName = authData.facebook.displayName; 
    $scope.firstName = authData.facebook.cachedUserProfile.first_name;
    $scope.profileImg = authData.facebook.profileImageURL;
    var userRef = new Firebase("https://studie.firebaseio.com/users/" + authData.facebook.id);

    userRef.child('school').on('value', function(snapshot) {
        $timeout(function() {
            $scope.schoolName = snapshot.val();
        });
    });
    
    $scope.logout = function() {
        Auth.$unauth();
        $location.path("/");
    };
	

        
}]);