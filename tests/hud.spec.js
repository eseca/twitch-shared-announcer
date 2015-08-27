describe('hud tests', function() {
    beforeEach(module("announcerApp"));

    var sampleCtrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope;
        sampleCtrl = $controller("HudCtrl", {
            $scope: scope
        });
    }));

    it('should be true', function() {
        expect('foo').toBe('foo');
    });
});
