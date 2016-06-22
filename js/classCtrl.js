studie.controller('classCtrl', ["$scope", "$firebaseArray", "Auth", function($scope, $firebaseArray, Auth) {
    
	/*
	TODO: make a service/factory to keep track of user data
	*/
	var authData = Auth.$getAuth();
	
	// for displaying all UCSC subjects in the database
	//var subj = new Firebase("https://studie.firebaseio.com/UCSCSubjects/");
	//$scope.UCSCSubjects = $firebaseArray(subj);
	
	
	// for UCSC courses
	var ref = new Firebase("https://studie.firebaseio.com/schools/ucsc/subjects");
	// This users courses
	var courseRef = new Firebase("https://studie.firebaseio.com/users/" + authData.facebook.id + "/courses/");
	$scope.courses = $firebaseArray(ref);
    console.log($scope.courses);
	$scope.classes = [];
	//enables modal menu for subjects
    $(document).ready(function(){
        $('.modal-trigger').leanModal();
    });

    /*
    Adding a class to a user. First check if the user already has that class.
    If they don't have the class, then join it. On successful joining of class
    display a notification indicating to the client that they have joined the
    class.
    */
    $scope.addClass = function(newClass) {
    	console.log(newClass);
		courseRef.child(newClass.abbr).once('value', function(snapshot) {
    		if (snapshot.exists()) {
    			console.log("You're in that class already");
    		} else {
    			courseRef.child(newClass.abbr).set({
                    color: Math.floor(Math.random() * (5 + 1)),
    				name: newClass.name
    			}, function() {
    				$("<div/>", {
    				class: 'class-notif',
    				html: 'You added the class ' + newClass.name + '!'
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

    /*
    Populates this list of classes in each subject. Ignore tha name field
    Which is why we check to see if the child has children. 
    */
    $scope.populateClasses = function(subject) {
    	$scope.classes = [];
    	ref.child(subject.$id).child('/courses').once('value', function(snap) {
    		snap.forEach(function(childSnap) {
    			//if(childSnap.hasChildren()) {
                    console.log(childSnap.val());
    				$scope.classes.push(childSnap.val());
    			//}
    		});
    	});
    };
	
        
}]);