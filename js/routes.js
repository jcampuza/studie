studie.config(["$routeProvider", function($routeProvider, Auth) {
	$routeProvider
		.when("/", {
			redirectTo: '/login'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl',
			requiresAuth: false,
			checkAuth: true
		})
		.when('/school', {
			templateUrl: 'partials/school_sel.html',
			controller: 'schoolCtrl',
			requiresAuth: true
		})
		.when('/classes', {
			templateUrl: 'partials/classes.html',
			controller: 'userCtrl',
			requiresAuth: true
		})
		.when("/user", {
			templateUrl: 'partials/user.html',
			controller: 'userCtrl',
			requiresAuth: true
		})
		.when("/groups", {
			templateUrl: 'partials/groups.html',
			controller: 'userCtrl',
			requiresAuth: true
		})
		.when("/newgroup", {
			templateUrl: 'partials/newGroup.html',
			controller: 'newGroupCtrl',
			requiresAuth: true
		})
		/*.when("/groups/:groupID", {
			templateURL: 'partials/group.html',
			controller: 'oneGroupCtrl',
			requiresAuth: true
		})*/
		.when("/profile", {
			templateUrl: 'partials/profile.html',
			controller: 'profileCtrl',
			requiresAuth: true
		})
		.when("/chat", {
			templateUrl: 'partials/chat.html',
			controller: 'chatCtrl',
			requiresAuth: true
		})
		.otherwise({
			redirectTo: '/login'
		})
}]).run(function($rootScope, $location, Auth, $timeout) {
	$rootScope.$on("$routeChangeStart", function(event, route) {
		console.log(route);
		var ref = new Firebase("https://studie.firebaseio.com/users");

		if (route.requiresAuth && !Auth.$getAuth()) {
			$location.path('/login');
		}
		
		if (authData = Auth.$getAuth()) {
			ref.child(authData.facebook.id).child('school').once('value', function(snapshot) {
				if (!snapshot.exists()) {
					$timeout(function() {
						console.log('YOU DONT HAVE A SCHOOL');
						$location.path('/school');
					});
				}
			});
		}

	});
})