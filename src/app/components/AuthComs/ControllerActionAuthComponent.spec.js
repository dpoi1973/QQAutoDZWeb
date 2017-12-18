describe('controllerActionAuthComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('controllerActionAuthComponent', () => {
      return {
        templateUrl: 'app/ControllerActionAuthComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<controllerActionAuthComponent></controllerActionAuthComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
