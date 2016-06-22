studie.factory("Auth", function($firebaseAuth) {


	var ref = new Firebase("https://studie.firebaseio.com");
    return authObj = $firebaseAuth(ref);

});


