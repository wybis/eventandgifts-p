function resetPasswordController($rootScope, $log) {
    $log.debug('resetPasswordController...');
    $rootScope.viewName = 'Reset Password';

    var vm = this; vm.uiState = {isReady: false};
}
appControllers.controller('resetPasswordController', resetPasswordController);
