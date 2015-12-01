function signInController($rootScope, $log, wydNotifyService, $http, $window, $timeout) {
    $log.debug('signInController...');
    $rootScope.viewName = 'SignIn';

    var vm = this; vm.uiState = {isReady: false};

    vm.message = null

    vm.user = {
        userId: '',
        password: ''
    };

    function signIn() {
        wydNotifyService.hide();
        $log.info('singing in...');

        vm.message = null;

        var path = 'sessions/login';
        $http.post(path, vm.user).success(function (response) {
            //$log.info(response);
            if (response.type === 0) {
                $window.location = 'home.html';
            } else {
                vm.message = response.message;
                wydNotifyService.showError(vm.message);
            }
        });
    }

    vm.signIn = signIn;
}
appControllers.controller('signInController', signInController);
