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
        vm.getWeather = getWeather;
        //vm.addToHistory = addToHistory;
        vm.searchHistory = [];






        function addToHistory() {

            var status = false;

            for (var i = 0; i < vm.searchHistory.length - 1; i++) {
                if (vm.searchHistory[i].name.toLowerCase() === vm.city.toLowerCase()) {
                    status = true;
                }

            }

            if (status == false) {
                vm.date = new Date();
                vm.searchHistory.push({
                    "name": vm.weather.name,
                    "date": vm.date
                });


            }

            vm.city = '';



        };





        function getWeather(cityName) {
            WeatherFactory.getWeather(cityName).then(
                function(response) {

                    vm.weather = response.data;
                    addToHistory();
                    toastr.success('We have weather!');
                    console.log(response.data);
                    console.log(response);
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
