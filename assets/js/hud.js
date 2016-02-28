var announcerApp = angular.module('announcerApp', ['ngAnimate']);

announcerApp.controller('HudCtrl', ['$scope', '$interval', '$http', function($scope, $interval, $http) {
  console.log("Loading HudCtrl...");
  $scope.animation_class = 'hidden';
  $scope.i = 0;
  $scope.current = {};
  $scope.announcements = [
    {
      "type": "now-watching",
      "channel": "eseca",
      "image": "assets/img/twitchLogo.png",
    },
    //{
    //"type": "series",
    //"title": "Camino a Mighty no. 9",
    //"image": "assets/img/road_to_mighty_no_9/beck.png",
    //"text": "Sábados 16hrs GMT-6. A partir del 26 de Diciembre"
    //},
    {
      "type": "twitch",
      "title": "Pranzedd",
      "channel": "pranzedd",
      "image": "assets/img/twitchLogo.png",
      "text": "Una de las comunidades más grandes y amenas de Twitch"
    },
    {
      "type": "twitch",
      "channel": "krankes_hirn",
      "title": "Krankes Hirn, El Gordo Criticón",
      "image": "assets/img/twitchLogo.png",
      "text": "Quejándose de los juegos, en vivo"
    },
    {
      "type": "twitch-team",
      "title": "¡La mejor variedad de juegos en Twitch!",
      "image": "assets/img/gaminglat.png",
      "text": "No olvides revisar la programación"
    },
  ];

  $scope.fetchInfo = function() {
    $scope.current = {};
    $scope.current = $scope.announcements[$scope.i];
    switch ($scope.current.type) {
        case 'twitch':
            $scope.getTwitchLogo($scope.current.channel);
            break;
        case 'now-watching':
            $scope.getNowWatching($scope.current.channel);
            break;
    }
    console.log("fetchInfo: " + $scope.current);
    console.log($scope.current);
    $scope.i = ($scope.i+1) % $scope.announcements.length;
  };

  $scope.getNowWatching = function (channel) {
    var endpoint = "https://api.twitch.tv/kraken/channels/" + channel;
    $http.get(endpoint).then($scope.successNowWatchingCallback, $scope.errorNowWatchingCallback);
  }

  $scope.successNowWatchingCallback = function (response) {
    $scope.current.title = response.data.game;
    $scope.current.text = response.data.status;
    $scope.current.image = `http://static-cdn.jtvnw.net/ttv-boxart/${response.data.game}-136x190.jpg`;
  }

  $scope.errorNowWatchingCallback = function (response) {
    console.log(response);
  }

  $scope.getTwitchLogo = function (channel) {
    var endpoint = "https://api.twitch.tv/kraken/channels/" + channel;
    $http.get(endpoint).then($scope.successTwitchLogoCallback, $scope.errorTwitchLogoCallback);
  };

  $scope.successTwitchLogoCallback = function ( response ) {
    $scope.current.image = response.data.logo;
  };

  $scope.errorTwitchLogoCallback = function ( response ) {
    console.log(response);
  };

  $interval($scope.fetchInfo, 300000);
  //$interval($scope.fetchInfo, 16000);
}]);

announcerApp.directive('animateOnChange', function($animate,$timeout) {
  return function(scope, elem, attr) {
    scope.$watch(attr.animateOnChange, function(nv,ov) {
      if (nv!=ov) {
        var c = 'change';
        $animate.addClass(elem,c).then(function() {
          $timeout(function() {$animate.removeClass(elem,c);});
        });
      }
    });
  };
});
