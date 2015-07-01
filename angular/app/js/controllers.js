'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.controller('TweetCtrl',
    ['$scope','$sails','$filter',
    function($scope,$sails,$filter) {
      $scope.lookup = {};
      $scope.tweets = [];
      $scope.filterQuery = '';
      $sails.get("/tweet/getFilterQuery").success(function (response) {
        console.log('filter query: ' + JSON.stringify(response));
        $scope.filterQuery = response;
      });
      (function() {


        $sails.get("/tweet").success(function (response) {
          $scope.tweets = response; 
          $scope.lookup = {};
          for (var i in $scope.tweets) {
            $scope.lookup[$scope.tweets[i].id] = i;
            //console.log($scope.lookup[$scope.tweets[i].id]);
          }
        }).error(function (response) { console.log('error');});

        $sails.get("/tweet/subscribe").success(function (response) {
          //console.log('task: '+response);
        }).error(function (response) { console.log('error');});

        $sails.on('tweet', function ( message ) {
          //console.log('sails published a message for item: '+message.verb);
          switch (message.verb) {
            case 'created':
              //console.log("pushing "+JSON.stringify(message.data));
              $scope.tweets.unshift(message.data);
              $scope.lookup = {};
              for (var i in $scope.tweet) {
                $scope.lookup[$scope.tweet[i].id] = i;
              }
              break;
            case 'destroyed':
              $scope.tweets = $scope.tweets.filter(function(item) {
                return item.id != message.id;
              });
              $scope.lookup = {};
              for (var i in $scope.tweets) {
                $scope.lookup[$scope.tweets[i].id] = i;
              }
              break;
          }
        });
        $sails.on('task', function ( message ) {
          //console.log('sails published a message for task: '+message.verb);
        });

      })();
      $scope.setFilterQuery = function() {
        console.log('updating query to ' + $scope.filterQuery);
        $sails.post('/tweet/setFilterQuery', {
          filterQuery: $scope.filterQuery     
        });
      }

    }]);
