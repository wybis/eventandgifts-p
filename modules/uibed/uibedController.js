function uibedController($log, $rootScope, $scope, wydNotifyService, $timeout, $mdToast,  $mdDialog) {
    $log.debug('uibedController...');
    $rootScope.viewName = 'UI Bed';

    var vm = this; vm.uiState = { isReady : false };

    vm.simulateInvalidSession = function() {
        $rootScope.$emit('session:invalid', 'Invalid session...');
    };

    vm.showInfo = function () {
        wydNotifyService.showInfo('Sample Info...');
        $log.info('Sample Info...');
    };

    vm.showSuccess = function () {
        wydNotifyService.showSuccess('Sample Success...');
        $log.info('Sample Success...');
    };

    vm.showWarning = function () {
        wydNotifyService.showWarning('Sample Warning...');
        $log.info('Sample Error...');
    };

    vm.showError = function () {
        wydNotifyService.showError('Sample Error...');
        //wydNotifyService.showError('Sample Error...').then(function(actionText) {
        //    if(actionText === 'More') {
        //        $mdDialog.show(
        //            $mdDialog.alert()
        //                .clickOutsideToClose(true)
        //                .title('Error Details')
        //                .content('Hi, There was an error...')
        //                .ok('Ok')
        //        );
        //    }
        //});
        $log.info('Sample Error...');
    };

    $timeout(function() {
        vm.uiState.isReady = true;
        $log.info('uiState ready now....');
    }, 1000);

}
appControllers.controller('uibedController', uibedController);


