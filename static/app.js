'use strict';

var www = angular.module('www', ['ui.bootstrap']);

www.config(['$stateProvider', '$locationProvider',
  '$httpProvider', '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  function ($stateProvider, $locationProvider, $httpProvider,
    $urlRouterProvider, $urlMatcherFactoryProvider) {
    var token = $.cookie('apiToken');
    if (token)
      $httpProvider.defaults.headers.common.Authorization = 'apiToken ' + token;
    $urlRouterProvider.rule(
      function ($injector, $location) {
        var path = $location.url();
        // check to see if the path has a trailing slash
        if (path[path.length - 1] === '/')
          return path.replace(/\/$/, '');
        if (path.indexOf('/?') > 0)
          return path.replace('/?', '?');

        return false;
      }
    );

    $stateProvider.state('home', {
      url: '/',
      templateUrl: SRC_PATH + 'home.html',
      controller: 'homeCtrl'
    });

    console.log('start');


    $urlRouterProvider.otherwise('/');

    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

www.constant('SRC_PATH', '/scripts/');