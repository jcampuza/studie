studie.controller('groupCtrl', ["$scope", "$firebaseArray", "Auth", "$timeout", function($scope, $firebaseArray, Auth, $timeout) {
    
	/*
	TODO: make a service/factory to keep track of user data
	*/
	var authData = Auth.$getAuth();
	var ref = new Firebase("https://studie.firebaseio.com/");
    var userRef = ref.child('users/' + authData.facebook.id);
	// for UCSC courses
	var groupsRef = ref.child("/groups/");
	// This users courses
    var courseRef = userRef.child("/courses");

    allGroups = [];

    courseRef.on("value", function(courses) {
        $scope.groups = [];
        courses.forEach(function(course) {
            console.log(course.key());
            groupsRef.orderByChild("course").equalTo(course.key()).once("value", function(groups) {
                groups.forEach(function(group) {
                    $timeout(function() {
                        $scope.groups.push(group.val());
                        console.log(group.val());
                    });
                });
            });
        });
    });




    $scope.addGroup = function(group) {
        console.log(group);
        var userGroupRef = userRef.child('groups');
        userGroupRef.child(group.id).once('value', function(snapshot) {
            if (snapshot.exists()) {
                console.log("youre in that group already!");
            } else {
                userGroupRef.child(group.id).set(group.id, function() {
                    $("<div/>", {
                    class: 'class-notif',
                    html: 'You added the group ' + group.title + '!'
                    }).fadeIn().appendTo('body');
                    setTimeout(function() {
                        $('.class-notif').fadeOut(400, function() {
                            this.remove();
                        });
                    }, 3000);
                })
            }
        });
    };

}]);