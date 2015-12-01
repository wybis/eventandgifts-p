'use strict';

function rootController($rootScope, $scope, $log, $mdSidenav, $mdDialog, $window) {
    $log.debug('rootController...');

    $scope.toggleSideNavBar = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $rootScope.$on('session:invalid', function (event, data) {
        $log.debug('session invalid started...');

        var alert = $mdDialog.alert({
            title: 'Invalid Session!',
            content: 'Your session is invalid. Please sign in and continue.',
            ok: 'Sign In'
        });
        $mdDialog.show(alert).finally(function () {
            alert = undefined;
            $log.info('redirecting to sign in...');
            $window.location = 'index.html#/sign-in';
        });

        $log.debug('session invalid finished...');
    });
}
appControllers.controller('rootController', rootController);

var dependents = ['ngRoute', 'ngSanitize'];
dependents.push('ngMaterial');
dependents.push('ngMdIcons');
dependents.push('md.data.table');
dependents.push('ngStorage');
dependents.push('green.inputmask4angular');
dependents.push('app.filters');
dependents.push('app.directives');
dependents.push('app.services');
dependents.push('app.controllers');
var app = angular.module('app', dependents);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('generalHttpInterceptor');
});

app.config(function ($mdThemingProvider) {
    //var theme = $mdThemingProvider.theme('default');
    //theme.primaryPalette('your-primary-color');
    //theme.accentPalette('your-accent-color');
    //theme.warnPalette('your-warn-color');
    //theme.backgroundPalette('your-background-color');

    $mdThemingProvider.theme("info-toast");
    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("warning-toast");
    $mdThemingProvider.theme("error-toast");
});

function appConfig($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        redirectTo: '/home'
    });

    $routeProvider.when('/home', {
        templateUrl: 'modules/home/d-index.html',
        controller: 'indexController as vm'
    });

    $routeProvider.when('/sign-in', {
        templateUrl: 'modules/session/d-signIn.html',
        controller: 'signInController as vm'
    });

    $routeProvider.when('/reset-password', {
        templateUrl: 'modules/session/d-resetPassword.html',
        controller: 'resetPasswordController as vm'
    });

    $routeProvider.when('/sign-up', {
        templateUrl: 'modules/session/d-signUp.html',
        controller: 'signUpController as vm'
    });

    $routeProvider.when('/terms', {
        templateUrl: 'modules/zgeneral/d-terms.html',
        controller: 'termsController as vm'
    });

    $routeProvider.when('/contact', {
        templateUrl: 'modules/zgeneral/d-contact.html',
        controller: 'contactController'
    });

    $routeProvider.when('/about', {
        templateUrl: 'modules/zgeneral/d-about.html',
        controller: 'aboutController'
    });

    $routeProvider.when('/uibed', {
        templateUrl: 'modules/uibed/d.html',
        controller: 'uibedController as vm'
    });

    $routeProvider.when('/message', {
        templateUrl: 'modules/zgeneral/d-message.html',
        controller: 'messageController as vm'
    });

    $routeProvider.when('/not-found', {
        templateUrl: 'modules/zgeneral/d-notFound.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/not-found'
    });
};
app.config(appConfig);

function appInit($log, $rootScope, $location, $sessionStorage, $mdSidenav) {
    $log.info('Initialization started...');

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        //$rootScope.isLoading = true;

        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('Before Current Location : ', curLocPath);
        if (curLocPath == '/not-found' || curLocPath == '/sign-out') {
            return;
        }
        $sessionStorage.eventAndGiftsCLPX = curLocPath;
        //$log.info('Stored Location : ', $sessionStorage.eventAndGiftsCLP);

        var srcUrl = $location.absUrl().indexOf('index');
        srcUrl = $location.absUrl().substring(0, srcUrl);
        srcUrl = srcUrl + next.templateUrl;
        $rootScope.currentViewSrcUrl = srcUrl;
        // $log.info('srcUrl = ' + srcUrl);

        if ($mdSidenav('left').isOpen()) {
            $mdSidenav('left').close();
        }
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        //$rootScope.isLoading = false;

        // $log.info('Location : ', $location.path());
        var curLocPath = $location.path();
        // $log.info('After Current Location : ', curLocPath);
        //$mdSidenav('left').toggle();
    });

    var path = $location.path();
    $log.info('Actual Location : ', path);
    if (path == '') {
        var spath = $sessionStorage.eventAndGiftsCLPX;
        $log.info('Stored Location : ', spath);
        if (!spath || spath == '/not-found') {
            path = '/home';
        }
        else {
            path = spath;
        }
    }
    $log.info('Computed Location : ', path);
    $location.path(path);

    $log.info('Initialization finished...');
}
app.run(['$log', '$rootScope', '$location', '$sessionStorage', '$mdSidenav', appInit]);
