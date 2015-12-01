function messageController($log, $rootScope, $scope, $location) {
    $log.debug('messageController...');
    $rootScope.viewName = 'Message';

    var vm = this; vm.uiState = { isReady : false };

    vm.params = $location.search();
    if(vm.params.errorMessage) {
        vm.hasErrorMessage = true;
    }
    else {
        vm.hasErrorMessage = false;
    }
    $log.debug(vm.params);
}
appControllers.controller('messageController', messageController);

function termsController($log, $rootScope, $scope) {
    $log.debug('termsController...');
    $rootScope.viewName = 'Terms';

    var vm = this; vm.uiState = { isReady : false };
}
appControllers.controller('termsController', termsController);

function contactController($log, $rootScope, $scope) {
    $log.debug('contactUsController...');
    $rootScope.viewName = 'Contact';

    var vm = this; vm.uiState = { isReady : false };
}
appControllers.controller('contactController', contactController);

function aboutController($log, $rootScope, $scope) {
    $log.debug('aboutController...');
    $rootScope.viewName = 'About';

    var vm = this; vm.uiState = { isReady : false };
}
appControllers.controller('aboutController', aboutController);
