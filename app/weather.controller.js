(function() {
    'use strict';

    angular
        .module('myApp', ['ngAnimate', 'toastr'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherFactory', 'toastr'];

    /* @ngInject */
    function WeatherController(WeatherFactory, toastr) {
        var vm = this;
        vm.title = 'WeatherController';

        activate();

        ////////////////

        function activate() {

        	getWeather();

        }

        function getWeather() {
        	WeatherFactory.getWeather().then(
        		function(response) {

        			vm.weather = response.data;
        			toastr.success('We have weather!');
        			console.log(response.data);
        		},
        		function(error) {
        			if (error.data) {
        				toastr.error('There was a problem: ' + error.data);
        			} else {
        				toastr.info('no data found :(');
        			}
        		}


        	)
        }
    }
})();