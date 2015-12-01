function settingsController($rootScope, $log) {
    $log.debug('settingsController...');
    $rootScope.viewName = 'Settings';

    var vm = this; vm.uiState = {isReady: false};

}
appControllers.controller('settingsController', settingsController);
