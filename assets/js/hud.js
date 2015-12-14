var announcerApp = angular.module('announcerApp', ['ngAnimate']);

announcerApp.controller('HudCtrl', ['$scope', '$interval', function($scope, $interval) {
    console.log("Loading HudCtrl...");
    $scope.animation_class = 'hidden';
    $scope.i = 0;
    $scope.current = {};
    $scope.announcements = [
        {
            "type": "series",
            "title": "Camino a Mighty no. 9",
            "image": "assets/img/road_to_mighty_no_9/beck.png",
            "text": "Sábados 16hrs GMT-6. A partir del 26 de Diciembre"
        },
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
            "type": "twitch",
            "title": "¡La mejor variedad de juegos en Twitch!",
            "image": "assets/img/gaminglat.png",
            "text": "No olvides revisar la programación"
        },
    ];

    $scope.fetchInfo = function() {
        $scope.current = $scope.announcements[$scope.i];
        console.log($scope.current);
        $scope.i = ($scope.i+1) % $scope.announcements.length;
    };

    $interval($scope.fetchInfo, 60000);
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
