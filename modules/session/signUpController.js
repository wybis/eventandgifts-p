function signUpController($rootScope, $log) {
	$log.debug('signUpController...');
	$rootScope.viewName = 'Sign Up';

	var vm = this; vm.uiState = { isReady : false };
}
appControllers.controller('signUpController', signUpController);
