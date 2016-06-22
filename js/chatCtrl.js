studie.controller('chatCtrl', ["$scope", "Auth","$firebaseArray", "$timeout", function($scope, Auth, $firebaseArray, $timeout) {

    var authData = Auth.$getAuth();
	$scope.username = authData.facebook.displayName;
	var ref = new Firebase("https://studie.firebaseio.com");

	// for all groups
	var groupsRef = ref.child("/groups/");
	// for the user's groups
	var userGroupsRef = ref.child('/users/' + authData.facebook.id + '/groups/');
    //console.log(groupsRef);
	//console.log(userGroupsRef);
    // create arrays for the groups
    $scope.groups = $firebaseArray(groupsRef);
	
	$scope.glued = true;
	
	// creates array for user's groups
	//$scope.userGroups = $firebaseArray(userGroupsRef);
		
	userGroupsRef.once('value', function(allUserGroups) {
		$scope.userGroups = [];
		//console.log(allUserGroups.val());
		allUserGroups.forEach(function(eachUserGroup) {
			//console.log(eachUserGroup.val());
			groupsRef.child(eachUserGroup.val()).once('value', function(snap) {
				$timeout(function() {
					$scope.userGroups.push(snap.val());
					//console.log(snap.val());
				});
			});
		})
	});


    // function that determines which group to chat with
    $scope.chatThisGroup = function(userGroup) {
        //console.log(userGroup);
		$scope.chosenGroup = userGroup.id;       
		$scope.chatroomName = userGroup.title;
		// sets path for where in firebase to store data
		var chatRef = groupsRef.child(userGroup.id + '/chat/')
		//var chatRef = groupsRef.child(userGroup.$id + '/chat/');
		$scope.chatMessages = $firebaseArray(chatRef);
			    
		// input field
		var messageField = $('#messageInput_'+ userGroup.id);


        // listener for message
        messageField.keypress(function (e) {
			
			// if key is enter
            if (e.keyCode == 13) {
                //values
                var username = $scope.username;
                var message = messageField.val();
				var date = new Date().getTime();
				
				
				// if the message field is NOT blank, push the message.
				if(messageField.val() != ''){
					
                // save/push the message to firebase. attributes are user, message, user_id and the date/time.
                chatRef.push({user:username, message:message, user_id:authData.facebook.id, date:date});
			    messageField.val('');
			   
				}
			
            }
	

	    });	
    };	  
        
}]);

